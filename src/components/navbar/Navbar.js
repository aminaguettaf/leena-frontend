import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const {barRef, setShowBar, setShowCart, cartRef, getCartTotal, token, setToken, setCart} = useContext(AppContext);
  const [stickyNav, setStickyNav] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50 && !stickyNav) {
      setStickyNav(true);
    }
    else if (window.scrollY <= 20 && stickyNav) {
      setStickyNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, [stickyNav]); 
  
  const logout =()=>{
    setToken('');
    localStorage.removeItem('token');
    toast.success('You logged out');
  }

  return (
    <div  className={`navbar p-3 d-flex align-items-center justify-content-between ${stickyNav && 'active'}`}>
      <i ref={barRef} className="fa-solid fa-bars" onClick={()=>setShowBar(true)}></i>
      <Link><img src={logo} alt=''/></Link>
      <div ref={cartRef} className='navbar-left d-flex align-items-center gap-4'>
        <div className='cart-div position-relative'>
          <i onClick={()=>setShowCart(true)} className="fa-solid fa-cart-shopping"></i>
          <div className='dot position-absolute d-flex align-items-center justify-content-center bg-black text-light'>{getCartTotal()}</div>
        </div>
        <Link to='https://www.instagram.com/leena_.collection/'><i className="fa-brands fa-instagram"></i></Link>
        <i className="fa-solid fa-magnifying-glass"></i>
        {token ?
        <Link onClick={logout} className='login text-light bg-dark p-2'>logout</Link>:
        <Link to='/login' className='login text-light bg-dark p-2'>login</Link>}
        
      </div>
    </div>
  )
}

export default Navbar
