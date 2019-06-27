import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

import BucketListItem from '../BucketListItem/BucketListItem';
import FriendsBucketList from '../FriendsBucketList/FriendsBucketList';
import AddFriendListItem from '../AddFriendListItem/AddFriendListItem';

import './FriendsList.scss';

const FriendsList = props => {
    const [friendsList, updateFriendsList] = useState(0)
    const [friendId, updateFriendId] = useState(null)

    useEffect(() => {
        getFriendId();
    }, [])
    console.log(props.friend)

    const getFriendId = () => {
        axiosWithAuth()
            .get(`/api/users`)
            .then(res => {
                console.log(res)
                console.log(props.friend.email)
                let newFriend = res.data.users.filter(user => user.email === props.friend.email)
                console.log(newFriend)
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
            <p className='friend-name'>{`${props.friend.name}'s Bucket List`}</p>
            <div className='friend-list'>
                {(friendsList !== 0) ? friendsList.map(item => (
                    <FriendsBucketList key={item.id} item={item} userId={item.id} />
                )) : <p>Loading...</p>}
            </div>
            {(friendId === null) ? null : <AddFriendListItem {...props} id={friendId} />}
        </div>
    )
}

export default FriendsList;