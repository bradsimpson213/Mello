import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './components/LandingPage';
import Login from './components/LogInPage';
import Signup from './components/signUpPage';
import BoardsPage from './components/BoardsPage';
import ListsPage from './components/ListsPage'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/boards" component={BoardsPage} />
        <Route path="/lists/:boardId" component={ListsPage} />
      </Switch>
    </div>
  );
}

export default App;
