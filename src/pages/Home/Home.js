import React from 'react';
import './Home.css';
import Hero from '../../components/hero/Hero';
import Categories from '../../components/categories/Categories';
import New from '../../components/new/New';
import About from '../../components/about/About';

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <New />
      <About />
    </div>
  )
}

export default Home
