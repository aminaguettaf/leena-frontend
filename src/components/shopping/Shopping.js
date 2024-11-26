import React, { useContext, useState } from 'react';
import './Shopping.css';
import {Link} from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const Shopping = () => {
  const{cart, allProducts,  addToCart, removeFromCart, getTotalAmount, address, setAddress}= useContext(AppContext);
  
  const[showAddress, setShowAddress]= useState(false);
  const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setAddress((prev)=>({...prev, [name]:value}))
  }
  return (
    <div className='shopping row'>
      <div className='col-lg-7'>
        <div className='table header py-2'>
          <p className='fw-bold'>PRODUCT</p>
          <p className='fw-bold'>PRICE</p>
          <p className='fw-bold'>QUANTITY</p>
          <p className='fw-bold'>SUBTOTAL</p>
        </div>
        
          {Object.keys(cart).map((productId)=>{
            const product = allProducts.find(p=> p._id === productId);
            if(product){
              return Object.keys(cart[productId]).map((size)=>{
                return Object.keys(cart[productId][size]).map((color)=>{
                  const quantity = cart[productId][size][color];
                  return(
                    <div key={`${productId}-${size}-${color}`} className='table body py-2'>
                      <div className='d-flex align-items-center gap-2'>
                        <i className="fa-solid fa-xmark"></i>
                        <img image={`https://leena-backend-5.onrender.com/${product.image[0]}`} alt=''/>
                        <p className='name'>{product.name}</p>
                      </div>
                      <p className='price fw-bold '>{product.price} D.A</p>
                      <div className='qty d-flex gap-3 align-items-center'>
                        <span onClick={()=>removeFromCart(product._id, size, color)} className='p-1' >-</span>{quantity}<span onClick={()=>addToCart(product._id, size, color)} className='p-1'>+</span>
                      </div>  
                      <p className='subtotal fw-bold '>{product.price * quantity} D.A</p>
                    </div>
                  )
                })
              })
            }
          })}
          
        <div className='btns d-flex align-items-center gap-4'>
          <Link className='px-4 py-2' to='/shop'><i className="fa-solid fa-arrow-left"></i> CONTINUE SHOPPING</Link>
          <button className='px-4 py-2 bg-black text-light fw-bold'>UPDATE CART</button>
        </div>
      </div>
      <div className='cart-totals col-lg-5'>
        <p  className='fw-bold header py-2'>CART TOTALS</p>
        <div className='d-flex align-items-center justify-content-between my-2'>
          <p>Subtotal</p>
          <p className='fw-bold'>{getTotalAmount()} D.A</p>
        </div>
        <div className='shipping d-flex align-items-center justify-content-between my-2'>
          <p>Shipping</p>
          <div className='position-relative'>
            <p>Livraison offerte gratuitement</p>
            <p>Shipping to {address.country}, {address.wilaya}, {address.city}, {address.code}</p>
            <p className='change-ad fw-bold' onClick={()=>setShowAddress(!showAddress)}>Change address</p>
            {showAddress && 
            <div className='adress position-absolute'>
              <select onChange={onChangeHandler} name='country' value={address.country} className='w-100 p-2 mb-2'>
                <option >Country</option>
                <option value='Algeria' selected>Algeria</option>
              </select>
              <select onChange={onChangeHandler} name='wilaya' value={address.wilaya} className='w-100 p-2 mb-2'>
                <option >Wilaya</option>
                <option value='Sétif'>Sétif</option>
                <option value='Oran'>Oran</option>
                <option value='Jijel'>Jijel</option>
                <option value='Bejaia'>Bejaia</option>
              </select>
              <input onChange={onChangeHandler} type='text' name='city' placeholder='City' className='w-100 p-2 mb-2'/>
              <input onChange={onChangeHandler} type='text' name='code' placeholder='Code postal' className='w-100 p-2 mb-2'/>
              <button onClick={()=>setShowAddress(false)} className='fw-bold bg-black text-light p-2 w-100'>UPDATE</button>
            </div>}
          </div>
        </div>
        <div className='d-flex align-items-center justify-content-between my-2'>
          <p>Total</p>
          <p className='fw-bold'>{getTotalAmount()} D.A</p>
        </div>
        <Link className='text-light fw-bold bg-black text-light w-100 text-center py-2 px-5 mt-3' to='/checkout-details'>PROCEED TO CHECKOUT</Link>
      </div>
    </div>
  )
}

export default Shopping
