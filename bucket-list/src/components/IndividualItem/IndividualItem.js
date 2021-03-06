import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import Posts from '../Posts/Posts';
import './IndividualItem.scss';

const IndividualItem = props => {
    const [item, setItem] = useState(0)
    const [posts, setPosts] = useState(0)
    const [post, addPost] = useState('')
    const [description, addDescription] = useState('')
    const [user_id, updateUserId] = useState(null)
    const [itemId, updateItemId] = useState(props.match.params.id)

    useEffect(() => {
        getId();
        viewItem();
        viewPosts();
    }, [])

    const getId = () => {
        axiosWithAuth()
            .get(`/api/user`)
            .then(res => {
                updateUserId(res.data.user.id)
            })
            .catch(err => console.log(err))
    }

    const viewItem = () => {
        const id = props.match.params.id
        if (item === 0) {
            axiosWithAuth(id)
                .get(`/api/item/${id}`)
                .then(res => {
                    setItem(res.data.item)
                    
                    addDescription(res.data.item.description)
                })
                .catch(err => console.log(err))
        } else {
            return
        }
    }

    const viewPosts = () => {
        const id = props.match.params.id
        if (posts === 0) {
            axiosWithAuth()
                .get(`/api/item/${id}/posts`)
                .then(res => {
                    setPosts(res.data.posts)
                })
                .catch(err => console.log(err))
        }
    }


    const newPost = () => {
        const id = props.match.params.id
        axiosWithAuth() 
            .post(`/api/item/post`, { item_id: id, message: post })
            .then(res => {
                addPost('')
                setPosts(0)
                setItem(0)
            })
            .catch(err => console.log(err))
    }

    const deleteItem = () => {
        const id = props.match.params.id
        axiosWithAuth()
            .delete(`/api/item/${id}`)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    const updateItem = update => {
        const id = props.match.params.id
            axiosWithAuth()
                .put(`/api/item/${id}`, { user_id: user_id, description: description })
                .then(res => {
                    console.log(res)
                })
                .catch(err => console.log(err))
    }

    const onDelete = e => {
        e.preventDefault();
        deleteItem();
        props.history.push('/bucket-list')
    }

    const onSubmit = e => {
        e.preventDefault();
        newPost()
        props.history.push('/bucket-list')
    }

    const onUpdate = e => {
        e.preventDefault();
        updateItem();
        props.history.push('/bucket-list')
    }

    return (
        <div className='individual-item'>
            <div className='item-description'>
                <h2>{item.description}</h2>
                <form onSubmit={onUpdate}>
                    <input type='text' name='update' placeholder='Update Title...' value={description} onChange={e => addDescription(e.target.value)} /> 
                    <button>Update</button>
                </form>
                <button onClick={onDelete}>Delete Bucket List Item</button>
            </div>
            <div className='posts-container'>
                {(posts !== 0) ? posts.map(post => (
                    <Posts {...props} key={post.id} id={itemId} post={post} />
                )) : <p>Loading...</p>}
            </div>
            <form onSubmit={onSubmit}>
                <input type='text' name='post' placeholder='Add A Comment...' value={post} onChange={e => addPost(e.target.value)} />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default IndividualItem;