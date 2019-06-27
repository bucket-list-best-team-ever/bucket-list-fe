import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import BucketListItem from '../BucketListItem/BucketListItem';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import FriendsList from '../FriendsList/FriendsList';

import './BucketList.scss';

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
            <div className='list-buttons'>
                <Link to='/bucket-list/add-item'><button className='add-item-button'>Add An Item!</button></Link>
                <Link to='/bucket-list/add-friend'><button className='add-friend-button'>Manage Friends!</button></Link>
            </div>
            <div className='list'>
                {(items !== 0) ? items.map(item => (
                    <BucketListItem key={item.id} item={item} userId={id} />
                )) : <p>Loading...</p>}
            </div>

            {(friends !== 0) ? friends.map(friend => (
                <FriendsList {...props} key={friend.friend_id} friend={friend} />
            )) : <p className='no-friends'>No Friends</p>}
        </div>
    )
}

export default BucketList;