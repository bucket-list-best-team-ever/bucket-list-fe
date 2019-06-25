import React, { useState,useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Posts = props => {
    const [images, getImages] = useState(null)

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

    console.log(images)

    return (
        <div>
            {(images === null) ? <h2>No Images</h2> : images.map(image => (
                <img src={image.url} alt='' key={image.id} />
            ))}
            <p>{props.post.message}</p>
        </div>
    )
}

export default Posts;