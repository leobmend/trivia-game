import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ConfigurationPage from './pages/Configuration';
import LoginPage from './pages/Login';
import RankingPage from './pages/Ranking';
import TriviaPage from './pages/Trivia';
import FeedBackPage from './pages/FeedBack';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ LoginPage } />
        <Route path="/Trivia" component={ TriviaPage } />
        <Route path="/Ranking" component={ RankingPage } />
        <Route path="/Configuration" component={ ConfigurationPage } />
        <Route path="/feedback" component={ FeedBackPage } />
      </Switch>
    </div>
  );
}
