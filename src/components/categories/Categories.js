import React from 'react';
import './Categories.css';
import {Link} from 'react-router-dom';
import cat1 from '../../images/cat1.jpg';
import cat2 from '../../images/cat2.jpg';
import cat3 from '../../images/cat3.jpg';
import cat4 from '../../images/cat4.jpg';

const Categories = () => {
  return (
    <div className='categories my-5'>
      <div className='container d-flex gap-3'>
        <div className='first'>
            <img src={cat1} alt='' />
        </div>
        <div className='second position-relative'>
            <img src={cat2} alt='' />
            <div className='text position-absolute text-center text-light'>
                <h1 className='mb-4'>Only the best !</h1>
                <p className='mb-4'>Shop now from our large selection of quality clothes <br/> for all of you ladies.</p>
                <Link>go to shop</Link>
            </div>
        </div>
        <div className='third d-flex flex-column gap-3'>
            <div className='position-relative'>
                <img src={cat3} alt=''/>
                <Link className='position-absolute'>combinaisons</Link>
            </div>
            <div className='position-relative'>
                <img src={cat4} alt=''/>
                <Link className='position-absolute'>robes</Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Categories
