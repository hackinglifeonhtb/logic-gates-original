import {React, useState, useEffet} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import Header from './Header'
import './Login.css'
import TafkeerDesign from './Images/tafkeerDesign.png'
import discord from './Images/discord.png'
import tafkeer from './Images/tafkeer.png'
import DecorMakers from './Images/decor_makers_without_background.png'
import LogicGatesBanner from './Images/Logic Gates Logo Banner.mp4'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css" ;
import { useSearchParams } from "react-router-dom";
import email_icon from './Images/emails-login-pic-unscreen.gif'
import password_icon from './Images/lock-unscreen.gif'
import apple from './Images/apple.png'
import microsoft from './Images/microsoft.png'
import google from './Images/google.png'
import google_2 from './Images/google_2.png'
export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [searchParams, setSearchParams] = useSearchParams();
    const LoginProcess = () => {
        axios.post(`${process.env.REACT_APP_SSL_AVAILABILITY}://${process.env.REACT_APP_DB_SERVER_URI}/users/login`, {email,password})
            .then((res)=>{
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('email', res.data.email)
                toast.success('تم تسجيل الدخول بنجاح!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                setTimeout(()=>{
                    window.location.replace(searchParams.get("refer_to"))
                }, 1500);
            }).catch((err)=>{
                toast.error('تأكد من صحة البيانات', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }
    return (
        <>
            <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
            />
            <div style={{
                backgroundColor:'#F2F5F8',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                height:'100vh'
            }}>
                <div align="center" className="the-whole-login-container loginDiv-second">
                    <div align="center" className="the-whole-login-template-container">
                        <div style={{
                            display:'flex',
                            justifyContent:'space-around',
                            direction:'rtl'
                        }}>
                            <video src={LogicGatesBanner} autoplay="true" loop="true" className="login-video"></video>
                            <div align="center" style={{
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center'
                            }}>
                                <button className="to-signup-page-button">انشاء حساب</button>
                            </div>
                        </div>
                        <div style={{
                            display:'flex',
                            justifyContent:'space-around',
                            direction:'rtl'
                        }}>
                            <h3>تسجيل دخول</h3>
                            <div style={{
                                display:'flex',
                                justifyContent:'space-around',
                                width:'30%'
                            }}>
                                <div className="login-features">
                                    <img src={apple} width="20" />
                                </div>
                                <div className="login-features">
                                    <img src={google} width="20" />
                                </div>
                                <div className="login-features">
                                    <img src={microsoft} width="20" />
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="loginForm">
                        <div className="login-form-input">
                                <div className="login-form-input-container" align="center">
                                    <img src={email_icon} width="30" />
                                </div>
                                <input type="email" className='text-success' placeholder="البريد الالكتروني الخاص بك" onChange={(e)=>setEmail(e.target.value)} />
                            </div>
                            <br/>
                            <div className="login-form-input">
                                <div className="login-form-input-container" align="center">
                                    <img src={password_icon} width="30" />
                                </div>
                                <input type="password" className='text-success' placeholder="كلمة المرور الخاصة بك" onChange={(e)=>setPassword(e.target.value)} />
                            </div>
                            <br/>
                            <div style={{
                                display:'flex',
                                direction:'rtl',
                                justifyContent:'space-between',
                                alignItems:'center'
                            }}>
                                <Link to={`${process.env.REACT_APP_SSL_AVAILABILITY}://${process.env.REACT_APP_WEBSITE_URI}/sign_up`}><h5 style={{fontSize:'12px'}}>ليس لدي حساب؟</h5></Link>
                                <button value="تسجيل الدخول" onClick={()=>LoginProcess()}>تسجيل الدخول</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}