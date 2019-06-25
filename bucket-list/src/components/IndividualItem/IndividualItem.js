import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import Posts from '../Posts/Posts';

const IndividualItem = props => {
    const [item, setItem] = useState(0)
    const [posts, setPosts] = useState(0)
    const [post, addPost] = useState('')

    useEffect(() => {
        viewItem();
        viewPosts();
    }, [])

    const viewItem = () => {
        const id = props.match.params.id
        if (item === 0) {
            axiosWithAuth(id)
                .get(`/api/item/${id}`)
                .then(res => {
                    console.log(res)
                    setItem(res.data.item)
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
                    console.log(res)
                    setPosts(res.data.posts)
                })
                .catch(err => console.log(err))
        }
    }
    console.log(posts)


    const newPost = () => {
        const id = props.match.params.id
        axiosWithAuth() 
            .post(`/api/item/post`, { item_id: id, message: post })
            .then(res => {
                console.log(res)
                addPost('')
                setPosts(0)
                setItem(0)
                props.history.push('/bucket-list')
            })
            .catch(err => console.log(err))
    }

    const onSubmit = e => {
        e.preventDefault();
        newPost()
    }

    return (
        <div>
            <h2>{item.description}</h2>
            <h3>{item.created}</h3>
            {(posts !== 0) ? posts.map(post => (
                <Posts key={post.id} post={post} />
            )) : <p>Loading...</p>}
            <form onSubmit={onSubmit}>
                <input type='text' name='post' placeholder='Add A Comment...' value={post} onChange={e => addPost(e.target.value)} />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default IndividualItem;