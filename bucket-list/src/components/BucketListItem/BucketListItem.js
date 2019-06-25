import React from 'react'

const BucketListItem = props => {
    return (
        <div>
            <p>{props.item.description}</p>
        </div>
    )
}

export default BucketListItem;