import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const BucketListItem = props => {
    const [completed, markItemCompleted] = useState(props.item.completed)
    const green = {
        backgroundColor: 'green'
    }
    const red = {
        backgroundColor: 'red'
    }
    const id = props.item.id;

    const markCompleted = () => {
        axiosWithAuth()
            .put(`/api/item/${id}`, { user_id: props.userId, description: props.item.description, completed: !completed})
            .then(res => {
                console.log(res)
                markItemCompleted(!completed)
            })
            .catch(err => console.log(err))
    }

    const onSubmit = e => {
        e.preventDefault();
        markCompleted();
    }

    return (
        <div>
            <h2>{props.item.description}</h2>
            <h3>{props.item.created}</h3>
            <button><Link to={`/bucket-list/item/${id}`}>About</Link></button>
            <button onClick={onSubmit} style={(completed) ? green : red }>Completed</button>
        </div>
    )
}

export default BucketListItem;