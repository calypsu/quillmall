import React, { useEffect, useState } from 'react';
import { sendError, gen_random, check_answer } from '../utils';

export const QuestionsContext = React.createContext();

const _question = (question, options, correct_answer) => ({ question, options, correct_answer });

export default function QuestionsContextProvider({ children }) {
    const [countries, setCountries] = useState([
        {
            name: "Syria",
            questions: [
                _question("What is the name of this country?", ['Syria', 'Israel'], 0),
                _question("What is the most important thing about this country", ['Tatti', 'Goo'], 0)
            ],
            done: false
        },
        {
            name: "Israel",
            questions: [
                _question("What is the name of this country?", ['Israel', 'Jordan'], 0),
                _question("Is Mossad of this country?", ['Yes', 'No'], 0)
            ],
            done: false
        },
        {
            name: "Jordan",
            questions: [
                _question("What is the name of this country?", ['Jordan', 'India'], 0),
                _question("Janardhan Jhankad aka this country?", ['Yes', 'No'])
            ],
            done: false
        }
    ]);

    const [currentQuestion, setCurrentQuestion] = useState();
    const [currentCountry, setCurrentCountry] = useState(null);
    const [completed, setCompleted] = useState(false);
    const [score, setScore] = useState(0);

    const setNewQuestion = () => {
        const remaining_countries = countries.filter(country => !country.done);
        const country_index = gen_random(remaining_countries.length);
        const current_country = { ...remaining_countries[country_index] };
        const current_question = current_country.questions[gen_random(current_country.questions.length)];
        
        const removed_country = remaining_countries.splice(country_index, 1);
        removed_country.done = true;
        setCountries([
            ...countries.filter(country => country.done),
            removed_country,
            ...remaining_countries
        ]);
        
        setCurrentCountry(current_country);
        setCurrentQuestion(current_question);
    }

    const changeQuestion = () => {
        if (isNaN("" + currentQuestion.answer)) {
            return sendError("Current question isn't answered");
        } else {
            const isCorrect = check_answer(currentQuestion, currentQuestion.answer);
            setScore(isCorrect ? score + 1 : score);
            if (countries.filter(country => !country.done).length == 0) {
                setCompleted(true);
            } else {
                console.log(JSON.stringify({
                    currentCountry,
                    length: countries.length
                }))
                setNewQuestion();
                return true;
            }
        }
    }

    useEffect(() => {
        if (countries && countries.length > 0) {
            setNewQuestion();
        }
    }, [Array.isArray(countries)]);

    return (
        <QuestionsContext.Provider
            value={{
                currentQuestion, setCurrentQuestion,
                currentCountry,
                changeQuestion,
                completed,
                score
            }}
        >
            {children}
        </QuestionsContext.Provider>
    );
}