import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './components/landing';
import Login from './components/logInPage';
import Signup from './components/signUpPage';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
