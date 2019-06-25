import React from 'react'
import { Link } from 'react-router-dom';

const BucketListItem = props => {
    const id = props.item.id;
    return (
        <div>
            <h2>{props.item.description}</h2>
            <h3>{props.item.created}</h3>
            <button><Link to={`/bucket-list/item/${id}`}>About</Link></button>
        </div>
    )
}

export default BucketListItem;