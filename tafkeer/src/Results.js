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
import './Results.css'
import {useParams, Link, useSearchParams} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import logicGatesLoading from './Images/Logic Gates 3.gif'
//import video11 from './Images/11.mp4'
//import video12 from './Images/12.mp4'
import {React, useEffect, useState, useRef} from 'react'
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";
export default function Exams() {
  let timer = false;
  const {exam_id} = useParams();
  const [name, setName] = useState('')
  const [keys, setKeys] = useState([])
  const [randomW, setRandomW] = useState([])
  const intervalRef = useRef(null)
  const [count, setCount] = useState(0)
  /*const [progressStartValue, setProgressStartValue] = useState(0);*/
  const [progressEndValueState, setProgressEndValueState] = useState(-1);
  const [progressEndValueState2, setProgressEndValueState2] = useState(-1);
  const [progressEndValueState3, setProgressEndValueState3] = useState(-1);
  const [progressEndValueState4, setProgressEndValueState4] = useState(-1);
  const [progressEndValueState5, setProgressEndValueState5] = useState(-1);
  const [progressEndValueState6, setProgressEndValueState6] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [progress3, setProgress3] = useState(0);
  const [progress4, setProgress4] = useState(0);
  const [progress5, setProgress5] = useState(0);
  const [progress6, setProgress6] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState([0,3.6]);
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
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    setRandomW([`${Math.random()*75}%`,`${Math.random()*75}%`,`${Math.random()*75}%`])
    console.log('yesddd')
    axios.post(`${process.env.REACT_APP_SSL_AVAILABILITY}://${process.env.REACT_APP_DB_SERVER_URI}/api/verify`, {token: localStorage.getItem('token') || ''}, {headers:{'x-access-token':localStorage.getItem('token'), 'email':localStorage.getItem('email')}})
      .then((res)=>{
        if(res.data.firstName !== undefined && res.data.secondName !== undefined)
          setName(res.data.firstName+' '+res.data.secondName)
          console.log('explore')
          axios.post(`${process.env.REACT_APP_SSL_AVAILABILITY}://${process.env.REACT_APP_DB_SERVER_URI}/results`, {email:res.data.email,exam_id})
                .then((res2)=>{
                    console.log(res2.data)
                    setLoading(false);
                    setProgressEndValueState(res2.data.results[res2.data.results.length-1].result)
                    setProgressEndValueState2(res2.data.results[res2.data.results.length-2].result)
                    setProgressEndValueState3(res2.data.results[res2.data.results.length-3].result)
                    setProgressEndValueState4(res2.data.results[res2.data.results.length-4].result)
                    setProgressEndValueState5(res2.data.results[res2.data.results.length-5].result)
                    setProgressEndValueState6(res2.data.results[res2.data.results.length-6].result)
                }).catch((err)=>{
                    console.log(err)
                })
      }).catch((err)=>{

      })
  },[])
  /*const progress_callback = async () => {
    let progressStartValue = await 0,    
    progressEndValue = progressEndValueState,    
    speed = await 100;
    
    let progress1 = setInterval(async () => {
        await progressStartValue++;
        console.log(progressStartValue)
        await setProgress((progress) => progress+1)
        await setBackgroundColor(`conic-gradient(#7d2ae8 ${progressStartValue * 3.6}deg, #ededed 0deg)`);
        if(progressStartValue == progressEndValue){
            clearInterval(progress1);
        }
    }, speed);
  }
  const yinterval = () => {
    console.log(progress, progressEndValueState)
    if (progressEndValueState !== progress) {
      intervalRef.current = setInterval(() => {
        console.log(progress, progressEndValueState)
        setProgress(progress => progress + 1);
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    
   return () => clearInterval(intervalRef.current); // cleanup function
  };*/
  useEffect(()=>{
    if(progressEndValueState > 0 && progress < progressEndValueState) {
      const interval = setInterval(() => {
          setBackgroundColor(backgroundColor[0]+1, backgroundColor[0]+1 * 3.6);
          setProgress(progress + 1);
      }, 15);
    //Clearing the interval
    return () => clearInterval(interval);
    }
  },[progress, progressEndValueState])
  useEffect(()=>{
    if(progressEndValueState2 > 0 && progress2 < progressEndValueState2) {
      const interval = setInterval(() => {
          setProgress2(progress2 + 1);
      }, 15);
    //Clearing the interval
    return () => clearInterval(interval);
    }
  },[progress2, progressEndValueState2])
  useEffect(()=>{
    if(progressEndValueState3 > 0 && progress3 < progressEndValueState3) {
      const interval = setInterval(() => {
          setProgress3(progress3 + 1);
      }, 15);
    //Clearing the interval
    return () => clearInterval(interval);
    }
  },[progress3, progressEndValueState3])
  useEffect(()=>{
    if(progressEndValueState4 > 0 && progress4 < progressEndValueState4) {
      const interval = setInterval(() => {
          setProgress4(progress4 + 1);
      }, 15);
    //Clearing the interval
    return () => clearInterval(interval);
    }
  },[progress4, progressEndValueState4])
  useEffect(()=>{
    if(progressEndValueState5 > 0 && progress5 < progressEndValueState5) {
      const interval = setInterval(() => {
          setProgress5(progress5 + 1);
      }, 15);
    //Clearing the interval
    return () => clearInterval(interval);
    }
  },[progress5, progressEndValueState5])
  useEffect(()=>{
    if(progressEndValueState6 > 0 && progress6 < progressEndValueState6) {
      const interval = setInterval(() => {
          setProgress6(progress6 + 1);
      }, 15);
    //Clearing the interval
    return () => clearInterval(interval);
    }
  },[progress6, progressEndValueState6])
  return (
    <>
         <div>
        <Header />
      </div>
    { loading ? <div align="center" style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}><img src={logicGatesLoading} width="300" /></div> :
    <div dir="rtl" className="container-all">

      <div className="results">
        <div className="container">
            <div className="circular-progress" style={{
                    background: `conic-gradient(#7d2ae8 ${progress * 3.6}deg, #ededed 0deg)`
            }}>
                <span className="progress-value">{Math.round(progress)}%</span>
            </div>
            <span className="text">HTML & CSS</span>
        </div>
        <div align="center">
          <h3 className="previous-results-text">النتائج السابقة:</h3>
        </div>
        <div style={{
          display:'flex',
          flexWrap:'wrap',
          justifyContent:'center'
        }}>
          <div className="container-small">
              <div className="circular-progress-small" style={{
                      background: `conic-gradient(#7d2ae8 ${progress2 * 3.6}deg, #ededed 0deg)`
              }}>
                  <span className="progress-value">{Math.round(progress2)}%</span>
              </div>
              {/*<span className="text">HTML & CSS</span>*/}
          </div>
          <div className="container-small">
              <div className="circular-progress-small" style={{
                      background: `conic-gradient(#7d2ae8 ${progress3 * 3.6}deg, #ededed 0deg)`
              }}>
                  <span className="progress-value">{Math.round(progress3)}%</span>
              </div>
              {/*<span className="text">HTML & CSS</span>*/}
          </div>
          <div className="container-small">
              <div className="circular-progress-small" style={{
                      background: `conic-gradient(#7d2ae8 ${progress4 * 3.6}deg, #ededed 0deg)`
              }}>
                  <span className="progress-value">{Math.round(progress4)}%</span>
              </div>
              {/*<span className="text">HTML & CSS</span>*/}
          </div>
          <div className="container-small">
              <div className="circular-progress-small" style={{
                      background: `conic-gradient(#7d2ae8 ${progress5 * 3.6}deg, #ededed 0deg)`
              }}>
                  <span className="progress-value">{Math.round(progress5)}%</span>
              </div>
              {/*<span className="text">HTML & CSS</span>*/}
          </div>
          <div className="container-small">
              <div className="circular-progress-small" style={{
                      background: `conic-gradient(#7d2ae8 ${progress6 * 3.6}deg, #ededed 0deg)`
              }}>
                  <span className="progress-value">{Math.round(progress6)}%</span>
              </div>
              {/*<span className="text">HTML & CSS</span>*/}
          </div>
        </div>
      </div>
    </div>
      }
    </>
  );
}
