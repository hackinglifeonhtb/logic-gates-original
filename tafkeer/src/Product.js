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
import "./Product.css"
import CheckMark from './Images/checkmark.png'
import impatient from './Images/impatient.png'
import Loading from './Loading'
import shoppingCart from './Images/shopping-cart.png'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css" ;
export default function Product() {
    const {product_id} = useParams();
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
    const [product, setProduct] = useState([])
    const [filtered_products, setFiltered_products] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [inValue, setInValue] = useState('')
    const [email, setEmail] = useState('')
    const [display, setDisplay] = useState([{'اكتشف':false, 'اثاث وغرف' : false, 'اكسسوارات وديكور': false, 'تشطيب وبناء': false, 'اكتشف المزيد': false, 'التصاميم والاستشارات': false}])
    const [collections, setCollections] = useState([{'اكتشف':['مجموعات رمضان','قيمة رائعة',"عيش جوك","وصل حديثا","اوتليت"],"اثاث وغرف":[ "اثاث غرفة المعيشة", "اثاث غرفة النوم", "اثاث غرف الظعام", "اثاث المساحات الخارجية", "اثاث غرف الدراسة والمكتب وغرف الأطفال والمواليد والشباب", "حمامات"], "اكسسوارات وديكور":["الطعام والمطبخ", "ديكور البيت والمعيشة", "شموع وفوانيس وتعطيرات البيت", "فنون جدارية ومرايا", "سجاد", "مفارش ومستلزمات الحمام", "حلول التخزين", "حديقة ونباتات", "اكسسوارات الأطفال والمواليد", "اساسيات ذات قيمة رائعة"], "تشطيب وبناء": ['اضاءات', 'البلاط', 'ورق جدار', 'الستائر', 'باركيه', 'المطابخ', 'نوافذ', 'ابواب'], "اكتشف المزيد": ['حصريات الموقع', 'المجموعات', 'بناءون', 'الكتالوجات'], 'التصاميم والاستشارات': ['تصميم داخلي 35م', 'تصميم خارجي 35م', 'استشارات بالمكتب 1000', 'استشارات بالموقع 2000']}])
    const {course_id} = useParams();
    useEffect(()=>{
        axios.post(`http://localhost:8082/api/verify`, {token: localStorage.getItem('token') || ''}, {headers:{'x-access-token':localStorage.getItem('token'), 'email':localStorage.getItem('email')}})
            .then((res)=>{
                if(res.data.firstName !== undefined && res.data.secondName !== undefined)
                    setVerifiedData([res.data.firstName, res.data.secondName, res.data.email])
                    setName(res.data.firstName+' '+res.data.secondName)
                    setEmail(res.data.email)
                    setReady(true)
                    axios.post(`http://localhost:8082/products/${product_id}`)
                        .then(async (data)=>{
                            console.log(data)
                            setProduct([data.data.product])
                            if(!data.data.product.sizes.includes(searchParams.get('size')) && searchParams.get('size') !== null && searchParams.get('size') != "") setInValue(searchParams.get('size')); else if(searchParams.get('size') === null || searchParams.get('size') == "") setSearchParams({size: data.data.product.sizes[0]})
                            //console.log(products)
                            //console.log(data.data.products.filter((prod)=>containsTags(prod.tags)))
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
    const add_to_cart = () => {
        axios.post("http://localhost:8082/get_cart_info", {email: email})
            .then((res)=>{
                axios.post(`http://localhost:8082/add_to_cart/${res.data.cart.user_id}/${product[0]._id}`, {choosedSize: product[0].tags.includes("بالمتر") ? searchParams.get('size') : "حجم ثابت"})
                     .then((response)=>{
                        console.log("Added to Cart!")
                        toast.success('تمت اضافة المنتج للسلة بنجاح!', {
                            position: "top-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        })
                     }).catch((err)=>{
                        toast.error('حدث خطأ', {
                            position: "top-right",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        console.log(err)
                     })
            }).catch((err)=>{
                console.log(err)
            })
    }
    return (
        <>
            { ready ? 
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
                    <Header/>
                    <div>
                        <div style={{
                            padding:'20px',
                        }} id="parent_of_product">
                            <div style={{
                                borderRadius:'10px 0px 0px 10px',
                            }} id="product_pic">
                                <img src={product.length > 0 ? product[0].product_pic : "https://m.media-amazon.com/images/I/618D75XP6BL._AC_SY879_.jpg"} id="prod_pic" />
                            </div>
                            <div style={{
                                borderRadius:'10px 0px 0px 10px',
                                overflowY: 'auto',
                                direction: 'rtl'
                            }} id="product_details">
                                <div style={{overflowY:'auto',height:'80vh'}}>
                                {product.length > 0 ? 
                                    <>
                                        <h1 style={{width:'90%',fontWeight:'bold',letterSpacing:'4px', lineHeight:'50px'}}>{product[0].product_name}</h1>
                                        <br/>
                                        <h3>{product[0].product_describe}</h3>
                                        <br/>
                                        <h5>السمات:</h5>
                                        <div style={{
                                            display:'flex', 
                                            flexWrap: 'wrap'
                                        }}>
                                            { product[0].tags.map((item)=>{
                                                                return (
                                                                    <div className="ticket" style={{
                                                                        width:'200px',
                                                                        border:'1px solid white',
                                                                        opacity: `1`,
                                                                        textAlign:'center'
                                                                    }}>
                                                                        {item}
                                                                    </div>
                                                                )
                                                            })
                                            }
                                        </div>
                                        <br/>
                                        { product[0].tags.includes("بالمتر") ?
                                        <>
                                            <h5>الحجم:</h5>
                                            <div style={{
                                                display:'flex', 
                                                flexWrap: 'wrap',
                                            }}>
                                                { product[0].sizes.map((item)=>{
                                                                    return (
                                                                        <div className="ticket" style={{
                                                                            width:'200px',
                                                                            border:`1px solid ${searchParams.get('size') === item ? '#9fef00' : 'white'}`,
                                                                            opacity: `${searchParams.get('size') === item ? '1' : '0.75'}`,
                                                                            fontWeight:`${searchParams.get('size') === item ? 'bold' : 'normal'}`
                                                                        }} onClick={()=>{
                                                                            setSearchParams({size: item});
                                                                        }}>
                                                                            {item}
                                                                        </div>
                                                                    )
                                                                })
                                                }
                                            </div>
                                        </>
                                        :''
                                        }
                                       {  product[0].tags.includes("بالمتر") ? <><input type="text" placeholder="يمكنك تعبئته لاختيار مقاسك الخاص مثل 1800x100" className="ticket" style={{
                                                                    width:'200px',
                                                                    border:`1px solid ${searchParams.get('size') === inValue ? '#9fef00' : 'white'}`,
                                                                    opacity: `${searchParams.get('size') === inValue ? '1' : '0.75'}`,
                                                                    fontWeight:`${searchParams.get('size') === inValue ? 'bold' : 'normal'}`,
                                                                    color:'#9fef00'
                                                                }} onChange={(e)=>{
                                                                    setInValue(e.target.value);
                                                                    setSearchParams({size: e.target.value})
                                                                }} onClick={()=>{
                                                                    setSearchParams({size: inValue});
                                                                }} value={inValue} />  
                                                                
                                                                </>
                                        :''
                                     }         
                                    </>
                                  :""
                                }
                                </div>
                                <div align="center">
                                    {product.length > 0?
                                        <div align="center">
                                            <h1>${product[0].price} {product[0].tags.includes("بالمتر") ? "لكل سنتمتر مربع" : ""}</h1>
                                        </div>
                                      :''
                                    }
                                            <div style={{
                                                display:'flex',
                                                justifyContent:'center',
                                                width:'80%'
                                            }}>
                                                <div style={{width:'100%'}}>
                                                    <Link to='/ticket/new_ticket' style={{width:'100%', display:'flex', justifyContent:'center'}}>
                                                        <div className="new-comment-button" style={{
                                                            textAlign: 'center',
                                                            cursor: 'pointer',
                                                            zIndex: '1',
                                                            width:'200px'
                                                        }}>
                                                                    استفسار قبل الشراء
                                                        </div>
                                                    </Link>
                                                    <br/>
                                                    <div style={{
                                                        display:'flex',
                                                        justifyContent:'space-around',
                                                        alignItems:'center',
                                                        backgroundColor:'#1b1d1e',
                                                        padding:'10px',
                                                        border:'1px solid white',
                                                        borderRadius:'100px',
                                                        width:'100%',
                                                        cursor:'pointer'
                                                    }} id="shoppingCartButton" onClick={()=>add_to_cart()}>
                                                        <h3>اضافة للسلة</h3>
                                                        <img src={shoppingCart} width="80" />
                                                    </div>
                                                </div>
                                            </div>
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