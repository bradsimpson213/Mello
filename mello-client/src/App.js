import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './components/LandingPage';
import Login from './components/LogInPage';
import BoardsPage from './components/BoardsPage';
import ListsPage from './components/ListsPage';
import Footer from './components/navbars/Footer';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/boards" component={BoardsPage} />
        <Route path="/lists/:boardId" component={ListsPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
