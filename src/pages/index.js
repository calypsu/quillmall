import React from 'react';
import { Link } from 'react-router-dom';
import homeIllustration from '../assets/images/home.png'
import logo from '../assets/images/logo.svg'

export default function IndexPage() {
    return (
        <Link className="pv4" to="/map">
            <div className="vh-100 overflow-y-hidden root-container">
                <div className="flex h-100">
                    <div className="w-50 flex justify-end items-end">
                        <img src={homeIllustration} className="w-70" style={{maxHeight: "90vh"}} alt="two books and a person"/>
                    </div>
                    <div className="w-50 pa4">
                        <div className="tc flex flex-column justify-center items-center h-100">
                            <img src={logo} className="w-50 pv4" alt=""/>
                            <div className="pv4" style={{fontSize: "2.5rem", color: "#7F2DA1", lineHeight: "3.2rem"}}>
                            ساعدوا عبيد على التزود بالوقود اللازم
    للتنقل بين البلدان عبر الإجابة
    عن الأسئلة بإجابات صحيحة
                            </div>
                            <button className="primary-button">ابدأ الرحلة
    مـع عبيــــد</button>
                        </div>
                    </div>
                </div>
                {/* <h1>Index Page</h1> */}
            </div>
        </Link>
    )
}