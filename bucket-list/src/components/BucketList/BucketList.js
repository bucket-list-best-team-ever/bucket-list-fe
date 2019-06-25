import React, { useState, useEffect } from 'react';

import BucketListItem from '../BucketListItem/BucketListItem';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const BucketList = props => {
    const [items, setItems] = useState(0)

    useEffect(() => {
        axiosWithAuth()
            .get(`/api/user`)
            .then(res => {
                console.log(res)
                viewItems(res.data.user.id)
            })
            .catch(err => console.log(err));
    })

    const viewItems = id => {
        if (items === 0) {
            axiosWithAuth(id)
                .get(`/api/user/${id}/items`)
                .then(res => {
                    console.log(res)
                    setItems(res.data.items)
                })
                .catch(err => console.log(err))
        } else {
            return
        }
    }
    console.log(items)



    return (
        <div>
            {(items !== 0) ? items.map(item => (
                <BucketListItem key={Math.random()} item={item} />
            )) : <p>Loading...</p>}
        </div>
    )
}

export default BucketList;