import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const BucketListPosts = props => {
    const [images, getImages] = useState(null)

    useEffect(() => {
        viewImages();
    }, [])

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

    return (
        <div>
            <p>{props.post.message}</p>
            {(images === null) ? <h2>No Images</h2> : images.map(image => (
                <img src={image.url} alt='' key={image.id} />
            ))}
        </div>
    )
}

export default BucketListPosts;