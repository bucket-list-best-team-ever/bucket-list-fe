import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const SignUp = () => {
    const [username, updateUsername] = useState('');
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');

    const register = creds => {
        axiosWithAuth()
            .post('/api/register', creds)
            .then(res => {
                console.log(res);
                localStorage.setItem('token', res.data.payload)
            })
            .catch(err => console.log(err))
    }

    const onSubmit = e => {
        e.preventDefault();
        register({ username, email, password })
        updateUsername('');
        updateEmail('');
        updatePassword('');
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input required type='text' name='username' placeholder='Username' value={username} onChange={e => updateUsername(e.target.value)} />
                <input required type='text' name='email' placeholder='Email' value={email} onChange={e => updateUsername(e.target.value)} />
                <input required type='text' name='password' placeholder='Password' value={password} onChange={e => updateUsername(e.target.value)} />
                <button>Register</button>
            </form>
        </div>
    )
}

export default SignUp;