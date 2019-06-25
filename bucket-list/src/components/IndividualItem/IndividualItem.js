import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const IndividualItem = props => {
    const [item, setItem] = useState(0)

    useEffect(() => {
        viewItem()
    })

    const viewItem = () => {
        const id = props.match.params.id
        if (item === 0) {
            axiosWithAuth(id)
                .get(`/api/item/${id}`)
                .then(res => {
                    console.log(res)
                    setItem(res.data.item)
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div>
            {item.description}
        </div>
    )
}

export default IndividualItem;