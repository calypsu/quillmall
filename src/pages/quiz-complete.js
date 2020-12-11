import React, { useContext } from 'react';
import { QuestionsContext } from '../contexts/Questions';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import shekhPartial from '../assets/images/shekh-partial.svg';
import logo from '../assets/images/logo.svg';

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
            .then(response => {
                alert('Thank you!');
                window.location.href = '/';
            })
            .catch(console.error)
    }

    if (!completed) return <Redirect to="/" />;
    return (
        <div className="w-container pl5 pt5 pr5">
            <div className="flex justify-end">
                <img src={shekhPartial} alt=""/>
                <div>
                            <div className="tr" style={{fontSize: "3.35rem"}}>
                            لقد ساعدتم عبيد
                            <br/>
                            على إنجاز مهمته شكراً لكم
                            </div>
                            <div className="mv4 tr" style={{fontSize: "5rem", fontWeight: "bold"}}>
                                    <span>{score}</span> / <span>10</span>                                
                            </div>
                </div>
                <div className="ph6 pv4">
                    <img src={logo} alt="logo"/>
                </div>
            </div>

            <form className="pv4 ph5" style={{background: "radial-gradient(closest-side at -59% 201%, #DB0061 0%, #F27C00 100%)", borderRadius: "20px 20px 0px 0px"}} onSubmit={handleSubmit(submitForm)}>
                <input type="text" name="name" className="contact-input mt4 w-100 tr"
                style={{padding: "20px 40px", fontSize: "3rem", color: "white", background: "rgb(255 255 255 / 71%)", border: "none", borderRadius: "10px" }} 
                ref={register({ required: true })} placeholder="الاسم" />
                {errors && errors.name && errors.name.message}<br />
                <div className="flex">
                    <input type="text" className="mv4 mr4 w-50 contact-input tr" 
                    style={{padding: "20px 40px", fontSize: "3rem", color: "white", background: "rgb(255 255 255 / 71%)", border: "none", borderRadius: "10px" }} 
                    name="phone" ref={register({ required: true, pattern: validators.phone })} placeholder="رقم الهاتف" /><br />
                    {errors && errors.phone && errors.phone.message}
                    <input type="text" className="mv4 w-50 contact-input tr"
                    style={{padding: "20px 40px", fontSize: "3rem", color: "white", background: "rgb(255 255 255 / 71%)", border: "none", borderRadius: "10px" }} 
                    name="email" ref={register({ required: true, pattern: validators.email })} placeholder="البريد الإلكتروني " /><br />
                    {errors && errors.email && errors.email.message}
                </div>
                <div className="flex justify-center">

                <input type="submit" className="mv4"
                style={{padding: "20px 40px", fontSize: "3.25rem", 
                color: "white", border: "5px solid white", background: "transparent", borderRadius: "10px"}} value="إرسال" placeholder="إرسال" />
                </div>
            </form>
        </div>        
    )
}