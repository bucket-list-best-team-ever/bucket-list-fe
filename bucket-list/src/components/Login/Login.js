import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Link } from 'react-router-dom';

import './Login.scss'

const Login = props => {
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');

    const signIn = creds => {
        axiosWithAuth()
            .post('/api/login', creds)
            .then(res => {
                console.log(res);
                localStorage.setItem('token', res.data.token)
                props.history.push('/bucket-list')
            })
            .catch(err => console.log(err))
    }

    const onSubmit = e => {
        e.preventDefault();
        signIn({ email, password });
        updateEmail('');
        updatePassword('');
    }
    
    return (
        <div onSubmit={onSubmit} className='login'>
            <form>
                <input required type='text' name='email' placeholder='Email' value={email} onChange={e => updateEmail(e.target.value)} />
                <input required type='password' name='password' placeholder='Password' value={password} onChange={e => updatePassword(e.target.value)} />
                <button>Log In</button>
            </form>
            <Link to='/sign-up'><p className='sign-up-link'>Sign Up</p></Link>
        </div>
    )
}

export default Login;