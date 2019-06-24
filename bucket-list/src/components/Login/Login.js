import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, updateUsername] = useState('');
    const [password, updatePassword] = useState('');

    const signIn = creds => {
        axiosWithAuth()
            .post('/api/login', creds)
            .then(res => {
                console.log(res);
                localStorage.setItem('token', res.data.payload)
            })
            .catch(err => console.log(err))
    }

    const onSubmit = e => {
        e.preventDefault();
        signIn({ username, password });
        updateUsername('');
        updatePassword('');
    }
    
    return (
        <div onSubmit={onSubmit} className='login'>
            <form>
                <input required type='text' name='username' placeholder='Username' value={username} onChange={e => updateUsername(e.target.value)} />
                <input required type='text' name='password' placeholder='Password' value={password} onChange={e => updatePassword(e.target.value)} />
                <button>Log In</button>
            </form>
            <Link to='/sign-up'>Sign Up</Link>
        </div>
    )
}

export default Login;