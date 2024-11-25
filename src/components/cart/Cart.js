import React, { useContext } from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const Cart = () => {
  const { showCart, setShowCart, cartConRef, cart, removeFromCart, getTotalAmount, allProducts} = useContext(AppContext);
  const cartIsEmpty = Object.keys(cart).length === 0;

  return (
    <div className={`cart ${showCart && 'show'}`}>
      <div ref={cartConRef} className="cart-container">
        <i onClick={() => setShowCart(false)} className="fa-solid fa-x position-relative fw-bold xmark"></i>
        <div className="header text-center">
          <p className="mt-4 mb-3">Cart</p>
          <p className="line"></p>
        </div>
        <div className="body mt-5">
          {!cartIsEmpty ? (
            <div className="cart-products">
              {Object.keys(cart).map((id) => {
                const product = allProducts.find(p => p._id === id);
                if (product) {
                  return Object.keys(cart[id]).map((size) => {
                    return Object.keys(cart[id][size]).map((color) => {
                      const quantity = cart[id][size][color];
                      return (
                        <div  key={`${id}-${size}-${color}`} className="cart-product d-flex justify-content-between mb-3 p-2">
                          <Link to={`/product/${id}`} className='d-flex align-items-center gap-3'>
                            <img src={`http://localhost:4000/images/${product.image[0]}`} alt="" />
                            <div className='infos'>
                              <p className="name fw-bold">{product.name}</p>
                              <p className='size'>{size}</p>
                              <p className='color'>{color}</p>
                              <p className='price'>{quantity} x {product.price} D.A</p>        
                            </div>
                          </Link>
                          <i onClick={()=>removeFromCart(id, size, color)} className="fa-solid fa-xmark"></i>
                        </div>
                      );
                    });
                  });
                }
                return null;
              })}
            </div>
          ) : (
            <div className="empty text-center">
              <i className="fa-solid fa-bag-shopping"></i>
              <p className="my-5">No products in the cart</p>
              <Link onClick={() => setShowCart(false)} className="text-light fw-bold bg-black py-2 px-3" to="/shop">Return to shop</Link>
            </div>
          )}
          
          {!cartIsEmpty && (
            <div className='details p-2'>
              <div className='subtotal d-flex align-items-center justify-content-between mb-3'>
                <p>Subtotal</p>
                <p className='price fw-bolder'>{getTotalAmount()} D.A</p>
              </div>
              <div className='d-flex flex-column gap-3'>
                <Link onClick={()=>setShowCart(false)} className='w-100 bg-black text-light p-2 fw-bold text-center' to="/cart">View Cart</Link> 
                <Link onClick={()=>setShowCart(false)} className='w-100 bg-black text-light p-2 fw-bold text-center' to="/checkout">Checkout</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
