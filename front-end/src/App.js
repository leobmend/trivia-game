import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ConfigurationPage from './pages/Configuration';
import LoginPage from './pages/Login';
import RankingPage from './pages/Ranking';
import TriviaPage from './pages/Trivia';
import FeedBackPage from './pages/FeedBack';
import ProfilePage from './pages/Profile';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ LoginPage } />
        <Route path="/profile" component={ ProfilePage } />
        <Route path="/trivia" component={ TriviaPage } />
        <Route path="/ranking" component={ RankingPage } />
        <Route path="/configuration" component={ ConfigurationPage } />
        <Route path="/feedback" component={ FeedBackPage } />
      </Switch>
    </div>
  );
}
