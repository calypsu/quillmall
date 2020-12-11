import React, { useContext, useEffect, useState } from 'react';
import { QuestionsContext } from '../contexts/Questions';
import { check_answer } from '../utils';

const replace_line_breaks = text => text.split(/\n/).map(e => <span>{e}<br /></span>);

export default function QuestionDialog(props) {
    const { currentQuestion, changeQuestion, setCurrentQuestion, completed } = useContext(QuestionsContext);

    const { show } = props;
    const TIMER_SECONDS = 2;

    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [timer, setTimer] = useState(TIMER_SECONDS);

    useEffect(() => {
        if (showCorrectAnswer) {
            setTimer(TIMER_SECONDS);
            const next = () => {
                const result = changeQuestion();
                setShowCorrectAnswer(false);
                if (result && result.error) alert(result.error);
            };
            setTimeout(next, 2000);
        }
    }, [showCorrectAnswer]);

    useEffect(() => {
        if (timer > 1 && showCorrectAnswer) setTimeout(() => {
            console.log(timer);
            setTimer(timer - 1);
        }, 1000);
    }, [timer, showCorrectAnswer]);

    if (currentQuestion && show && !completed) {
        let question = currentQuestion.question;
        question = replace_line_breaks(question);

        return (
            <div className="absolute top-0 right-0" style={{
                height: '100vh',
                background: 'transparent linear-gradient(90deg, #CF4630 0%, #D04631 5%, #E3473B 60%, #EA483F 100%) 0% 0% no-repeat padding-box;',
                width: '50vw'
            }}>
                <div className="question">
                    {question}
                    <ul>
                        {currentQuestion.options.map((option, index) => (
                            <li className="option" key={index}>
                                <button { ...(!showCorrectAnswer ? {
                                    onClick: () => {
                                        setCurrentQuestion({
                                            ...currentQuestion,
                                            answer: index
                                        })
                                        setShowCorrectAnswer(true)
                                    }
                                } : {
                                    // SET CLASSNAME FOR RIGHT OR WRONG HERE
                                    className: check_answer(currentQuestion, index) ? 'correct' : 'wrong'
                                }) }>
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                    {!showCorrectAnswer ?
                        ''
                        :
                        <>
                            <span>Next question in {timer} seconds</span>
                            {currentQuestion.answer == currentQuestion.correct_answer ?
                                <audio autoplay="true">
                                    <source src={require('../assets/sounds/correct.wav').default} type="audio/wav" />
                                </audio>
                                :
                                <audio autoplay="true">
                                    <source src={require('../assets/sounds/incorrect.wav').default} type="audio/wav" />
                                </audio>
                            }
                        </>
                    }
                </div>
            </div>
        );
    } else {
        return (<></>)
    }
}