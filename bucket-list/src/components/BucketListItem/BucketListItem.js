import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const BucketListItem = props => {
    const [completed, markCompleted] = useState(false)
    const green = {
        backgroundColor: 'green'
    }
    const red = {
        backgroundColor: 'red'
    }
    const id = props.item.id;
    const toggle = e => {
        e.preventDefault();
        markCompleted(!completed)
    }
    return (
        <div>
            <h2>{props.item.description}</h2>
            <h3>{props.item.created}</h3>
            <button><Link to={`/bucket-list/item/${id}`}>About</Link></button>
            <button onClick={toggle} style={(completed) ? green : red }>Completed</button>
        </div>
    )
}

export default BucketListItem;