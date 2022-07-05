import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ConfigurationPage from './pages/Configuration';
import LoginPage from './pages/Login';
import RankingPage from './pages/Ranking';
import TriviaPage from './pages/Trivia';
import FeedBackPage from './pages/FeedBack';
import ProfilePage from './pages/Profile';
import LoginNewPage from './pages/LoginNew';
import LobbyPage from './pages/Lobby';
import NewTriviaPage from './pages/NewTrivia';
import NewFeedbackPage from './pages/NewFeedback';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ LoginPage } />
        <Route path="/login" component={ LoginNewPage } />
        <Route path="/lobby" component={ LobbyPage } />
        <Route path="/profile" component={ ProfilePage } />
        <Route path="/trivia" component={ TriviaPage } />
        <Route path="/newtrivia" component={ NewTriviaPage } />
        <Route path="/ranking" component={ RankingPage } />
        <Route path="/settings" component={ ConfigurationPage } />
        <Route path="/feedback" component={ FeedBackPage } />
        <Route path="/newfeedback" component={ NewFeedbackPage } />
      </Switch>
    </div>
  );
}
