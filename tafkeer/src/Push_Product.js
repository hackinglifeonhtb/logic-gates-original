import {React, useState, useEffect} from 'react'
import axios from 'axios'
import {useParams, Link, useSearchParams} from 'react-router-dom'
import Header from './Header'
import Verify from './Verify'
import man1 from './Images/man1.jpg'
import man2 from './Images/man2.jpg'
import man3 from './Images/man3.jpg'
import man4 from './Images/man4.jpg'
import profile from './Images/profile.png'
import photo from './Images/photo.jpg'
import "./Tickets.css"
import "./Ticket.css"
import "./Push_Ticket.css"
import "./Push_Product.css"
import "./App.css"
import YoutubeEmbed from './YoutubeEmbed'
import CheckMark from './Images/checkmark.png'
import impatient from './Images/impatient.png'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css" ;
import SendingPaperImg from './Images/telegram.png'
import GreenSendingPaperImg from './Images/telegram2.png'
import commentImg from './Images/comments.png'
import PaperPlane from './Images/paper-plane.png'
import Seal from './Images/seal.png'
import Loading from './Loading'
export default function Push_Product() {
    const {search, subjects, inProgress, completed} = useParams();
    const [name, setName] = useState('');
    const [verifiedData, setVerifiedData] = useState([]);
    const [coursesEnrolledIn, setCoursesEnrolledIn] = useState([{}]);
    const [course, setCourse] = useState([{}]);
    const [searchSentence, setSearchSentence] = useState('')
    const [unsubscribed, setUnsubscribed] = useState(true)
    const [subscribed, setSubscribed] = useState(false)
    const [finished, setFinished] = useState(false)
    const [teachers, setTeachers] = useState([])
    const [userID, setUserID] = useState('')
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [opened, setOpened] = useState(false)
    const [pending, setPending] = useState(false)
    const [closed, setClosed] = useState(false)
    const [ticket, setTicket] = useState([])
    const [commentsLength, setCommentsLength] = useState(0)
    const [title, setTitle] = useState('')
    const [question, setQuestion] = useState('')
    const [num, setNum] = useState(parseInt(Math.random()*100))
    const [ready, setReady] = useState(false)
    const [product_name, setProductName] = useState('')
    const [product_describe, setProductDescribe] = useState('')
    const [product_pic, setProductPic] = useState('')
    const [price, setPrice] = useState('')
    const [tags, setTags] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [collections, setCollections] = useState([{'اكتشف':['مجموعات رمضان','قيمة رائعة',"عيش جوك","وصل حديثا","اوتليت"],"اثاث وغرف":[ "اثاث غرفة المعيشة", "اثاث غرفة النوم", "اثاث غرف الظعام", "اثاث المساحات الخارجية", "اثاث غرف الدراسة والمكتب وغرف الأطفال والمواليد والشباب", "حمامات"], "اكسسوارات وديكور":["الطعام والمطبخ", "ديكور البيت والمعيشة", "شموع وفوانيس وتعطيرات البيت", "فنون جدارية ومرايا", "سجاد", "مفارش ومستلزمات الحمام", "حلول التخزين", "حديقة ونباتات", "اكسسوارات الأطفال والمواليد", "اساسيات ذات قيمة رائعة"], "تشطيب وبناء": ['اضاءات', 'البلاط', 'ورق جدار', 'الستائر', 'باركيه', 'المطابخ', 'نوافذ', 'ابواب'], "اكتشف المزيد": ['حصريات الموقع', 'المجموعات', 'بناءون', 'الكتالوجات'], 'التصاميم والاستشارات': ['تصميم داخلي 35م', 'تصميم خارجي 35م', 'استشارات بالمكتب 1000', 'استشارات بالموقع 2000'], "القياس": ["بالمتر"]}])
    const [sizes, setSizes] = useState([])
    const {ticket_id} = useParams();
    useEffect(()=>{
        axios.post(`http://localhost:8082/api/verify`, {token: localStorage.getItem('token') || ''}, {headers:{'x-access-token':localStorage.getItem('token'), 'email':localStorage.getItem('email')}})
            .then((res)=>{
                if(res.data.firstName !== undefined && res.data.secondName !== undefined)
                    setVerifiedData([res.data.firstName, res.data.secondName, res.data.email])
                    setName(res.data.firstName+' '+res.data.secondName)
                    setUserID(res.data.user_id)
                    setReady(true)
                    if(!res.data.manager) window.location.replace("http://localhost:3000")
                    setSearchParams({collection:"بالمتر"})
                    // axios.post(`http://localhost:8082/social/ticket_details/${ticket_id}`)
                    //     .then((ticket_data)=>{
                    //         console.log(ticket_data.data.ticket)
                    //         setTicket(ticket_data.data.ticket)
                    //         setComments(ticket_data.data.comments)
                    //         setCommentsLength(ticket_data.data.ticket.comments_length)
                    //     })
            }).catch((err)=>{
                console.log(err)
            })
        /*
            axios.post('http://localhost:8082/getCoursesEnrolledIn', {email: verifiedData.email})
        */
    },[])
    const newProduct = () => {
        axios.post(`http://localhost:8082/new_product`, {'email':localStorage.getItem('email'), product_name, product_describe, price, tags: searchParams.get('collection') !== null && searchParams.get('collection') != "" ? searchParams.get('collection').split(',') : [], sizes, product_pic})
            .then((res)=>{
                window.location.replace(`http://localhost:3000/products/${res.data.product_id}`)
            }).catch((err)=>{
                console.log(err)
            })
    }
    const deleteThem = (item) => {
        let splitted = searchParams.get('collection').split(',')
        console.log(splitted.slice(splitted.indexOf(item)+1).join(','))
        return (splitted.indexOf(item) > 0 ? splitted.slice(0,splitted.indexOf(item)).join(',') : '')+(splitted.length-1 !== splitted.indexOf(item) ? (splitted.indexOf(item)>0 ? ',' : '')+splitted.slice(splitted.indexOf(item)+1).join(',') : '')
    }
    // const new_comment = () => {
    //     axios.post(`http://localhost:8082/social/new_comment/${course_id}/${lesson_name}/${userID}`, {email: localStorage.getItem('email'), name: name, comment: comment})
    //         .then((res)=>{
    //             toast.success(res.data.message, {
    //                 position: "top-right",
    //                 autoClose: 1000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //             })
    //             setComments((comments) => [...comments, res.data.comment_details])
    //         }).catch((err)=>{
    //             console.log(err)
    //             toast.error(err.data ? err.data.message : "An Error Occurd!", {
    //                 position: "top-right",
    //                 autoClose: 1000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //             })
    //         })
    // }
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
            { ready ? 
                <>
                <Header/>
                <div>
                    <div align="center" className="tickets-main">
                        <div className="tickets-container" style={{
                            display:'flex',
                            justifyContent:'center'
                        }}>
                            {/*<Link to={`/tickets/${ticket._id.toString()}`} style={{textDecoration:'none'}}>*/}
                            <div className="new-comment-button" style={{
                                textAlign: 'center',
                                cursor: 'pointer',
                                position: 'absolute',
                                zIndex: '1',
                                top: '110px'
                            }} onClick={()=>newProduct()}>
                                        نشر
                            </div>
                                <div className="ticket">
                                    <div className="ticket-status">
                                        <div className="ticket-status-circle"></div>
                                        <div><p>قائمة</p></div>
                                    </div>
                                    <h2><input type="text" placeholder="اكتب عنوان المنتج هنا" className="new-ticket-input" style={{ backgroundColor: 'transparent', border: 'none' }} onChange={(e)=>setProductName(e.target.value)}/></h2>
                                    <p><textarea type="text" placeholder="اكتب وصف المنتج هنا" className="new-ticket-input" style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', resize: 'none' }} cols="100" rows="10" onChange={(e)=>setProductDescribe(e.target.value)} /></p>
                                    <p><input type="text" placeholder="رابط لصورة المنتج" className="new-ticket-input" style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', resize: 'none' }} cols="100" rows="10" onChange={(e)=>setProductPic(e.target.value)} /></p>
                                    <p><input type="text" placeholder="اكتب المقاسات ان وجدت مع الفصل بين كل مقاس بفاصلة هكذا (4070x2080, 3000x6000)" className="new-ticket-input" style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', resize: 'none' }} cols="100" rows="10" onChange={(e)=>setSizes(e.target.value.split(','))} /></p>
                                    <p><input type="text" placeholder="اكتب سعر المنتج" className="new-ticket-input" style={{ backgroundColor: 'transparent', border: 'none', outline: 'none', resize: 'none' }} cols="100" rows="10" onChange={(e)=>setPrice(e.target.value)} /></p>
                                    <div style={{alignItems:'flex-start'}} className="check-box-filter">
                                    {   Object.keys(collections[0]).map((collection)=>{
                                        return (
                                                <div className="ticket" style={{
                                                    padding:'0',
                                                    height:'auto'
                                                }}>
                                                <div style={{backgroundColor:'#1a1b1c', width:'100%', padding:'10px', borderRadius:`10px 10px 0px 0px`, marginBottom:'0px', borderBottom:`0px solid white`}}
                                                >
                                                    <div className="ticket-status">
                                                        <div className="ticket-status-circle"></div>
                                                        <div><p>قائمة</p></div>
                                                    </div>
                                                    <h2>{collection}</h2>
                                                </div>
                                                <div className="ticket-statistics" dir="rtl" style={{
                                                    display:'flex',
                                                    flexWrap:'wrap',
                                                    paddingRight:'10px',
                                                    paddingLeft: '10px',
                                                }}>
                                                    { collections[0][collection].map((item)=>{
                                                            return (
                                                                <div className="ticket" style={{
                                                                    width:'200px',
                                                                    border:`1px solid ${searchParams.get('collection') !== null ? (searchParams.get('collection').split(',').includes(item) ? '#9fef00' : 'white') : 'white'}`,
                                                                    opacity: `${searchParams.get('collection') !== null ? (searchParams.get('collection').split(',').includes(item) ? '1' : '0.75') : '0.75'}`,
                                                                    fontWeight:`${searchParams.get('collection') !== null ? (searchParams.get('collection').split(',').includes(item) ? 'bold' : 'normal') : 'normal'}`,
                                                                    backgroundColor: `${searchParams.get('collection') !== null ? (searchParams.get('collection').split(',').includes(item) ? '#9fef00' : 'transparent') : 'transparent'}`,
                                                                    color: `${searchParams.get('collection') !== null ? (searchParams.get('collection').split(',').includes(item) ? 'black' : 'white') : 'white'}`
                                                                }} onClick={()=>{
                                                                    setSearchParams({collection: searchParams.get('collection') !== null && searchParams.get('collection') !== "" ? (searchParams.get('collection').split(',').includes(item) ? deleteThem(item) : searchParams.get('collection') + ',' + item) : item});
                                                                }}>
                                                                    {item}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                 </div>
                                            {/* <div className="ticket-solved" align="center">
                                                    <img src={Seal} width="150px" height="150px" />
                                                </div>
                                                */}
                                            </div>
                                        )
                                    })
                                }
                                </div>
                                    <div className="ticket-statistics" dir="rtl">
                                        <img src={PaperPlane} width="25" height="25" />
                                        <p>{num}</p>
                                    </div>
                                    {/* <div className="ticket-solved" align="center">
                                        <img src={Seal} width="150px" height="150px" />
                                    </div>
                                    */}
                                    
                                </div>
                            {/*</Link>*/}
                        </div>
                    </div>
                </div>
            </>
              : <Loading />
            }
        </>
    )
}