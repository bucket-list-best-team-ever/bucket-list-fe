import React, { useState, useEffect } from 'react';

import { axiosWithAuth } from '../utils/axiosWithAuth';

const AddFriendListItem = props => {
    const [item, addItem] = useState('')
    const [id, addId] = useState(0)

    useEffect(() => {
        addId(props.id)
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
        props.history.push('/thank-you');
    }


    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type='text' name='item' placeholder='Add an Item!' value={item} onChange={e => addItem(e.target.value)} />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default AddFriendListItem;