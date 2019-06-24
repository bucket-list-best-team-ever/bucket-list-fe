import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';


import './SignUp.scss'

const SignUp = props => {
    const [name, updateUsername] = useState('');
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');

    const register = creds => {
        console.log(creds)
        axiosWithAuth()
            .post('/api/register', creds)
            .then(res => {
                console.log(res);
                localStorage.setItem('token', res.data.token)
                props.history.push('/bucket-list')
            })
            .catch(err => console.log(err))
    }

    const onSubmit = e => {
        e.preventDefault();
        register({ name, email, password })
        updateUsername('');
        updateEmail('');
        updatePassword('');
    }

    return (
        <div className='sign-up'>
            <form onSubmit={onSubmit}>
                <input required type='text' name='name' placeholder='Name' value={name} onChange={e => updateUsername(e.target.value)} />
                <input required type='text' name='email' placeholder='Email' value={email} onChange={e => updateEmail(e.target.value)} />
                <input required type='password' name='password' placeholder='Password' value={password} onChange={e => updatePassword(e.target.value)} />
                <button>Register</button>
            </form>
            <Link to='/'>Login</Link>
        </div>
    )
}

export default SignUp;