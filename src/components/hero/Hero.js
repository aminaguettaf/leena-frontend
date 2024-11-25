import React from 'react';
import './Hero.css';
import {Link} from 'react-router-dom';

const Hero = () => {
  return (
    <div className='hero d-flex align-items-center justify-content-center'>
      <div className='hero-content text-center'>
        <h1 className='text-light mb-5'>quality <br/> clothes for <br/> every woman</h1>
        <p className='text-light mb-5'>Will satisfy you no matter your style, we provide for your high <br/> quality unique models to make sure you’ll shine !</p>
        <Link to='shop'>browse products</Link>
      </div>
    </div>
  )
}

export default Hero
