import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = () => {
    const [username, updateUsername] = useState('');
    const [password, updatePassword] = useState('');

    const signIn = creds => {
        axiosWithAuth()
            .post('/api/login', creds)
            .then(res => {
                console.log(res);
                localStorage.setITem('token', res.data.payload)
            })
            .catch(err => console.log(err))
    }

    const onSubmit = e => {
        e.preventDefault();
        signIn({username, password});
        updateUsername('');
        updatePassword('');
    }
    
    return (
        <div onSubmit={onSubmit} className='login'>
            <form>
                <input required type='text' name='username' placeholder='Username' />
                <input required type='text' name='password' placeholder='Password' />
            </form>
        </div>
    )
}

export default Login;