import React, { useEffect, useState } from 'react';
import { sendError, gen_random, check_answer } from '../utils';
import { countries as TotalCountryList } from '../assets/documents/countries';

export const QuestionsContext = React.createContext();

export default function QuestionsContextProvider({ children }) {

    const [level, setLevel] = useState(null);
    const [DefaultCountryList, setDefaultCountryList] = useState(TotalCountryList[0]);
    const [countries, setCountries] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentCountry, setCurrentCountry] = useState(null);
    const [completed, setCompleted] = useState(false);
    const [score, setScore] = useState(0);

    const fetchCountries = () => {
        const data = JSON.parse(JSON.stringify(DefaultCountryList));
        shuffle(data);
        setCountries(data.slice(0, 10));
    }

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }      

    const setNewQuestion = (country_name = null) => {
        let scope_countries = [...countries];
        let remaining_countries = scope_countries.filter(country => !country.done);

        let country_index = -1;
        if (country_name == null) country_index = gen_random(remaining_countries.length);
        else {
            remaining_countries.map((country, index) => {
                if (country.name == country_name) country_index = index;
            });

            // IF THE COUNTRY DOES NOT EXIST IN THE LIST OF REMAINING COUNTRIES
            // THEN IT CREATES A NEW LIST THAT REMOVES ONE COUNTRY AND ADDS THE NEW COUNTRY
            if (country_index == -1) {
                const excludedCountry = DefaultCountryList.find(country => country.name == country_name);
                remaining_countries[remaining_countries.length - 1] = excludedCountry;
                scope_countries[scope_countries - 1] = excludedCountry;
            }
        }

        // REMOVE AFTER GETTING DATA
        country_index = (country_index == -1) ? 0 : country_index;
        
        const current_country = { ...remaining_countries[country_index] };
        const current_question = current_country.questions[gen_random(current_country.questions.length)];
        
        const removed_country = remaining_countries.splice(country_index, 1)[0];
        removed_country.done = true;

        setCountries([...scope_countries]);
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
        setLevel(null);
        setCurrentQuestion(false);
        setCurrentCountry(null);
        setCompleted(false);
        setScore(0);
    }

    useEffect(() => {
        fetchCountries();
    }, [DefaultCountryList]);

    useEffect(() => {
        if (level !== null) setDefaultCountryList(TotalCountryList[level])
    }, [level]);

    return (
        <QuestionsContext.Provider
            value={{
                level, setLevel,
                currentQuestion, setCurrentQuestion,
                currentCountry,
                changeQuestion,
                completed,
                score,
                setNewQuestion,
                resetQuestionsContext,
                countries,
            }}
        >
            {children}
        </QuestionsContext.Provider>
    );
}