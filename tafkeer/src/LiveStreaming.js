import logo from './logo.svg';
import axios from 'axios'
import tafkeer from './Images/tafkeer.png'
import cpp from './Images/cpp.svg.png'
import java from './Images/java.png'
import js from './Images/js-removebg-preview.png'
import python from './Images/python-removebg-preview.png'
import ruby from './Images/ruby.png'
import './App.css'
import man1 from './Images/man1.jpg'
import man2 from './Images/man2.jpg'
import man3 from './Images/man3.jpg'
import man4 from './Images/man4.jpg'
import profile from './Images/profile.png'
import photo from './Images/photo.jpg'
import Header from './Header'
import decor_makers from './Images/decormakers1.png'
import DecorMakers from './Images/decor_makers_without_background.png'
import pinterest from './Images/pinterest.png'
import discord from './Images/discord.png'
import whatsapp from './Images/whatsapp.png'
import DecorMakers2 from './Images/DecorMakers.png'
import decor_video from './Images/decor_video.mp4'
import nice_video from './Images/nice_video.mp4'
import video1 from './Images/1.mp4'
import video2 from './Images/2.mp4'
import video3 from './Images/3.mp4'
import video4 from './Images/4.mp4'
import video5 from './Images/5.mp4'
import video6 from './Images/6.mp4'
import video7 from './Images/7.mp4'
import video8 from './Images/8.mp4'
import video9 from './Images/9.mp4'
import video10 from './Images/10.mp4'
import black_background from './Images/black_background.jpeg'
import pic from './Images/niceat33.jpg'
import LogicGates from './Images/logic-gates-removebg-preview.png'
import LogicGatesBanner from './Images/Logic Gates 2.mp4'
import trusted_1 from './Images/shield.png'
import trusted_2 from './Images/stamp.png'
import trusted_3 from './Images/trustworthiness.png'
import available from './Images/checkmark9.png'
import goverment_licence from './Images/goverment_licence.jpg'
import ExamTime from './Images/exam-time.png'
import logo_logicgates from './Images/logo_logicgates.gif';
import logicgates_tests from './Images/tests-logicgates.png'
import math from './Images/educational-book.gif'
import developer from './Images/code.png'
import layer from './Images/layers_1.png'
import react from './Images/physics.gif'
import node from './Images/programing.png'
import logicgates_customer_service from './Images/customer-service.png'
import solving_projects from './Images/solve-projects.png'
import tiktok from './Images/tiktok.png'
import instagram from './Images/instagram.png'
import twitter from './Images/twitter.png'
import youtube from './Images/youtube.png'
import facebook from './Images/facebook.png'
import mada from './Images/mada_2.png'
import vat from './Images/VAT.png'
import './Exams.css'
import './Consultations.css'
import happy from './Images/happy.gif'
import happy_1 from './Images/happy_1.gif'
import happy_2 from './Images/happy_2.gif'
import sticker from './Images/sticker.gif'
import image_uploading from './Images/interaction.gif'
import helpdesk from './Images/helpdesk.gif'
import email_gif from './Images/email.gif'
import logicGatesLoading from './Images/Logic Gates 3.gif'
import 'bootstrap/dist/css/bootstrap.css';
//import video11 from './Images/11.mp4'
//import video12 from './Images/12.mp4'
import {React, useEffect, useState, useRef} from 'react'
import {useParams} from 'react-router-dom'
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";
import * as PusherPushNotifications from "@pusher/push-notifications-web";
import Pusher from 'pusher-js';

export default function LiveStreaming() {
  const {consultation_id} = useParams();
  const [name, setName] = useState('')
  const [keys, setKeys] = useState([])
  const [randomW, setRandomW] = useState([])
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [notifications, setNotifications] = useState(0)
  const video1before_animation = batch(StickyIn(), FadeIn(), ZoomIn());
  const video2before_animation = batch(StickyOut(), FadeIn(), ZoomIn(), MoveIn(0,-200));
  const video3before_animation = batch(StickyOut(), FadeIn(), ZoomIn(), MoveOut(0,-200));
  const video4before_animation = batch(StickyOut(), FadeIn(), ZoomIn(), MoveOut(0,-200));
  const video5before_animation = batch(StickyOut(), FadeIn(), ZoomIn(), MoveIn(0,-200));
  const video6before_animation = batch(StickyOut(), FadeIn(), ZoomIn(), MoveOut(0,-200));
  const video1animation = batch(StickyIn(), FadeIn(), ZoomIn());
  const video2animation = batch(StickyIn(), FadeIn(), ZoomIn());
  const video3animation = batch(StickyOut(), FadeIn(), ZoomIn(), MoveIn(0,-200));
  const video4animation = batch(StickyOut(), FadeIn(), ZoomIn(), MoveOut(0,-200));
  const [exams, setExams] = useState([])
  const [messages, setMessages] = useState([])
  const [tags, setTags] = useState([])
  const [consultationer, setConsultationer] = useState(false)
  const [inBottom, setInBottom] = useState(false)
  const [typing, setTyping] = useState([])
  const element = useRef(null);
  const [typingStatusRN, setTypingStatusRN] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    setRandomW([`${Math.random()*75}%`,`${Math.random()*75}%`,`${Math.random()*75}%`])
    console.log('yesddd')
    axios.post(`${process.env.REACT_APP_SSL_AVAILABILITY}://${process.env.REACT_APP_DB_SERVER_URI}/api/verify`, {token: localStorage.getItem('token') || ''}, {headers:{'x-access-token':localStorage.getItem('token'), 'email':localStorage.getItem('email')}})
      .then((res)=>{
          console.log(res.data)
          setUsername(res.data.firstName+' '+res.data.secondName)
          setEmail(res.data.email)
          console.log('explore')
          setLoading(false)
      }).catch((err)=>{

      })
  },[])
  useEffect(()=>{
    const pusher = new Pusher('19c2eb03ffadb575a377', {
        cluster: 'ap2'
    });
    const channel = pusher.subscribe(`logic-gates-${consultation_id}`);
    console.log(consultation_id)
    return () => {
        pusher.unsubscribe(`logic-gates-${consultation_id}`); 
    }
  }, [])
  return (
    <>
    <div>
        <Header />
      </div>
    { loading ? <div align="center" style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}><img src={logicGatesLoading} width="300" /></div> :
    <>
    
    </>
    }
    </>
  );
}
