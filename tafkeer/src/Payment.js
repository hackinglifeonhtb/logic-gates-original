import {React, useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import LogicGatesBanner from './Images/Logic Gates 2.mp4'
import './Payment.css'

export default function Payment() {
    const {SubscriptionType, PaymentToken} = useParams();
    const [cardNumber, setCardNumber] = useState('');
    const [Address, setAddress] = useState('');
    const [nameOnCard, setnameOnCard] = useState('');
    const [cvv, setCVV] = useState('');
    const [endDate, setEndDate] = useState('');
    const [paymentName, setPaymentName] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    useEffect(()=>{
        console.log('yesddd')
        axios.post(`${process.env.REACT_APP_SSL_AVAILABILITY}://${process.env.REACT_APP_DB_SERVER_URI}/api/verify`, {token: localStorage.getItem('token') || ''}, {headers:{'x-access-token':localStorage.getItem('token'), 'email':localStorage.getItem('email')}})
          .then((res)=>{
            if(res.data.firstName !== undefined && res.data.secondName !== undefined)
              setName(res.data.firstName+' '+res.data.secondName)
              setEmail(res.data.email);
          }).catch((err)=>{
    
          })
      },[])
    return (
        <>
            <Header/>
            <div>
                <div style={{
                    backgroundColor:'#F2F5F8',
                    width:'100%',
                    height:'100vh',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <div style={{
                        backgroundColor:'white', 
                        boxShadow: '0 10px 15px rgba(69, 79, 88, 0.05)',
                        padding:'20px 15px',
                        height:'500px',
                        width:'400px',
                        borderRadius:'10px'
                    }}>
                        <h3 className="black-color middle"><strong>{name}</strong> Payment</h3>
                        <div dir="rtl">
                            <h5 style={{fontSize:'14px'}}>الاسم على البطاقة</h5>
                            <input type="text" placeholder="Name on Card" className="payment-input" style={{
                                width:"200px"
                             }} />
                            <h5 style={{fontSize:'14px'}}>رقم البطاقة</h5>
                             <input type="text" placeholder="Card Number" className="payment-input" style={{
                                width:"200px"
                             }} />
                            <h5 style={{fontSize:'14px'}}>تاريخ الانتهاء</h5>
                             <input type="text" placeholder="End Date" className="payment-input" style={{
                                width:"200px"
                             }} />
                            <h5 style={{fontSize:'14px'}}>CVV</h5>
                             <input type="text" placeholder="CVV" className="payment-input" style={{
                                width:"200px"
                             }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}