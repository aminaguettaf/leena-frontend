import React, { useContext, useEffect, useState } from 'react';
import './RelatedProducts.css';
import { AppContext } from '../../context/AppContext';
import Item from '../../components/item/Item';

const RelatedProducts = ({product}) => {
  const[RelatedProd, setRelatedProd] = useState([]);
  const {allProducts} = useContext(AppContext);

  const handleRelated = ()=>{
    const RelatedProducts = allProducts.filter(p => p.category === product.category && p._id !== product._id);
    setRelatedProd(RelatedProducts);
  }

  useEffect(()=>{
    handleRelated();
  },[product, allProducts]);

  return (
    <div className='related-prod my-5'>
      <div className='container'>
        <h3 className='mb-4'>related products</h3>
        <div className='related-container'>
          {RelatedProd.map((prod, index)=>{
            return(
              <Item key={prod._id} id={prod._id} name={prod.name} price={prod.price} image={`https://leena-backend-5.onrender.com/images/${product.image[0]}`} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default RelatedProducts;
