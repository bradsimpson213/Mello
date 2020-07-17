import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './components/landing';
import Login from './components/logInPage';
import Signup from './components/signUpPage';
import BoardsPage from './components/boardsPage';
import ListsPage from './components/listsPage'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/boards" component={BoardsPage} />
        <Route path="/lists" component={ListsPage} />
      </Switch>
    </div>
  );
}

export default App;
