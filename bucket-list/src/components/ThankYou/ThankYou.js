import React from 'react';
import { Link } from 'react-router-dom';

import './ThankYou.scss';

const ThankYou = () => {
    return (
        <div className='thank-you'>
            <h2>Thank You For Submitting an Item To Your Friend's List!</h2>
            <Link to='/bucket-list'><button>Home</button></Link>
        </div>
    )
}

export default ThankYou;