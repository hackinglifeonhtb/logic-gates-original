import axios from 'axios'
import {React, useState, useEffect} from 'react';
import tafkeer from './Images/tafkeer.png'
import {Link} from 'react-router-dom'
import LogOut from './Images/logout.png'
import Verify from './Verify'
import DecorMakers from './Images/DecorMakers.png'
import LogicGates from './Images/logic-gates-removebg-preview.png'
import "./Header.css"
import Burger from './Burger'
import LogicGatesBanner from './Images/Logic Gates 2.mp4'
import Bell from './Images/bell.gif'
import Pusher from 'pusher-js';
import addNotification from 'react-push-notification';
import { Notifications } from 'react-push-notification';
import * as PusherPushNotifications from "@pusher/push-notifications-web";

export default function Header( props ) {
    const [name, setName] = useState('')
    const [verified, setVerified] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [clicked2, setClicked2] = useState(false);
    const [notifications, setNotifications] = useState([])
    const [user_id, setUserId] = useState('')
    const [cart, setCart] = useState('')
    const [onlineUsers, setOnlineUsers] = useState([])
    const [online, setIsOnline] = useState('')
    useEffect(()=>{
        axios.post(`${process.env.REACT_APP_SSL_AVAILABILITY}://${process.env.REACT_APP_DB_SERVER_URI}/api/verify`, {token: localStorage.getItem('token') || ''}, {headers:{'x-access-token':localStorage.getItem('token'), 'email':localStorage.getItem('email')}})
            .then((res)=>{
                if(res.data.firstName !== undefined && res.data.secondName !== undefined)
                    setVerified(true);
                    setName(res.data.firstName+' '+res.data.secondName)
                    axios.post(`${process.env.REACT_APP_SSL_AVAILABILITY}://${process.env.REACT_APP_DB_SERVER_URI}/get_user_id`, {email: res.data.email})
                        .then((response)=>{
                            console.log(response.data)
                            setUserId(response.data.user_id)
                            axios.post(`${process.env.REACT_APP_SSL_AVAILABILITY}://${process.env.REACT_APP_DB_SERVER_URI}/user-notifications`, {email:res.data.email})
                                    .then((response2)=>{
                                        console.log(response2.data)
                                        setNotifications((notifications)=>[...notifications, ...response2.data.user_notifications])
                                    }).catch((err)=>{
                                        console.log(err)
                                    })
                        }).catch((err)=>{
                            console.log(err)
                        })
            }).catch((err)=>{
                console.log(window.location.href)
                window.location.replace(`${process.env.REACT_APP_SSL_AVAILABILITY}://${process.env.REACT_APP_WEBSITE_URI}/login?refer_to=${window.location.href}`)
                console.log(window.location.href)
            })
    }, [])
    /*useEffect(()=>{
      const pusher = new Pusher('19c2eb03ffadb575a377', {
        cluster: 'ap2'
    });
      axios.post('${process.env.REACT_APP_SSL_AVAILABILITY}://${process.env.REACT_APP_WEBSITE_URI}/pusher/auth', {

  socket_id: pusher.connection.socket_id,

  channel_name: 'precense-channel',

  user_id: '',

  user_info: {

    name: 'USER_NAME'

  }

}, {

  headers: {

    'X-CSRF-Token': 'YOUR_CSRF_TOKEN'

  }

})

.then(response => {

  console.log(response.data);

})

.catch(error => {

  console.log(error.response.data);

});
    }, [])*/
    const buttonOnClick = (message, user_sent, title) => {

        /*pushNotifications.publishToInterests(['hello'], {

        fcm: {

          notification: {

            title: 'Hello World',

            body: 'Hello!',

          },

        },

      })

      .then(publishResponse => {

        console.log('Just published:', publishResponse.publishId);

      })*/
        addNotification({
          title: title,
          subtitle: user_sent,
          message: `${user_sent}\n${message}`,
          //theme: "light",
          //closeButton: "X",
          //backgroundTop: "green",
          //backgroundBottom: "yellowgreen",
          icon: '',
          native: true
        });
      };
    useEffect(()=>{
        /*const beamsClient = new PusherPushNotifications.Client({
            instanceId: 'f810a242-04f2-432a-82a3-53651ad0fec7',
          });
        
          beamsClient.start()
            .then(() => beamsClient.addDeviceInterest('hello'))
            .then(() => console.log('Successfully registered and subscribed!'))
            .catch(console.error);
        */
        const pusher = new Pusher('19c2eb03ffadb575a377', {
            cluster: 'ap2'
        });
        console.log('got', user_id)
        const channel = pusher.subscribe(`logic-gates-notifications-${user_id}`);
        channel.bind(`logic-gates-notifications`,(data)=>{
            //if(data.username != username) {
                setNotifications((notifications)=>[...notifications, {notification_title: data.notification_title, notification_user: data.notification_user, notification_message: data.notification_message, consultation_id: data.consultation_id}])
                console.log('got', data)
                buttonOnClick(data.notification_message, data.notification_user, data.notification_title);
            //}
        })
        const presenceChannel = pusher.subscribe('presence-channel');

    // Detect online/offline users
    presenceChannel.bind('pusher:subscription_succeeded', (members) => {
      console.log(members)
      const onlineUsers = Object.keys(members.members);
      setOnlineUsers(onlineUsers);
    });
    presenceChannel.bind('pusher:member_added', (member) => {
      console.log(member)
      setOnlineUsers((prevUsers) => [...prevUsers, member.id]);
    });
    presenceChannel.bind('pusher:member_removed', (member) => {
      console.log(member)
      setOnlineUsers((prevUsers) => prevUsers.filter((user) => user !== member.id));
    });

        return () => {
            channel.bind(`logic-gates-notifications`,(data)=>{
                //if(data.username != username) {
                    setNotifications((notifications)=>[...notifications, {notification_title: data.notification_title, notification_user: data.notification_user, notification_message: data.notification_message, consultation_id: data.consultation_id}])
                    console.log('got', data)
                    buttonOnClick(data.notification_message, data.notification_user, data.notification_title);
                //}
            })
            presenceChannel.unbind_all();
            pusher.unsubscribe(`logic-gates-${user_id}`); 
        }
      }, [user_id])






      /*useEffect(()=>{

        const pusher = new Pusher('19c2eb03ffadb575a377', {
          cluster: 'ap2'
      });
        // Join presence channel
    const presenceChannel = pusher.subscribe('presence-channel');

    // Detect online/offline users
    presenceChannel.bind('pusher:subscription_succeeded', (members) => {
      console.log(members)
      const onlineUsers = Object.keys(members.members);
      setOnlineUsers(onlineUsers);
    });
    presenceChannel.bind('pusher:member_added', (member) => {
      console.log(member)
      setOnlineUsers((prevUsers) => [...prevUsers, member.id]);
    });
    presenceChannel.bind('pusher:member_removed', (member) => {
      console.log(member)
      setOnlineUsers((prevUsers) => prevUsers.filter((user) => user !== member.id));
    });

    // Real-time updates example
    // Clean up event listeners and Pusher channels
    return () => {
      presenceChannel.unbind_all();
      presenceChannel.unsubscribe();
    };
  }, []);*/




    return (
        <>
            <div className="header-container" style={props.style}>
            <header className="App-header" style={{
                display:'flex',
                alignItems:'center',
                direction:'rtl'
            }}>
                <div className="container" style={{direction:'rtl'}}>
                    <div style={{display:'flex'}}>
                        {/*onlineUsers.join(',')*/}
                        <video src={LogicGatesBanner} autoplay="true" loop="true" width="200"></video>
                        {/*<h1>Logic Gates</h1>*/}
                    </div>
                    <ul>
                        <Link to='/'><li>الرئيسية</li></Link>
                        <li>عنا</li>
                        <Link to='/exams'><li>اختبارات</li></Link>
                        <Link to='/tickets'><li>اسأل</li></Link>
                        <Link to={`/payment/basic/908793098745394098494`} disable={cart.length==0}><li>اشتراك</li></Link>
                        {!verified ?                             <Link to='/login'> <li><button style={{fontSize:'20px'}}>{verified ? name : 'تسجيل الدخول'}</button></li> </Link>
 : <></>}
                    </ul>
                    {verified ? 
                            <>
<div class="dropdown show" style={{zIndex:'100000'}}>
  <a class={`btn dropdown-toggle notification${notifications.length < 1 ? "-zero" : ""}`} href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={()=>setClicked2((clicked2)=>!clicked2)} style={{border:'0px',backgroundColor:'white'}} notifications-number={`${notifications.length}`}>
    <img src={Bell} width="30" height="20" style={{height:'30px'}} />
  </a>
  <div class="dropdown-menu" dir="rtl" style={{display:`${clicked2 ? 'block' : 'none'}`, direction:'rtl',marginRight:'-90px'}} aria-labelledby="dropdownMenuLink">
    {notifications.length > 0 ? notifications.map((notification,index)=>{
        return (
            <Link className="dropdown-item" to={`${process.env.REACT_APP_SSL_AVAILABILITY}://${process.env.REACT_APP_WEBSITE_URI}/consultation/${notification.consultation_id}`} style={{borderBottom:`${index < notifications.length-1 ? "1px solid grey" : "0px"}`}}>
                <div>
                    <h6 style={{fontSize:'11px'}}>{notification.notification_title}</h6>
                    <h6 style={{fontSize:'10px'}}>{notification.notification_user}</h6>
                    <h6 style={{fontSize:'9px',whiteSpace: 'nowrap',textOverflow: 'ellipsis',
                                        maxWidth: '150px',overflow:'hidden'}}>{notification.notification_message}</h6>
                </div>
            </Link>
        )
    }) : <h6 style={{fontSize:'11px',direction:'rtl'}}>لا توجد اشعارات حتى الآن</h6>}
  </div>
</div>
<div class="dropdown show need-to-be-hidden">
  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={()=>setClicked((clicked)=>!clicked)}>
    {name}
  </a>
  <div class="dropdown-menu" style={{display:`${clicked ? 'block' : 'none'}`}} aria-labelledby="dropdownMenuLink">
    <Link class="dropdown-item" href="#">الحساب</Link>
    <Link class="dropdown-item" href="#">نسبة الانجاز</Link>
    <Link class="dropdown-item" href="#" onClick={()=>{localStorage.setItem('token','');window.location.reload()}}>تسجيل الخروج</Link>
  </div>
</div>
                            </>
                            :
                            <></>
                        }
                </div>
                {/*{verified ? <img src={LogOut} height="75px" width="100px" id="logout_pic" style={{
                    marginLeft:'25px',
                    cursor:'pointer'
                }} onClick={()=>{localStorage.setItem('token','');window.location.reload()}} /> : undefined}*/}

            </header>
            <div id="nav" style={{position:'relative', zIndex:'5000',directino:'ltr'}}>
<input type="checkbox" id="menu-toggle"/>
  <label id="trigger" for="menu-toggle"></label>
  <label id="burger" for="menu-toggle"></label>
  <ul id="menu" style={{
    overflowY:'auto'
  }}>
                        <li><Link to={`/`} disable={cart.length==0}>الصفحة الرئيسية</Link></li>
                        <li><Link to={`/products`} disable={cart.length==0}>المنتجات</Link></li>
                        <li><Link to={`/tickets`} disable={cart.length==0}>التذاكر/الأسئلة</Link></li>
                        <li><Link to={`/cart/${cart}`} disable={cart.length==0}>السلة</Link></li>
                        <li><Link to={`/cart/${cart}`} disable={cart.length==0}>عنا</Link></li>
                        {verified ? 
                            <li>
                            <div class="dropdown show">
<a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={()=>setClicked((clicked)=>!clicked)}>
{name}
</a>
<div class="dropdown-menu" style={{display:`${clicked ? 'block' : 'none'}`}} aria-labelledby="dropdownMenuLink">
<Link class="dropdown-item" href="#">الحساب</Link>
<Link class="dropdown-item" href="#">نسبة الانجاز</Link>
<Link class="dropdown-item" href="#" onClick={()=>{localStorage.setItem('token','');window.location.reload()}}>تسجيل الخروج</Link>
</div>
</div>
                        </li>
                            :
                            <Link to='/login'> <li><button>{verified ? name : 'تسجيل الدخول'}</button></li> </Link>
                        }
  </ul>
  </div>
  </div>
        </>
    )
}