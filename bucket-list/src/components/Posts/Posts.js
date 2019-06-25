import React from 'react';

const Posts = props => {
    return (
        <div>
            <p>{props.post.message}</p>
        </div>
    )
}

export default Posts;