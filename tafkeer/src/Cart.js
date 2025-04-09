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
import "./Cart.css"
import CheckMark from './Images/checkmark.png'
import impatient from './Images/impatient.png'
import Loading from './Loading'
import shoppingCart from './Images/mobile-shopping.png'
import DecorMakers from './Images/DecorMakers.png'
import trash from './Images/dustbin.png'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css" ;
export default function Cart() {
    const {cart_id} = useParams();
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
    const [products, setProducts] = useState([])
    const [quantity, setQuantity] = useState([])
    const [filtered_products, setFiltered_products] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const [inValue, setInValue] = useState('')
    const [display, setDisplay] = useState([{'اكتشف':false, 'اثاث وغرف' : false, 'اكسسوارات وديكور': false, 'تشطيب وبناء': false, 'اكتشف المزيد': false, 'التصاميم والاستشارات': false}])
    const [collections, setCollections] = useState([{'اكتشف':['مجموعات رمضان','قيمة رائعة',"عيش جوك","وصل حديثا","اوتليت"],"اثاث وغرف":[ "اثاث غرفة المعيشة", "اثاث غرفة النوم", "اثاث غرف الظعام", "اثاث المساحات الخارجية", "اثاث غرف الدراسة والمكتب وغرف الأطفال والمواليد والشباب", "حمامات"], "اكسسوارات وديكور":["الطعام والمطبخ", "ديكور البيت والمعيشة", "شموع وفوانيس وتعطيرات البيت", "فنون جدارية ومرايا", "سجاد", "مفارش ومستلزمات الحمام", "حلول التخزين", "حديقة ونباتات", "اكسسوارات الأطفال والمواليد", "اساسيات ذات قيمة رائعة"], "تشطيب وبناء": ['اضاءات', 'البلاط', 'ورق جدار', 'الستائر', 'باركيه', 'المطابخ', 'نوافذ', 'ابواب'], "اكتشف المزيد": ['حصريات الموقع', 'المجموعات', 'بناءون', 'الكتالوجات'], 'التصاميم والاستشارات': ['تصميم داخلي 35م', 'تصميم خارجي 35م', 'استشارات بالمكتب 1000', 'استشارات بالموقع 2000']}])
    useEffect(()=>{
        axios.post(`http://localhost:8082/api/verify`, {token: localStorage.getItem('token') || ''}, {headers:{'x-access-token':localStorage.getItem('token'), 'email':localStorage.getItem('email')}})
            .then((res)=>{
                if(res.data.firstName !== undefined && res.data.secondName !== undefined)
                    setVerifiedData([res.data.firstName, res.data.secondName, res.data.email])
                    setName(res.data.firstName+' '+res.data.secondName)
                    setReady(true)
                    axios.post(`http://localhost:8082/get_cart_products/${cart_id}`)
                        .then(async (data)=>{
                            console.log(data.data)
                            setProducts(data.data.products)
                            setQuantity([data.data.quantity])
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
    const plus_quantity_of_product = (product_id) => {
        axios.post(`http://localhost:8082/cart/${cart_id}/plus_quantity_of_product/${product_id}`)
            .then((res)=>{
                window.location.reload();
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
                })
            })
    }
    const minus_quantity_of_product = (product_id) => {
        axios.post(`http://localhost:8082/cart/${cart_id}/minus_quantity_of_product/${product_id}`)
            .then((res)=>{
                window.location.reload();
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
                })
            })
    }
    const delete_product = (product_id) => {
        axios.post(`http://localhost:8082/cart/${cart_id}/delete_product/${product_id}`)
            .then((res)=>{
                window.location.reload();
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
                })
            })
    }
    return (
        <>
            { ready ? 
                <div className="container-all">
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
                            width:'100%',
                            height:'100vh',
                        }} className="cart-container">
                            <div style={{
                                display:'flex',
                                justifyContent:'center',
                                flexDirection:'column',
                                backgroundColor:'rgb(19, 20, 21)',

                            }} className="cart-container-first-child">
                                <div align="center" style={{
                                    height:'62vh'
                                }}>
                                    <img src={DecorMakers} />
                                </div>
                                <div align="center">
                                    <div style={{width:'100%'}}>
                                    <div style={{width:'80%'}}>
                                        <div align="center">
                                            <div style={{
                                                backgroundColor:'rgb(12, 13, 13)',
                                                padding:'20px',
                                                borderRadius:'5px 5px 0px 0px'
                                            }}>
                                                <h4>Coupon Code:</h4>
                                                <input type="text" placeholder="Coupon" style={{
                                                    color:'#9fef00'
                                                }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{
                                        width:'100%',
                                        backgroundColor:'rgb(12,13,13)',
                                        padding:'10px',
                                        borderRight:'1px solid #9fef00'
                                    }}>
                                        <h1>${products.length > 0 ? products.map((product) => parseInt(product.price)).reduce((sum, num) => sum + num) : ''}</h1>
                                        <div style={{
                                                        display:'flex',
                                                        justifyContent:'space-around',
                                                        alignItems:'center',
                                                        backgroundColor:'#1b1d1e',
                                                        padding:'10px',
                                                        border:'1px solid white',
                                                        borderRadius:'100px',
                                                        width:'100%',
                                                        cursor:'pointer',
                                                        direction:'rtl'
                                                    }} id="shoppingCartButton">
                                                        <h3>شراء الآن</h3>
                                                        <img src={shoppingCart} width="80" />
                                         </div>
                                    </div>
                                    </div>
                                </div>

                            </div>
                            <div className="cart-container-second-child" style={{display:'flex', justifyContent:'center',backgroundColor:'rgb(12, 13, 13)', padding:'30px'}}>
                                <div align="center" style={{width:'100%',overflowY:'auto',flexDirection:'column'}}>
                                { products.length > 0 ?
                                    products.map((product,index)=>{
                                        return (
                                            <>
                                                <div style={{
                                                    justifyContent:'space-between',
                                                    backgroundColor:'rgb(19, 20, 21)',
                                                    /*border:'1px solid white',*/
                                                    direction: 'rtl',
                                                    borderRadius:'10px',
                                                    /*orderRadius:`${products.length == 1 ? "10px" : index == 0 ? "10px 10px 0px 0px" : index == products.length-1 ? "0px 0px 10px 10px" : "0px"}`,*/
                                                    padding:'20px',
                                                    width:'90%',
                                                    alignItems:'center',
                                                    marginBottom:'10px'
                                                }} className="cart_product_details_parent">
                                                    <div className="cart_product_details" style={{width:"auto", minWidth:"15%", direction:'rtl'}}>
                                                        <img src={product.product_pic} width="200" style={{borderRadius:'10px'}}  />
                                                        <div style={{direction:'rtl', textAlign:'right',marginRight:'10px'}}>
                                                            <h3>{product.product_name}</h3>
                                                            <h5>الحجم: {quantity.length > 0 ? quantity[0][product._id].choosed_size : ''}</h5>
                                                            <div style={{
                                                                display:'flex'
                                                            }}>
                                                                <h5>الكمية: {quantity.length > 0 ? quantity[0][product._id].quantity : ''}</h5>
                                                                <div style={{
                                                                    width:'25px',
                                                                    height:'25px',
                                                                    borderRadius:'50%',
                                                                    backgroundColor:'transparent',
                                                                    display:'flex',
                                                                    justifyContent:'center',
                                                                    alignItems:'center',
                                                                    border:'1px solid #9fef00',
                                                                    marginRight:'10px',
                                                                    cursor:'pointer'
                                                                }} onClick={()=>plus_quantity_of_product(product._id)}>
                                                                    <h4 style={{width:'auto',height:'26px'}}>+</h4>
                                                                </div>
                                                                <div style={{
                                                                    width:'25px',
                                                                    height:'25px',
                                                                    borderRadius:'50%',
                                                                    backgroundColor:'transparent',
                                                                    display:'flex',
                                                                    justifyContent:'center',
                                                                    alignItems:'center',
                                                                    border:'1px solid red',
                                                                    marginRight:'10px',
                                                                    cursor:'pointer'
                                                                }} onClick={()=>minus_quantity_of_product(product._id)}>
                                                                    <h4 style={{width:'auto',height:'25px'}}>-</h4>
                                                                </div>
                                                            </div>
                                                            <img src={trash} width="30" style={{cursor:'pointer'}} onClick={()=>delete_product(product._id)} />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4>${quantity.length > 0 ? Math.round(product.price * quantity[0][product._id].quantity,2) : ''}</h4>
                                                        {quantity.length > 0 && quantity[0][product._id].quantity - 1 ? <h6>${`${product.price}x${quantity[0][product._id].quantity}`}</h6> : ''}
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                  : <h3>لا يوجد أي منتج في سلتك</h3>
                                }
                                </div>
                            </div>
                            <div style={{display:'none'}}>
                                    <h1>${products.length > 0 ? products.map((product) => parseInt(product.price)).reduce((sum, num) => sum + num) : ''}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                : <Loading />
            }
        </>
    )
}