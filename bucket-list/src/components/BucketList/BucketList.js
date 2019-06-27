import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import BucketListItem from '../BucketListItem/BucketListItem';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import FriendsList from '../FriendsList/FriendsList';

const BucketList = props => {
    const [items, setItems] = useState(0)
    const [id, setId] = useState(0)
    const [friends, setFriends] = useState(0)

    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            getUserId();
            getFriends();
        }
        return () => isSubscribed = false
    }, [])

    const getUserId = () => {
        axiosWithAuth()
        .get(`/api/user`)
        .then(res => {
            setId(res.data.user.id)
            viewItems(res.data.user.id)
        })
        .catch(err => console.log(err));
    }

    const viewItems = id => {
        if (items === 0) {
            axiosWithAuth(id)
                .get(`/api/user/${id}/items`)
                .then(res => {
                    setItems(res.data.items)
                })
                .catch(err => console.log(err))
        } else {
            return
        }
    }

    const getFriends = () => {
            axiosWithAuth()
                .get(`/api/user/friends`)
                .then(res => {
                    setFriends(res.data.friends)
                })
                .catch(err => console.log(err))
    }



    return (
        <div>
            {(items !== 0) ? items.map(item => (
                <BucketListItem key={item.id} item={item} userId={id} />
            )) : <p>Loading...</p>}

            <button><Link to='/bucket-list/add-item'>Add An Item!</Link></button>
            <button><Link to='/bucket-list/add-friend'>Add A Friend!</Link></button>
            {(friends !== 0) ? friends.map(friend => (
                <FriendsList {...props} key={friend.friend_id} friend={friend} />
            )) : <p>No Friends</p>}
        </div>
    )
}

export default BucketList;