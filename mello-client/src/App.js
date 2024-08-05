import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './components/LandingPage';
import LoginPage from './components/logInPage';
import Boards from './components/Boards';
import ListsPage from './components/ListsPage';
import Footer from './components/navbars/Footer';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={LoginPage} />
        <Route path="/boards" component={Boards} />
        <Route path="/lists/:boardId" component={ListsPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
