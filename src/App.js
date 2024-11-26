import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import About from './pages/About/About';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Cart from './components/cart/Cart';
import Product from './pages/Product/Product';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartPage from './pages/CartPage/CartPage';
import Login from './pages/Login/Login';

function App() {
  return (
    <BrowserRouter basename='/leena-frontend'>
    <ToastContainer />
    <Navbar/>
    <Sidebar/>
    <Cart />
    <Routes>
      <Route path='/'  element={<Home />}/>
      <Route path='/login' element={<Login/>}/>
      <Route path= '/about-us' element={<About />}/>
      <Route path= '/shop' element={<Shop />}/>
      <Route path='/product/:id' element={<Product />}/>
      <Route path='/cart' element={<CartPage />}/>
      <Route path='/checkout-details' element={<CartPage/>}/>
      <Route path='/order' element={<CartPage/>}/>
      <Route path='/category/new-collection' element={<Shop category='New collection' />} />
      <Route path='/category/robes' element={<Shop category='Robes'/>} />
      <Route path='/category/aid-collection' element={<Shop category='Aid collection' />} />
      <Route path='/category/manteaux' element={<Shop category='Manteaux'/>} />
      <Route path='/category/combinaisons' element={<Shop category='Combinaisons'/>} />
      <Route path='/category/ensemble' element={<Shop category='Ensembles'/>} />
      <Route path='/category/joggings' element={<Shop category='Jogging'/>} />
      <Route path='/category/blazers' element={<Shop category='Blazers'/>} />
      <Route path='/category/liquettes' element={<Shop category='Liquettes'/>} />
      <Route path='/category/jupes' element={<Shop category='Jupes'/>} />
      <Route path='/category/chemises' element={<Shop category='chemises'/>} />
      <Route path='/category/pantalons' element={<Shop category='pontalons'/>} />
      <Route path='/category/liquettes' element={<Shop category='liquettes'/>} />
      <Route path='/category/jupes' element={<Shop category='jupes'/>} />
      <Route path='/category/chemises' element={<Shop category='chemises'/>} />
      <Route path='/category/pantalons' element={<Shop category='pantalons'/>} />
      <Route path='/category/abayas' element={<Shop category='abayas'/>} />
      <Route path='/category/costumes' element={<Shop category='costumes'/>} />
      <Route path='/category/sweater' element={<Shop category='sweater'/>} />
    </Routes>
    </BrowserRouter> 
  );
}

export default App;
