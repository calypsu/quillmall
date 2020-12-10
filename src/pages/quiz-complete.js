import React, { useContext } from 'react';
import { QuestionsContext } from '../contexts/Questions';
import { Redirect } from 'react-router-dom';

export default function QuizCompletePage() {
    const { completed, score } = useContext(QuestionsContext);

    if (!completed) return <Redirect to="/" />;
    return (
        <div className="score">
            <div>Your score: {score}</div>
            <div>Share</div>
        </div>        
    )
}