import React, { useEffect, useState } from 'react';
import { sendError, gen_random, check_answer } from '../utils';
import { countries as DefaultCountryList } from '../assets/documents/countries';

export const QuestionsContext = React.createContext();

const _question = (question, options, correct_answer) => ({ question, options, correct_answer });

export default function QuestionsContextProvider({ children }) {

    const [countries, setCountries] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentCountry, setCurrentCountry] = useState(null);
    const [completed, setCompleted] = useState(false);
    const [score, setScore] = useState(0);

    const fetchCountries = () => {
        const data = JSON.parse(JSON.stringify(DefaultCountryList));
        setCountries(data);
    }

    const setNewQuestion = (country_name = null) => {
        const remaining_countries = countries.filter(country => !country.done);

        let country_index = -1;
        if (country_name == null) country_index = gen_random(remaining_countries.length);
        else remaining_countries.map((country, index) => {
            if (country.name == country_name) country_index = index;
        });

        // REMOVE AFTER GETTING DATA
        country_index = (country_index == -1) ? 0 : country_index;
        
        const current_country = { ...remaining_countries[country_index] };
        const current_question = current_country.questions[gen_random(current_country.questions.length)];
        
        const removed_country = remaining_countries.splice(country_index, 1)[0];
        removed_country.done = true;

        setCountries([
            ...countries.filter(country => country.done),
            ...remaining_countries
        ]);
        setCurrentCountry(current_country);
        setCurrentQuestion(current_question);
    }

    const changeQuestion = () => {
        if (currentQuestion.answer == -1) {
            return sendError("Current question isn't answered");
        } else {
            const isCorrect = check_answer(currentQuestion, currentQuestion.answer);
            setScore(isCorrect ? score + 1 : score);
            if (countries.filter(country => !country.done).length == 0) {
                setCompleted(true);
            } else {
                setNewQuestion();
                return true;
            }
        }
    }

    const resetQuestionsContext = () => {
        fetchCountries();
        setCurrentQuestion(false);
        setCurrentCountry(null);
        setCompleted(false);
        setScore(0);
    }

    return (
        <QuestionsContext.Provider
            value={{
                currentQuestion, setCurrentQuestion,
                currentCountry,
                changeQuestion,
                completed,
                score,
                setNewQuestion,
                resetQuestionsContext
            }}
        >
            {children}
        </QuestionsContext.Provider>
    );
}