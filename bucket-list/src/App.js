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


function App() {

  return (
    <div className="App">
      <div>
        <header>
          <h1>Bucket List!</h1>
          <Link to='/bucket-list'>Home</Link>
        </header>
      </div>
        <Route exact path='/' component={Login} />
        <Route path='/sign-up' component={SignUp} />
        <PrivateRoute exact path='/bucket-list' component={BucketList} />
        <PrivateRoute path='/bucket-list/item/:id' component={IndividualItem} />
        <PrivateRoute path='/bucket-list/add-item' component={BucketListAddItem} />
        <PrivateRoute path='/bucket-list/add-friend' component={AddFriend} />
    </div>
  );
}

export default App;
