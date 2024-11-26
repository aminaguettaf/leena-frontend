import React, { useContext } from 'react';
import './New.css';
import Item from '../item/Item';
import { AppContext } from '../../context/AppContext';

const New = () => {
    const {allProducts} = useContext(AppContext);
    const products = [];
    for(let i=0; i < allProducts.length; i=i+4){
        products.push(allProducts.slice(i, i+4));
    }

  return (
    <div className='new my-5'>
        <div className='container'>
            <h1 className='text-center position-relative'>the new collection</h1>
            <div id="carouselExampleIndicators" className="carousel position-relative slide my-5">
                <div className="carousel-indicators">
                    {products.map((_, index)=>{
                        return(
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 && 'active'}  aria-current={index === 0 ? 'true' : undefined} aria-label={`Slide ${index + 1}`}></button>
                        )
                    })}
                </div>
                <div className="carousel-inner">
                    {products.map((group, index)=>{
                        return(
                            <div className={`carousel-item ${index === 0 && 'active'}`} key={index}>
                                <div className='d-flex gap-2'>
                                    {group.map((product)=>{
                                    return(
                                            <Item id={product._id} key={product._id} image={`https://leena-backend-5.onrender.com/images/${product.image[0]}`} name={product.name} price={product.price}/>
                                    )})}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='angle left'>
                    <i className="fa-solid fa-angle-left" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev"></i>
                </div>
                <div className='angle right'>
                    <i className="fa-solid fa-angle-right" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next"></i>
                </div>
            </div>
        </div>
    </div>
  )
}

export default New
