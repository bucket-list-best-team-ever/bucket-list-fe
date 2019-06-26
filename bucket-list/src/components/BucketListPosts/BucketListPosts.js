import React from 'react';

const BucketListPosts = props => {
    return (
        <div>
            <p>{props.post.message}</p>
        </div>
    )
}

export default BucketListPosts;