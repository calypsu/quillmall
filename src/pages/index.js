import React from 'react';
import { Link } from 'react-router-dom';
import homeIllustration from '../assets/images/home.png'
import logo from '../assets/images/logo.svg'

export default function IndexPage() {
    return (
        <div className="vh-100 overflow-y-hidden root-container">
            <div className="flex h-100">
                <div className="w-50 flex justify-end items-end">
                    <img src={homeIllustration} className="w-70 " alt="two books and a person"/>
                </div>
                <div className="w-50 pa4">
                    <div className="tc flex flex-column justify-center items-center h-100">
                        <img src={logo} className="w-50 pv4" alt=""/>
                        <div className="pv4" style={{fontSize: "3.275rem", color: "#7F2DA1", lineHeight: "4rem"}}>
                        ساعدوا عبيد على التزود بالوقود اللازم
للتنقل بين البلدان عبر الإجابة
عن الأسئلة بإجابات صحيحة
                        </div>
                        <Link className="pv4" to="/map"><button className="primary-button">ابدأ الرحلة
مـع عبيــــد</button></Link>
                    </div>
                </div>
            </div>
            {/* <h1>Index Page</h1> */}
        </div>
    )
}