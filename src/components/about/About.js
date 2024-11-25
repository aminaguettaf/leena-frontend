import React from 'react';
import './About.css';
import about1 from '../../images/about1.jpg';
import about2 from '../../images/about2.jpg';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className='about'>
      <div className='container py-5 d-flex gap-5'>
        <div className='first'>
            <h1 className='mb-4 text-light'>about us</h1>
            <p className='mb-4 text-light'>Learn more about the founder of your favorite clothes brand.</p>
            <img src={about1} alt=''/>
        </div>
        <div className='second'>
            <img src={about2} alt=''/>
            <p className='text-center my-4 text-light'>Bienvenue chez Leena collection, votre boutique de référence pour tout ce qui concerne les vêtements. Nous sommes dédiés à vous donner le meilleur du style contemporain, en mettant l’accent sur la qualité des tissus, le prix et le service client.</p>
            <Link className='px-3 py-2 text-center text-light bg-black' to='/about'>more about</Link>
        </div>
      </div>
    </div>
  )
}

export default About
