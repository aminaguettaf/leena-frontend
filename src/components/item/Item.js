import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css'

const Item = ({image, name, price, id}) => {
  return (
    <Link to={`/product/${id}`} className='item position-relative'>
      <img src={image} alt=''/>
      <div className='text position-absolute text-center'>
        <p className='name text-light mb-2'>{name.slice(1, 20)}</p>
        <p className='price text-light fw-bold mb-2'>{price} D.A</p>
        <Link className='text-light py-1 px-2'>quick view</Link>
      </div>
    </Link>
  )
}

export default Item
