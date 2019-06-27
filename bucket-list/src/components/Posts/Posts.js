import React, { useState,useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import './Posts.scss';

const Posts = props => {
    const [images, getImages] = useState(0)
    const [newImage, addNewImage] = useState('')
    const [imageId, addImageId] = useState(null)
    const [update, addUpdate] = useState('')

    console.log(props.id)

    useEffect(() => {
        viewImages();
        getImageId();
    }, [])

    const viewImages = () => {
        if (images === 0) {
            axiosWithAuth()
                .get(`/api/item/post/${props.post.id}/images`)
                .then(res => {
                    console.log(res)
                    getImages(res.data.images)
                })
                .catch(err => console.log(err))
        }
    }

    const addImages = () => {
        axiosWithAuth()
            .post(`/api/item/post/image`, { post_id: props.post.id, url: newImage })
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    const getImageId = () => {
        axiosWithAuth()
            .get(`/api/item/post/${props.post.id}/images`)
            .then(res => {
                console.log(res.data.images)
                res.data.images.map(image => {
                    addImageId(image.id)
                })
            })
            .catch(err => console.log(err))
    }

    const deleteImage = () => {
        axiosWithAuth()
            .delete(`/api/item/post/image/${imageId}`)
            .then(res => {
                console.log(res)
                addImageId(null)
            })
            .catch(err => console.log(err))
    }
    
    const deletePost = () => {
        axiosWithAuth()
            .delete(`/api/item/post/${props.post.id}`)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err));
    }

    const updatePost = () => {
        axiosWithAuth()
            .put(`/api/item/post/${props.post.id}`, { item_id: props.id, message: update})
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }


    const submitImages = e => {
        e.preventDefault();
        addImages();
        props.history.push('/bucket-list')
    }

    const onDelete = e => {
        e.preventDefault();
        deleteImage();
        props.history.push('/bucket-list')
    }

    const onDeletePost = e => {
        e.preventDefault();
        deleteImage();
        deletePost();
        props.history.push('/bucket-list')
    }

    const onUpdate = e => {
        e.preventDefault();
        updatePost();
        props.history.push('/bucket-list')
    }

    console.log(images)

    return (
        <div className='post'>
            <p className='message'>{props.post.message}</p>
            <form onSubmit={onUpdate}>
                <input type='text' name='updatePost' placeholder='Update Post...' value={update} onChange={e => addUpdate(e.target.value)} />
                <button>Update</button>
            </form>
            {(images === 0) ? <h2>No Images</h2> : images.map(image => (
                <img src={image.url} alt='' key={image.id} />
            ))}
            {(images < 1) ?
            <form onSubmit={submitImages}>
                <input type='text' name='image' placeholder='Add An Image...' value={newImage} onChange={e => addNewImage(e.target.value)} />
                <button>Submit</button>
            </form> : <button onClick={onDelete}>Delete Image</button>
            }
            <button onClick={onDeletePost}>Delete Post</button>
        </div>
    )
}

export default Posts;