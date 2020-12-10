import React, { useContext } from 'react';
import { QuestionsContext } from '../contexts/Questions';
import { Redirect } from 'react-router-dom';

export default function QuizCompletePage() {
    const { completed, score } = useContext(QuestionsContext);

    if (!completed) return <Redirect to="/" />;
    return (
        <div className="w-container">
            <form>
                
            </form>
        </div>        
    )
}