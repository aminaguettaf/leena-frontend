import React, { useContext, useState, useEffect } from 'react';
import './Product.css';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import RelatedProducts from '../../components/relatedproducts/RelatedProducts';
import { toast } from 'react-toastify';


const Product = () => {
    const[image, setImage] = useState();
    const {allProducts, addToCart, cart, removeFromCart} = useContext(AppContext);
    const params = useParams();
    const product = allProducts.find(p => p._id === params.id);
    const[color, setColor] = useState('');
    const[size, setSize] = useState('');
    
    const handleAddToCart = () => {
        if (!size || !color) {
            toast.error('Please select a size and color.');
            return;
        }
        addToCart(product._id, size, color);
    };
    

    useEffect(()=>{
        setImage(product?.image[0]);
    },[product?.image])

    useEffect(()=>{
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    },[image])

    return (
    <div className='product my-5'>
      <div className='container d-flex align-items-center gap-4'>
        <div className='images d-flex gap-2'>
            <div className='imgs '>
                {product?.image?.map((image, index)=>{
                    return(
                        <img key={index} onClick={()=>setImage(image)} className='mb-2' src={`https://leena-backend-5.onrender.com/images/${image}`} alt=''/>
                    )
                })}
            </div>
            <div className='current-img'>
                {!image ?
                <img src={`https://leena-backend-5.onrender.com/images/${product?.image[0]}`} alt=''/>:
                <img src={`https://leena-backend-5.onrender.com/images/${image}`} alt=''/>
                }
            </div>
        </div>
        <div className='text'>
            <p className='cat mb-2'>{product?.category}</p>
            <h3 className='mb-2'>{product?.name}</h3>
            <p className='line mb-2'></p>
            <p className='price mb-2 fw-bold'>{product?.price} D.A</p>
            <p className='description mb-5'>{product?.description}</p>
            <div className='d-flex align-items-center gap-3 mb-4'>
                <p className='fw-bold'>Size</p>
                <select onChange={(e)=>setSize(e.target.value)} className='p-2 w-100'>
                    <option>Select a size</option>
                    {product?.sizes.map((size, index)=>{
                        return(
                        <option key={index} value={size}>{size}</option>
                        )
                    })}
                </select>
            </div>
            <div className='d-flex align-items-center gap-3 mb-4'>
                <p className='fw-bold'>Colors</p>
                <select onChange={(e)=>setColor(e.target.value)} className='p-2 w-100'>
                    <option>Select a color</option>
                    {product?.colors.map((color, index)=>{
                        return(
                        <option key={index} value={color}>{color}</option>
                        )
                    })}
                </select>
            </div>
            <div className="d-flex gap-4 add">
                {cart[product?._id]?.[size]?.[color] ?
                    <div className="d-flex gap-3 align-items-center">
                        <span onClick={() => removeFromCart(product._id, size, color)} className="p-2">-</span>
                        {cart[product._id][size][color]}
                        <span onClick={() => addToCart(product._id, size, color)} className="p-2">+</span>
                    </div>: 
                    <button onClick={handleAddToCart} className="py-2 px-4 text-light fw-bold">Add to Cart</button>
                }
            </div>
        </div>
    </div>
      <RelatedProducts product={product} />
    </div>
  )
}

export default Product
