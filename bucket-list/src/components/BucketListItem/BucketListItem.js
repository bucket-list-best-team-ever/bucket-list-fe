import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import BucketListPosts from '../BucketListPosts/BucketListPosts';

import './BucketListItem.scss'

const BucketListItem = props => {
    const [completed, markItemCompleted] = useState(props.item.completed)
    const [posts, setPosts] = useState(0)

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

                markItemCompleted(!completed)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        viewPosts();
    }, [])

    const viewPosts = () => {
        if (posts === 0) {
            axiosWithAuth()
                .get(`/api/item/${props.item.id}/posts`)
                .then(res => {

                    setPosts(res.data.posts)
                })
                .catch(err => console.log(err))
        }
    }

    const onSubmit = e => {
        e.preventDefault();
        markCompleted();
    }

    return (
        <div className='bucket-list-item'>
            <h2>{props.item.description}</h2>
            <div className='posts-div'>
                {(posts !== 0) ? posts.map(post => (
                    <BucketListPosts key={post.id} post={post} />
                )) : <p>Loading...</p>}
            </div>
            <div className='item-buttons'>
                <Link to={`/bucket-list/item/${id}`}><button className='update-button'>Update</button></Link>
                <button className='completed' onClick={onSubmit} style={(completed) ? green : red }>Completed</button>
            </div>
        </div>
    )
}

export default BucketListItem;