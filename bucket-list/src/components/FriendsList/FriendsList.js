import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import BucketListItem from '../BucketListItem/BucketListItem';
import FriendsBucketList from '../FriendsBucketList/FriendsBucketList';
import AddFriendListItem from '../AddFriendListItem/AddFriendListItem';

const FriendsList = props => {
    const [friendsList, updateFriendsList] = useState(0)
    const [friendId, updateFriendId] = useState(null)

    useEffect(() => {
        getFriendId();
    }, [])

    const getFriendId = () => {
        axiosWithAuth()
            .get(`/api/users`)
            .then(res => {
                let newFriend = res.data.users.filter(user => user.email === props.friend.email)
                getFriendsList(newFriend[0].id)
                updateFriendId(newFriend[0].id)
            })
            .catch(err => console.log(err))
        }
        
    const getFriendsList = id => {
            axiosWithAuth()
            .get(`/api/user/${id}/items`)
            .then(res => {
                updateFriendsList(res.data.items)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <p>{props.friend.name}</p>
            {(friendsList !== 0) ? friendsList.map(item => (
                <FriendsBucketList key={item.id} item={item} userId={item.id} />
            )) : <p>Loading...</p>}
            {(friendId === null) ? null : <AddFriendListItem {...props} id={friendId} />}
        </div>
    )
}

export default FriendsList;