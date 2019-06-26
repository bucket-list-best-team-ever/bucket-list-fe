import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
    return (
        <div>
            <h2>Thank You For Submitting an Item To Your Friend's List!</h2>
            <button><Link to='/bucket-list'>Home</Link></button>
        </div>
    )
}

export default ThankYou;