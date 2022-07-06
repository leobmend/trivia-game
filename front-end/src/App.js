import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';

import Loading from './pages/Loading';
import LoginPage from './pages/Login';
import LobbyPage from './pages/Lobby';
import ProfilePage from './pages/Profile';
import SettingsPage from './pages/Settings';
import TriviaPage from './pages/Trivia';
import FeedbackPage from './pages/Feedback';
import RankingPage from './pages/Ranking';

export default function App() {
  const { value: isLoading } = useSelector((state) => state.loading);

  if (isLoading) return <Loading />;

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ LoginPage } />
        <Route path="/lobby" component={ LobbyPage } />
        <Route path="/profile" component={ ProfilePage } />
        <Route path="/settings" component={ SettingsPage } />
        <Route path="/trivia" component={ TriviaPage } />
        <Route path="/feedback" component={ FeedbackPage } />
        <Route path="/ranking" component={ RankingPage } />
      </Switch>
    </div>
  );
}
