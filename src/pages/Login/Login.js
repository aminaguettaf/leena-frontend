import React, { useContext, useState } from 'react';
import './Login.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const{setToken} = useContext(AppContext);
    const [currState, setCurrState] = useState('login');
    const [data, setData] = useState({
        name:'',
        email:'',
        password:''
    })
    
    const onChangeHandler = (e)=>{
        const name = e.target.name;
        const value= e.target.value;
        setData((prev)=>({...prev, [name]: value}));
    }

    const onSubmitHandler = async(e)=>{
        e.preventDefault();
        let url;
        if(currState === 'sign up'){
            url = 'https://leena-backend-5.onrender.com/api/user/register';
        }
        else if(currState === 'login'){
            url = 'https://leena-backend-5.onrender.com/api/user/login';
        }
        const response = await axios.post(url, data);
        if(response.data.success){
            toast.success(response.data.message);
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);
            navigate('/');
        }
        else{
            toast.error(response.data.message)
        }
    }

    return (
    <div className='login'>
        <div className='container'>
            <div className='login-container'>
                <div className='title d-flex align-items-center gap-2'>
                    <h3>{currState}</h3>
                    <p></p>
                </div>
                <form onSubmit={onSubmitHandler}>
                    {currState === 'sign up' &&
                    <input  className='mb-3 p-2' name='name' value={data.name} onChange={onChangeHandler} placeholder='Name' type='text' required/>}
                    <input  className='mb-3 p-2' name='email' value={data.email} onChange={onChangeHandler} placeholder='Email' type='email' required/>
                    <input  className='mb-3 p-2' name='password' value={data.password} onChange={onChangeHandler} placeholder='Password' type='password' required/>
                    <div className='qst d-flex align-items-center justify-content-between'>
                        <p>Forgot your password?</p>
                        {currState === 'sign up' ? 
                        <p onClick={()=>setCurrState('login')}>Login here</p> :
                        <p onClick={()=>setCurrState('sign up')}>Create account</p>
                        }
                    </div>
                    <button type='submit'>{currState}</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login
