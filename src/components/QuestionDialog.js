import React, { useContext, useEffect, useState } from 'react';
import { QuestionsContext } from '../contexts/Questions';
import { check_answer } from '../utils';

const replace_line_breaks = text => text.split(/\n/).map(e => <span>{e}<br /></span>);

export default function QuestionDialog(props) {
    const { currentQuestion, changeQuestion, setCurrentQuestion, completed } = useContext(QuestionsContext);

    const { show } = props;

    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [timer, setTimer] = useState(2);

    useEffect(() => {
        if (showCorrectAnswer) {
            const next = () => {
                setTimer(2);
                const result = changeQuestion();
                setShowCorrectAnswer(false);
                if (result && result.error) alert(result.error);
            };
            setTimeout(next, 2000);
        }
    }, [showCorrectAnswer]);

    useEffect(() => {
        if (timer > 0 && showCorrectAnswer) setTimeout(() => {
            setTimer(timer - 1);
        }, 1000);
    }, [timer, showCorrectAnswer]);

    if (currentQuestion && show && !completed) {
        let question = currentQuestion.question;
        question = replace_line_breaks(question);

        return (
            <div className="absolute top-0 right-0" style={{
                height: '100vh',
                background: 'rgba(0,0,0,0.3)',
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
                        <span>Next question in {timer} seconds</span>
                    }
                </div>
            </div>
        );
    } else {
        return (<></>)
    }
}