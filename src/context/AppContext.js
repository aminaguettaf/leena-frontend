import { createContext, useEffect, useRef, useState} from "react";
import axios from 'axios';
import {toast} from 'react-toastify';


export const AppContext = createContext();

const AppContextProvider =(props)=>{

    const cartRef = useRef();
    const cartConRef = useRef();
    const sideRef = useRef();
    const barRef = useRef();

    const[token, setToken] = useState('');
    const[showBar, setShowBar] = useState(false);
    const[showCart, setShowCart] = useState(false);
    const[cart, setCart] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const[address, setAddress] = useState({
        country:'',
        wilaya:'',
        city:'',
        code:''
    });
    
    const hideSideBar =(e)=>{
        if(sideRef.current && barRef.current && !sideRef.current.contains(e.target) && !barRef.current.contains(e.target)){
            setShowBar(false);
        }
    }
    const hideCart = (e)=>{
        if(cartRef.current && cartConRef.current && !cartConRef.current.contains(e.target) && !cartRef.current.contains(e.target)){
            setShowCart(false);
        }
    }

    const getAllProducts = async()=>{
        try {
            const response = await axios.get('https://leena-backend-5.onrender.com/api/product/get-products');
            if(response.data.success){
            setAllProducts(response.data.data);
            console.log(response.data.data)}
            else{
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
        
    }
    useEffect(()=>{
        getAllProducts();
    },[])

    const addToCart = async(productId, size, color) => {   
        setCart((prev) => {
            let cartData = structuredClone(prev);
            
            if (cartData[productId] && cartData[productId][size] && cartData[productId][size][color]) {
                cartData[productId][size][color] += 1;
            } else {
                if (!cartData[productId]) {
                    cartData[productId] = {};
                }
                if (!cartData[productId][size]) {
                    cartData[productId][size] = {};
                }
                cartData[productId][size][color] = 1;
            }

            return cartData;
        });
        if(token){
           await axios.post('https://leena-backend-5.onrender.com/api/cart/addToCart', {productId, size, color},{headers:{token}});
        }
    };
    const removeFromCart = async(productId, size, color)=>{ 
        setCart((prev)=>{
            const cartData = structuredClone(prev);
            if(cartData[productId] && cartData[productId][size] && cartData[productId][size][color]){
                cartData[productId][size][color] -= 1;
                if(cartData[productId][size][color] <= 0){
                    delete cartData[productId][size][color];
                }
                if(Object.keys(cartData[productId][size]).length === 0){
                    delete cartData[productId][size];
                }

                if(Object.keys(cartData[productId]).length === 0){
                    delete cartData[productId];
                }
            }
            return cartData;
        });
        if(token){
            await axios.post('https://leena-backend-5.onrender.com/api/cart/removeFromCart', {productId, size, color}, {headers:{token}});
            
        }
    }

    const getCart = async(token)=>{
        try {
            const response = await axios.post('https://leena-backend-5.onrender.com/api/cart/getCart', {}, {headers:{token}});
                if(response.data.success){
                    setCart(response.data.cart);
            }
        } catch (error) {
            toast.error(error.message)
        }  
    }
    useEffect(()=>{
        if(token){
            getCart(token);
        }
        else{
            setCart([]);
        }
    },[token])
    
    useEffect(()=>{
        if(localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
        }
    },[])


    const getCartTotal = ()=>{
        let cartTotal = 0;
        for (const items in cart){
            for(const size in cart[items]){
                for(const color in cart[items][size]){
                    cartTotal += cart[items][size][color];
                }

            }
        }
        return cartTotal;
    }

    const getTotalAmount = () => {
        let totalAmount = 0;
        
        for (const id in cart) {
          for (const size in cart[id]) {
            for (const color in cart[id][size]) {
              if (cart[id][size][color] > 0) {
                const itemInfo = allProducts.find(p => p._id === id);
                if(itemInfo.price){
                    totalAmount += itemInfo.price * cart[id][size][color];
                }
                  else{
                    console.log('cant find product')
                  }
              }
            }
          }
        }
        
        return totalAmount;
    };
      

    useEffect(()=>{
        document.addEventListener('mousedown', hideSideBar);
    },[])

    useEffect(()=>{
        document.addEventListener('mousedown', hideCart);
    },[])

    const value ={
        showBar, setShowBar,
        sideRef, barRef, hideSideBar,
        showCart, setShowCart,
        cartRef, cartConRef,
        allProducts,
        addToCart, removeFromCart, getCartTotal,cart,
        getTotalAmount,
        address, setAddress,
        token, setToken,setCart
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;