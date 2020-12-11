import React, { useContext, useState } from 'react';
import { QuestionsContext } from '../contexts/Questions';
import { check_answer } from '../utils';

const replace_line_breaks = text => text.split(/\n/).map(e => <span>{e}<br /></span>);

export default function QuestionDialog(props) {
    const { currentQuestion, changeQuestion, setCurrentQuestion, completed } = useContext(QuestionsContext);

    const { show } = props;

    const [selectedAnswer, setSelectedAnswer] = useState(-1);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

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
                                <button {...(!showCorrectAnswer ? {
                                    onClick: () => setSelectedAnswer(index),
                                    // SET CLASSNAME FOR SELECTED HERE
                                    className: selectedAnswer == index ? 'selected': ''
                                } : {
                                    // SET CLASSNAME FOR RIGHT OR WRONG HERE
                                    className: check_answer(currentQuestion, index) ? 'correct' : 'wrong'
                                })}>
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                    {!showCorrectAnswer ?
                        <button onClick={() => {
                            setCurrentQuestion({
                                ...currentQuestion,
                                answer: selectedAnswer
                            })
                            setShowCorrectAnswer(true)
                        }}>Submit</button>
                        :
                        <button onClick={() => {
                            const result = changeQuestion();
                            setShowCorrectAnswer(false);
                            if (result && result.error) alert(result.error);
                        }}>Next</button>
                    }
                </div>
            </div>
        );
    } else {
        return (<></>)
    }
}