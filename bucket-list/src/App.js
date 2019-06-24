import React from 'react';
import './App.scss';
import { Route } from 'react-router-dom';

import PrivateRoute from './components/utils/PrivateRoute';
import Login from './components/Login/Login';
import BucketList from './components/BucketList/BucketList';
import SignUp from './components/SignUp/SignUp';

function App() {
  return (
    <div className="App">
      <div>
        <header>
          <h1>Bucket List!</h1>
        </header>
      </div>
      <Route exact path='/' component={Login} />
      <Route path='/sign-up' component={SignUp} />
      <PrivateRoute path='/bucket-list' component={BucketList} />
    </div>
  );
}

export default App;
