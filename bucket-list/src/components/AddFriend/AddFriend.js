import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const AddFriend = props => {
    const [friendId, addFriendId] = useState(null)
    const [friendEmail, addFriendEmail] = useState('')
    const [friendName, addFriendName] = useState(null)

    const getFriendId = () => {
        axiosWithAuth()
            .get(`/api/users`)
            .then(res => {
                console.log(res)
                let newFriend = res.data.users.filter(user => user.email === friendEmail)
                console.log(newFriend)
                addFriendId(newFriend[0].id)
                addFriendName(newFriend[0].name)
            })
            .catch(err => console.log(err))
    }

    const createNewFriend = () => {
        axiosWithAuth()
            .post(`/api/user/friends/${friendId}`)
            .then(res => {
                console.log(res)
                addFriendId(null)
            })
            .catch(err => console.log(err))
    }

    console.log(friendId)
    
    const findFriend = e => {
        e.preventDefault()
        getFriendId()
        addFriendEmail('')
    }

    const addFriend = e => {
        e.preventDefault();
        createNewFriend();
        addFriendId(null)
        addFriendName(null)
        props.history.push('/bucket-list')
    }



    return (
        <div>
            <form onSubmit={findFriend}>
                <input type='text' name='email' value={friendEmail} onChange={e => addFriendEmail(e.target.value)} />
                <button>Find Friend</button>
            </form>
            {(friendName === null) ? <h2>Search For Friends!</h2> : <h2>{friendName}</h2>}
            {(friendName === null) ? null : <button onClick={addFriend}>Add Friend!</button>}
        </div>
    )
}

export default AddFriend;