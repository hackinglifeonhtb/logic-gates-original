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
import "./Course.css"
import "./App.css"
import "./Products.css"
import CheckMark from './Images/checkmark.png'
import impatient from './Images/impatient.png'
import Loading from './Loading'
export default function Products() {
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
    const [tags, setTags] = useState([])
    const [ready, setReady] = useState(false)
    const [one, setOne] = useState(false)
    const [two, setTwo] = useState(false)
    const [three, setThree] = useState(false)
    const [four, setFour] = useState(false)
    const [five, setFive] = useState(false)
    const [six, setSix] = useState(false)
    const [seven, setSeven] = useState(false)
    const [products, setProducts] = useState([])
    const [filtered_products, setFiltered_products] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [addingPermission, setAddingPermission] = useState(false)
    const [display, setDisplay] = useState([{'اكتشف':false, 'اثاث وغرف' : false, 'اكسسوارات وديكور': false, 'تشطيب وبناء': false, 'اكتشف المزيد': false, 'التصاميم والاستشارات': false}])
    const [collections, setCollections] = useState([{'اكتشف':['مجموعات رمضان','قيمة رائعة',"عيش جوك","وصل حديثا","اوتليت"],"اثاث وغرف":[ "اثاث غرفة المعيشة", "اثاث غرفة النوم", "اثاث غرف الظعام", "اثاث المساحات الخارجية", "اثاث غرف الدراسة والمكتب وغرف الأطفال والمواليد والشباب", "حمامات"], "اكسسوارات وديكور":["الطعام والمطبخ", "ديكور البيت والمعيشة", "شموع وفوانيس وتعطيرات البيت", "فنون جدارية ومرايا", "سجاد", "مفارش ومستلزمات الحمام", "حلول التخزين", "حديقة ونباتات", "اكسسوارات الأطفال والمواليد", "اساسيات ذات قيمة رائعة"], "تشطيب وبناء": ['اضاءات', 'البلاط', 'ورق جدار', 'الستائر', 'باركيه', 'المطابخ', 'نوافذ', 'ابواب'], "اكتشف المزيد": ['حصريات الموقع', 'المجموعات', 'بناءون', 'الكتالوجات'], 'التصاميم والاستشارات': ['تصميم داخلي 35م', 'تصميم خارجي 35م', 'استشارات بالمكتب 1000', 'استشارات بالموقع 2000'], "القياس": ["بالمتر"]}])
    const {course_id} = useParams();
    useEffect(()=>{
        axios.post(`http://localhost:8082/api/verify`, {token: localStorage.getItem('token') || ''}, {headers:{'x-access-token':localStorage.getItem('token'), 'email':localStorage.getItem('email')}})
            .then((res)=>{
                if(res.data.firstName !== undefined && res.data.secondName !== undefined)
                    setVerifiedData([res.data.firstName, res.data.secondName, res.data.email])
                    setName(res.data.firstName+' '+res.data.secondName)
                    setReady(true)
                    if(res.data.manager) setAddingPermission(true);
                    axios.post('http://localhost:8082/products')
                        .then(async (data)=>{
                            console.log(data.data.products)
                            await setProducts(data.data.products)
                            await setFiltered_products(
                                data.data.products.filter((product)=>{
                                    return searchParams.get('collection') == null || containsTags(product.tags, searchParams.get('collection').split(','))
                                })
                            )
                            //console.log(products)
                            //console.log(data.data.products.filter((prod)=>containsTags(prod.tags)))
                            console.log(searchParams.get('collection'))
                            if(searchParams.get('collection') !== null) setTags(searchParams.get('collection').split(','))
                        }).catch((err)=>{
                            console.log(err);
                        })
            }).catch((err)=>{
                //window.location.href =`"http://localhost:3000/login?refer_to=${window.location.href}`
                console.log(err)
            })
        /*
            axios.post('http://localhost:8082/getCoursesEnrolledIn', {email: verifiedData.email})
        */
    },[])
    useEffect(()=>{
        setFiltered_products(
            products.filter((product)=>{
                return searchParams.get('collection') == null || searchParams.get('collection') == "" || containsTags(product.tags, searchParams.get('collection').split(','))
            })
        )
    },[searchParams])
    const displayChange = async (collection) => {
        let display_clone = display;
        display_clone[0][collection] = !display_clone[0][collection];
        console.log('display', display_clone)
        await setDisplay(display_clone);
        console.log(display)
        console.log(display[0][collection])
    }
    const containsTags = (prod_tags, tags0) => {
        console.log(tags0, prod_tags)
        if(prod_tags.length < tags0.length) return false;
        let invalid = false;
        tags0.forEach((tag)=>{
            console.log(true, !prod_tags.includes(tag), !prod_tags.includes(tag))
            if(!prod_tags.includes(tag)) invalid = true;
        })
        console.log(1)
        return !invalid;
    }
    const deleteThem = (item) => {
        let splitted = searchParams.get('collection').split(',')
        console.log(splitted.slice(splitted.indexOf(item)+1).join(','))
        return (splitted.indexOf(item) > 0 ? splitted.slice(0,splitted.indexOf(item)).join(',') : '')+(splitted.length-1 !== splitted.indexOf(item) ? (splitted.indexOf(item)>0 ? ',' : '')+splitted.slice(splitted.indexOf(item)+1).join(',') : '')
    }
    return (
        <>
            { ready ? 
                <>
                    <Header/>
                    <div align="center" className="tickets-main">
                        <div className="tickets-container">
                            <div className="check-box-filter"> 
                                {   Object.keys(collections[0]).map((collection)=>{
                                        return (
                                                <div className="ticket" style={{
                                                    padding:'0',
                                                    height:'auto'
                                                }}>
                                                <div style={{backgroundColor:'#1a1b1c', width:'100%', padding:'10px', borderRadius:`10px 10px ${display[0][collection] ? '0px 0px' : '10px 10px'}`, marginBottom:display[0][collection] ? '10px' : '0px', borderBottom:`${display[0][collection] ? 1 : 0}px solid white`}}
                                                    onClick={()=>collection == 'اكتشف' ? setOne((one)=>!one) : collection == 'اثاث وغرف' ? setTwo((two)=>!two) : collection == 'اكسسوارات وديكور' ? setThree((three)=>!three) : collection == 'تشطيب وبناء' ? setFour((four)=>!four) : collection == 'اكتشف المزيد' ? setFive((five)=>!five) : collection == 'القياس' ? setSeven((seven)=>!seven) : setSix((six)=>!six)}
                                                >
                                                    <div className="ticket-status">
                                                        <div className="ticket-status-circle"></div>
                                                        <div><p>قائمة</p></div>
                                                    </div>
                                                    <h2>{collection}</h2>
                                                </div>
                                                <div className="ticket-statistics" dir="rtl" style={{
                                                    display:(collection == 'اكتشف' ? one : collection == 'اثاث وغرف' ? two : collection == 'اكسسوارات وديكور' ? three : collection == 'تشطيب وبناء' ? four : collection == 'اكتشف المزيد' ? five : collection == 'القياس' ? seven : six) ? 'flex' : 'none',
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
                                                                    fontWeight:`${searchParams.get('collection') !== null ? (searchParams.get('collection').split(',').includes(item) ? 'bold' : 'normal') : 'normal'}`
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
                            <div className="search-field filter" dir="rtl">
                                <input type="text" placeholder="عن ماذا تبحث؟" className="tickets-search-input"  />
                                <button className="search-button">بحث</button>
                            </div>
                            <div className="tickets">
                                <div className='new-ticket'>
                                    <Link to="/push_product" style={{textDecoration: 'none', display: addingPermission ? "block" : "none"}}>
                                        <button className="new-ticket-button"> + منتج جديد</button>
                                    </Link>
                                </div>
                                <div style={{
                                    display:'flex',
                                    flexWrap:'wrap',
                                    justifyContent:'space-around',
                                }}>
                                    {filtered_products.length ? 
                                            filtered_products.map((prod)=>{
                                                return (
                                                    <Link to={`/products/${prod._id}`} style={{
                                                        textDecoration:'none'
                                                    }} id="product_link_component">
                                                        <div class="card" style={{width: '100%', marginBottom:'10px', marginTop:'10px', backgroundColor:'#222424 !important'}}>
                                                            <img class="card-img-top" src={prod.product_pic} alt="Card image cap"/>
                                                            <div class="card-body">
                                                                <h5 class="card-title" style={{
                                                                    color:'white'
                                                                }}>{prod.product_name}</h5>
                                                                <p class="card-text">{prod.product_describe}</p>
                                                            </div>
                                                            <div style={{
                                                                display:'flex',
                                                                flexWrap:'wrap',
                                                                width:'100%',
                                                                height:'75px',
                                                                justifyContent:'center',
                                                                overflowY:'auto',
                                                                zIndex:'1'
                                                            }}>
                                                                { prod.tags.map((item)=>{
                                                                        return (
                                                                            <div className="ticket" style={{
                                                                                width:'auto',
                                                                                color:'white'
                                                                            }}>
                                                                                {item}
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                            <h3>{'$'+prod.price}</h3>
                                                            {/*<div class="card-body">
                                                                <a href="#" class="card-link">Card link</a>
                                                                <a href="#" class="card-link">Another link</a>
                                                            </div>*/}
                                                        </div>
                                                    </Link>
                                                )
                                            })
                                        :0
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                : <Loading />
            }
        </>
    )
}