import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './components/landing';
import Login from './components/logInPage';
import Signup from './components/signUpPage';
import Boards from './components/boards';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/boards" component={Boards} />
      </Switch>
    </div>
  );
}

export default App;
