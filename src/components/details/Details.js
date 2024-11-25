import React, { useContext, useState } from 'react';
import './Details.css';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Details = () => {
  const{address,setAddress, cart, allProducts, getTotalAmount, token, setCart} = useContext(AppContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    alladdress: ''
  })

  const onChangeHandler = (e)=>{
    const{name, value}= e.target;
    setData((prev)=>({...prev, [name]: value}));
  }

  const onSumbitHandler = async(e)=>{
    e.preventDefault();
    try {
      let orderItems = [];
      
      for (const productId of Object.keys(cart)) {
        for (const size of Object.keys(cart[productId])) {
          for (const color of Object.keys(cart[productId][size])) {
            if (cart[productId][size][color] > 0) {
              const itemInfo = structuredClone(allProducts.find(product => product._id === productId));
              if (itemInfo) {
                itemInfo.size = size; // Taille
                itemInfo.color = color; // Couleur
                itemInfo.quantity = cart[productId][size][color]; // Quantité
                orderItems.push(itemInfo);
              }
            }
          }
        }
      }
      let orderData = {
        userInfos: {
          address,
          data
        },
        items: orderItems,
        amount: getTotalAmount()
      }
      const response = await axios.post('http://localhost:4000/api/order/place-order', orderData, {headers:{token}});
      if(response.data.success){
        setCart([]);
        navigate('/order');
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className='details mb-5'>
      <form onSubmit={onSumbitHandler} className='container'>
        <div className='row'>
          <div className='col-lg-7 billing'>
            <h3>billing & shipping</h3>
              <div className='input-container d-flex align-items-center gap-3 mb-4'>
                <div>
                  <p className='mb-2'>Prénom</p>
                  <input className='w-100 p-2' type='text' name='firstName' value={data.firstName} onChange={onChangeHandler} required/>
                </div>
                <div>
                  <p className='mb-2'>Nom</p>
                  <input className='w-100 p-2' type='text' name='lastName' value={data.lastName} onChange={onChangeHandler} required/>
                </div>
              </div>
              <div className='mb-4'>
                <p className='mb-2'>Téléphone</p>
                <input className='w-100 p-2' type='text' name='phone' value={data.phone} onChange={onChangeHandler} required/>
              </div>   
              <div className='mb-4'>
                <p className='mb-2'>Pays</p>
                <p className='fw-bold'>{address.country}</p>
              </div> 
              <div className='mb-4'>
                <p className='mb-2'>Wilaya</p>
                <select className='w-100 p-2' value={address.wilaya} onChange={(e)=>setAddress({...address, wilaya:e.target.value})}>
                  <option value='Sétif'>Sétif</option>
                  <option value='Oran'>Oran</option>
                  <option value='Jijel'>Jijel</option>
                  <option value='Bejaia'>Bejaia</option>
                </select>
              </div> 
              <div className='mb-4'>
                <p className='mb-2'>Commune</p>
                <input className='w-100 p-2' type='text' name='city' value={address.city}/>
              </div> 
              <div className='mb-4'>
                <p className='mb-2'>Adresse complete</p>
                <input className='w-100 p-2' type='text' name='alladdress' value={data.alladdress} onChange={onChangeHandler} required/>
              </div> 
            </div>
          <div className='col-lg-4 you-order p-4'>
            <h3>your order</h3>
            <div className='d-flex align-items-center justify-content-between mb-4'>
              <p className='fw-bold'>Product</p>
              <p className='fw-bold'>Subtotal</p>
            </div>
            {Object.keys(cart).map((productId)=>{
              const product = allProducts.find(p=> p._id === productId);
              if(product){
                return Object.keys(cart[productId]).map((size)=>{
                  return Object.keys(cart[productId][size]).map((color)=>{
                    const quantity = cart[productId][size][color];
                    return(
                      <div key={`${productId}-${size}-${color}`} className='d-flex align-items-center justify-content-between mb-4'>
                        <p>{product.name} X {quantity}</p>
                        <p className='fw-bold'>{product.price * quantity} D.A</p>
                      </div>
                    )
                  })
                })
              }
            })}
            <div className='d-flex align-items-center justify-content-between mb-4'>
              <p>Subtotal</p>
              <p className='fw-bold'>{getTotalAmount()} D.A</p>
            </div>
            <div className='d-flex align-items-center justify-content-between mb-4'>
              <p>shipping</p>
              <p className='fw-bold'>Livraison offerte gratuitement</p>
            </div>
            <div className='d-flex align-items-center justify-content-between mb-4'>
              <p>Total</p>
              <p className='fw-bold'>{getTotalAmount()} D.A</p>
            </div>
            <hr />
            <p className='fw-bold mb-2'>Cash on delivery</p>
            <p className='mb-4'>Pay with cash upon delivery</p>
            <button  className='fw-bold text-light bg-black p-2 w-100' type='submit'>PLACE ORDER</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Details
