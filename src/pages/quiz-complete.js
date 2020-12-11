import React, { useContext } from 'react';
import { QuestionsContext } from '../contexts/Questions';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function QuizCompletePage() {
    const { completed, score } = useContext(QuestionsContext);

    const { handleSubmit, errors, register } = useForm();
    const validators = {
        phone: /^(\+\d{1,3}[- ]?)?\d{10}$/,
        email: /\S+@\S+\.\S+/,
    }
    
    const submitForm = values => {
        values.score = score ? score : -1;
        fetch('https://hooks.zapier.com/hooks/catch/5078083/oe7f7l9/', {
            method: 'POST',
            body: JSON.stringify(values)
        })
            .then(console.log)
            .catch(console.error)
    }

    if (!completed) return <Redirect to="/" />;
    return (
        <div className="w-container">
            <form onSubmit={handleSubmit(submitForm)}>
                <input type="text" name="name" ref={register({ required: true })} placeholder="Name" /><br />
                {errors && errors.name && errors.name.message}<br />
                <input type="text" name="phone" ref={register({ required: true, pattern: validators.phone })} placeholder="Phone" /><br />
                {errors && errors.phone && errors.phone.message}<br />
                <input type="text" name="email" ref={register({ required: true, pattern: validators.email })} placeholder="Email" /><br />
                {errors && errors.email && errors.email.message}<br />
                <input type="submit" value="Submit" />
            </form>
        </div>        
    )
}