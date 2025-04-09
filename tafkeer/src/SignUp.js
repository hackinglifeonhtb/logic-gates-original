import {React, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import Header from './Header'
import './Login.css'
import './SignUp.css'
import TafkeerDesign from './Images/tafkeerDesign.png'
import discord from './Images/discord.png'
import tafkeer from './Images/tafkeer.png'
import LogicGatesBanner from './Images/Logic Gates Logo Banner.mp4'
import email_icon from './Images/email_icon_1.png'
import email_icon_2 from './Images/email_icon_2.png'
import apple from './Images/apple.png'
import microsoft from './Images/microsoft.png'
import google from './Images/google.png'
import google_2 from './Images/google_2.png'
import { ToastContainer, toast } from 'react-toastify';

export default function SignUp() {
    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = () => {
        //Calling to the Netlify Function you created
        fetch("./.netlify/functions/triggerSubscribeEmail", {
          method: "POST",
          body: JSON.stringify({
            subscriberName: firstName + ' ' + secondName,
            subscriberEmail: email,
            inviteeEmail: "info@netlify.com"
          })
        })
      }
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
                handleSubmit();
                setTimeout(()=>{
                    window.location.replace(`${process.env.REACT_APP_SSL_AVAILABILITY}://${process.env.REACT_APP_WEBSITE_URI}`)
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
    const SignUpProcess = () => {
        axios.post(`${process.env.REACT_APP_SSL_AVAILABILITY}://${process.env.REACT_APP_DB_SERVER_URI}/users/register`, {firstName, secondName, email,password})
            .then((res)=>{
                LoginProcess()
            }).catch((err)=>{
                console.log(err)
                toast.error(err.response.data.message, {
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
                backgroundColor:'#F2F5F8'
            }}>
                <div align="center" style={{
                    height:'100vh',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }} className="loginDiv-second">
                    <div align="center" style={{
                        backgroundColor:'white',
                        boxShadow:'10px 10px 10px white',
                        padding:'20px',
                        borderRadius:'10px',
                        width:'800px',
                        color:'black'
                    }}>
                        <div style={{
                            display:'flex',
                            justifyContent:'space-around',
                            direction:'rtl'
                        }}>
                            <video src={LogicGatesBanner} autoplay="true" loop="true"></video>
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
                                <div style={{
                                    backgroundColor:'#F2F5F8',
                                    padding:'15px',
                                    borderRadius:'50%'
                                }} className="to-signup-page-button">
                                    <img src={apple} width="30" />
                                </div>
                                <div style={{
                                    backgroundColor:'#F2F5F8',
                                    padding:'15px',
                                    borderRadius:'50%'
                                }} className="to-signup-page-button">
                                    <img src={google} width="30" />
                                </div>
                                <div style={{
                                    backgroundColor:'#F2F5F8',
                                    padding:'15px',
                                    borderRadius:'50%'
                                }} className="to-signup-page-button">
                                    <img src={microsoft} width="30" />
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="loginForm">
                        <div style={{
                                display:'flex',
                                direction:'rtl',
                                backgroundColor:'#F2F5F8',
                                color:'#393D48',
                                width:'85%',
                                padding:'10px',
                                borderRadius:'50px',
                                alignItems:'center',
                            }}>
                                <div align="center" style={{
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    height:'100%',
                                    width:'10%',
                                }}>
                                    <img src={email_icon} width="40" />
                                </div>
                                <input type="text" className='text-success' placeholder="الاسم الأول" onChange={(e)=>setFirstName(e.target.value)} />
                            </div>
                            <br/>
                            <div style={{
                                display:'flex',
                                direction:'rtl',
                                backgroundColor:'#F2F5F8',
                                color:'#393D48',
                                width:'85%',
                                padding:'10px',
                                borderRadius:'50px',
                                alignItems:'center'
                            }}>
                                <div align="center" style={{
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    width:'10%'
                                }}>
                                    <img src={email_icon} width="40" />
                                </div>
                                <input type="text" className='text-success' placeholder="الاسم الثاني" onChange={(e)=>setSecondName(e.target.value)} />
                            </div>
                            <div style={{
                                display:'flex',
                                direction:'rtl',
                                backgroundColor:'#F2F5F8',
                                color:'#393D48',
                                width:'85%',
                                padding:'10px',
                                borderRadius:'50px',
                                alignItems:'center'
                            }}>
                                <div align="center" style={{
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    width:'10%'
                                }}>
                                    <img src={email_icon} width="40" />
                                </div>
                                <input type="email" className='text-success' placeholder="البريد الالكتروني الخاص بك" onChange={(e)=>setEmail(e.target.value)} />
                            </div>
                            <div style={{
                                display:'flex',
                                direction:'rtl',
                                backgroundColor:'#F2F5F8',
                                color:'#393D48',
                                width:'85%',
                                padding:'10px',
                                borderRadius:'50px',
                                alignItems:'center'
                            }}>
                                <div align="center" style={{
                                    display:'flex',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    width:'10%'
                                }}>
                                    <img src={email_icon} width="40" />
                                </div>
                                <input type="password" className='text-success' placeholder="كلمة المرور الخاصة بك" onChange={(e)=>setPassword(e.target.value)} />
                            </div>
                            <br/>
                            <Link to={`${process.env.REACT_APP_SSL_AVAILABILITY}://${process.env.REACT_APP_WEBSITE_URI}/sign_up`}><h5 style={{padding:'15px'}}>ليس لدي حساب؟</h5></Link>
                            <button value="تسجيل الدخول" onClick={()=>SignUpProcess()}>تسجيل الدخول</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}