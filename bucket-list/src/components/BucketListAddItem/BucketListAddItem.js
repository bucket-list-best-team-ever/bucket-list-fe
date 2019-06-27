import React, { useState, useEffect } from 'react';

import { axiosWithAuth } from '../utils/axiosWithAuth';
import './BucketListAddItem.scss';

const BucketListAddItem = props => {
    const [item, addItem] = useState('')
    const [id, addId] = useState(0)

    useEffect(() => {
        axiosWithAuth()
            .get(`/api/user`)
            .then(res => {
                console.log(res)
                addId(res.data.user.id)
            })
            .catch(err => console.log(err));
    }, [])

    const addNewItem = () => {
        axiosWithAuth()
            .post(`/api/item`, { user_id: id, description: item })
            .then(res => {
                console.log(res)
                addItem('')
            })
            .catch(err => console.log(err))
    }

    const onSubmit = e => {
        e.preventDefault();
        addNewItem();
        props.history.push('/bucket-list')
    }


    return (
        <div className='add-item-form'>
            <h3>Add An Item to Your Bucket List!</h3>
            <form onSubmit={onSubmit}>
                <input type='text' name='item' placeholder='Add an Item!' value={item} onChange={e => addItem(e.target.value)} />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default BucketListAddItem;