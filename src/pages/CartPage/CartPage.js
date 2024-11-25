import React, { useEffect, useState } from 'react';
import './CartPage.css';
import {Link, useLocation} from 'react-router-dom';
import Shopping from '../../components/shopping/Shopping';
import Details from '../../components/details/Details';
import Order from '../../components/order/Order'

const CartPage = () => {
    const[step, setStep] = useState(1);
    const location = useLocation();
    useEffect(()=>{
        const path = location.pathname;
        if(path === '/cart'){
            setStep(1);
        }
        else if(path === '/checkout-details'){
            setStep(2);
        }
        else if(path === '/order'){
            setStep(3);
        }
        else{
            setStep(1);
        }
    },[location.pathname])

  return (
    <div className='cart-page'>
      <div className='container'>
        <div className='header d-flex align-items-center gap-2 my-5 justify-content-center'>
            <Link onClick={()=>setStep(1)} className={`${step >= 1 && 'active'}`} to='/cart'>shopping cart</Link>
            <i className={`fa-solid fa-angle-right ${step >= 2 && 'active'}`}></i>
            <Link onClick={()=>setStep(2)} className={`${step >= 2 && 'active'}`} to='/checkout-details'>checkout details</Link>
            <i className={`fa-solid fa-angle-right ${step >= 3 && 'active'}`}></i>
            <Link onClick={()=>setStep(3)} className={`${step === 3 && 'active'}`} to='/order'>order complete</Link>
        </div>
        {(()=>{
            if(step === 1){
                return <Shopping/>
            }
            else if(step === 2){
                return <Details />
            }
            else if(step === 3){
                return <Order />
            }
        })()}
      </div>
    </div>
  )
}

export default CartPage
