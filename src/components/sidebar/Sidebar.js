import React, { useContext}  from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const Sidebar = () => {
  const{showBar, setShowBar, sideRef} = useContext(AppContext);
  
  return (
    <div  className={`sidebar ${showBar && 'show'}`}>
      <div ref={sideRef} className='sidebar-container py-5'>
        <i className="fa-solid fa-xmark xmark" onClick={()=>setShowBar(false)}></i>
        <div className='search position-relative px-2 py-1 mx-3 mb-3'>
          <input type='search' placeholder='Search...' />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <ul className='body'>
          <li><Link onClick={()=>setShowBar(false)} to='/'>home</Link></li>
          <li><Link onClick={()=>setShowBar(false)} to='/shop'>shop</Link></li>
          <li><Link onClick={()=>setShowBar(false)} to='/category/new-collection'>new collection</Link></li>
          <li><Link onClick={()=>setShowBar(false)} to='/category/robes'>robes</Link></li>
          <li><Link onClick={()=>setShowBar(false)} to='/category/aid-collection'>aid collection</Link></li>
          <li><Link onClick={()=>setShowBar(false)} to='/category/manteaux'>manteaux</Link></li>
          <li><Link onClick={()=>setShowBar(false)} to='/category/combinaisons'>combinaisons</Link></li>
          <li><Link onClick={()=>setShowBar(false)} to='/category/ensemble'>ensemble</Link></li>
          <li><Link onClick={()=>setShowBar(false)} to='/category/joggings'>jogging</Link></li>
          <li><Link onClick={()=>setShowBar(false)} to='/category/blazers'>blazers</Link></li>
          <li><Link onClick={()=>setShowBar(false)} to='/category/liquettes'>liquettes</Link></li>
          <li><Link onClick={()=>setShowBar(false)} to='/category/jupes'>jupes</Link></li>
          <li><Link onClick={()=>setShowBar(false)} to='/category/chemises'>chemises</Link></li>
          <li><Link onClick={()=>setShowBar(false)} to='/category/pantalons'>pantalons</Link></li>
          <li><Link onClick={()=>setShowBar(false)} to='/category/abayas'>abayas</Link></li>
          <li><Link onClick={()=>setShowBar(false)} to='/category/costumes'>costumes</Link></li>
          <li><Link onClick={()=>setShowBar(false)} to='/category/sweater'>sweater</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
