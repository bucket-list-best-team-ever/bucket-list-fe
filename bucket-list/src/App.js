import React from 'react';
import './App.scss';
import { Route, Link } from 'react-router-dom';

import PrivateRoute from './components/utils/PrivateRoute';
import Login from './components/Login/Login';
import BucketList from './components/BucketList/BucketList';
import IndividualItem from './components/IndividualItem/IndividualItem';
import SignUp from './components/SignUp/SignUp';
import BucketListAddItem from './components/BucketListAddItem/BucketListAddItem';
import AddFriend from './components/AddFriend/AddFriend';
import FriendsBucketList from './components/FriendsBucketList/FriendsBucketList';
import ThankYou from './components/ThankYou/ThankYou';
import FriendIndividualItem from './components/FriendIndividualItem/FriendIndividualItem';


function App(props) {

  const logOut = () => {
    localStorage.removeItem('token');
    props.history.push('/');
  }

  return (
    <div className="App">
      <div>
        <header>
          <h1>Bucket List!</h1>
          <div className='links'>
            <Link to='/bucket-list'><h2>Home</h2></Link>
            <button onClick={logOut}>Logout</button>
          </div>
        </header>
      </div>
        <Route exact path='/' component={Login} />
        <Route path='/sign-up' component={SignUp} />
        <PrivateRoute path='/thank-you' component={ThankYou} />
        <PrivateRoute exact path='/bucket-list' component={BucketList} />
        <PrivateRoute path='/bucket-list/item/:id' component={IndividualItem} />
        <PrivateRoute path='/bucket-list/friend/item/:id' component={FriendIndividualItem} />
        <PrivateRoute path='/bucket-list/add-item' component={BucketListAddItem} />
        <PrivateRoute path='/bucket-list/add-friend' component={AddFriend} />
        <PrivateRoute path='/bucket-list/friend/bucket-list' component={FriendsBucketList} />
    </div>
  );
}

export default App;
