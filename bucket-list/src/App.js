import React from 'react';
import './App.scss';
import { Route } from 'react-router-dom';

import PrivateRoute from './utils/PrivateRoute';
import Login from './components/Login/Login';
import BucketList from './components/BucketList/BucketList';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Login} />
      <PrivateRoute path='/bucket-list' component={BucketList} />
    </div>
  );
}

export default App;
