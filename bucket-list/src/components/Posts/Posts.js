import React, { useState,useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Posts = props => {
    const [images, getImages] = useState(null)
    const [newImage, addNewImage] = useState('')

    useEffect(() => {
        viewImages();
    })

    const viewImages = () => {
        if (images === null) {
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

    const submitImages = e => {
        e.preventDefault();
        addImages();
        props.history.push('/bucket-list')
    }

    console.log(images)

    return (
        <div>
            <p>{props.post.message}</p>
            {(images === null) ? <h2>No Images</h2> : images.map(image => (
                <img src={image.url} alt='' key={image.id} />
            ))}
            <form onSubmit={submitImages}>
                <input type='text' name='image' placeholder='Add An Image...' value={newImage} onChange={e => addNewImage(e.target.value)} />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Posts;