import React, { useContext, useEffect, useState } from 'react';
import { QuestionsContext } from '../contexts/Questions';
import { check_answer } from '../utils';

const replace_line_breaks = text => text.split(/\n/).map(e => <span>{e}<br /></span>);

export default function QuestionDialog(props) {
    const { countries, currentQuestion, changeQuestion, setCurrentQuestion, completed } = useContext(QuestionsContext);

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
            setTimer(timer - 1);
        }, 1000);
    }, [timer, showCorrectAnswer]);

    if (currentQuestion && show && !completed) {
        let question = currentQuestion.question;
        question = replace_line_breaks(question);

        return (
            <div className="absolute top-0 right-0 pv5 ph6" style={{
                height: '100vh',
                background: 'linear-gradient(90deg, #CF4630 0%, #D04631 5%, #E3473B 60%, #EA483F 100%)',
                width: '50vw'
            }}>
                <div className="question">
                    <div className="pv5 tc">
                        <span style={{border: "5px dashed white", borderRadius: "50%", padding: "0px 30px", fontSize: "3.25rem", color: "white"}}>
                            {countries.filter(q => q.done).length}
                        </span>
                        <span className="pl3" style={{fontSize: "3.25rem", color: "white"}}>
                        السؤال
                        </span>    
                    </div> 
                    <div className="pv4 tr" style={{ fontSize: "3.25rem", color: "white"}}>
                    {question}
                    </div>
                    <ul style={{listStyleType: "none", paddingInlineStart: "0"}}>
                        {currentQuestion.options.map((option, index) => (
                            <li className="option mv4" key={index}>
                                <button style={{fontSize: "3.25rem", padding: "20px 40px", 
                                border: "10px solid #054BC8", 
                                borderRadius: "20px", width: "100%"}} { ...(!showCorrectAnswer ? {
                                    onClick: () => {
                                        setCurrentQuestion({
                                            ...currentQuestion,
                                            answer: index
                                        })
                                        setShowCorrectAnswer(true)
                                    },
                                } : {
                                    // SET CLASSNAME FOR RIGHT OR WRONG HERE
                                    id: check_answer(currentQuestion, index) ? 'correct' : 'wrong'
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
                            <span style={{color: "white", fontSize: "1.5rem"}}></span>
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