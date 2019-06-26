import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const FriendsList = props => {
    const [friendId, addFriendId] = useState(null)

    useEffect(() => {
        getFriendId()
    }, [])

    const getFriendId = () => {
        axiosWithAuth()
            .get(`/api/users`)
            .then(res => {
                console.log(res)
                let newFriend = res.data.users.filter(user => user.email === props.friend.email)
                console.log(newFriend)
                addFriendId(newFriend[0].id)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <p>{props.friend.name}</p>
            <p>{friendId}</p>
        </div>
    )
}

export default FriendsList;