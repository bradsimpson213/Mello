import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './components/LandingPage';
import Login from './components/Login';
import Boards from './components/Boards';
import ListPage from './components/ListPage';
import Footer from './components/navbars/Footer';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/boards" component={Boards} />
        <Route path="/lists/:boardId" component={ListPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
