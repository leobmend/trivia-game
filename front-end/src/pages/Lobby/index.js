import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import triviaLogo from '../../images/trivia.png';
import { useTokensLocalStorage } from '../../services/myHooks';
import Loading from '../Loading';

import './style.css';

const Lobby = () => {
  const { value: isLoading } = useSelector((state) => state.loading);

  const history = useHistory();

  useTokensLocalStorage();

  if (isLoading) return <Loading />;

  return (
    <main className="Lobby">
      <div className="container-logo-lobby">
        <img src={ triviaLogo } alt="Trivia logo" className="logo-lobby" />
      </div>

      <div className="container-buttons">
        <div className="box-buttons">
          <div className="container-play-button">
            <button
              className="configs-button"
              type="button"
              onClick={ () => { history.push('/newtrivia'); } }
            >
              Play
            </button>
            <select>
              <option>Hard</option>
              <option>Medium</option>
              <option>Easy</option>
            </select>
          </div>
          <button
            className="configs-button"
            type="button"
            onClick={ () => { history.push('/profile'); } }
          >
            Profile
          </button>
          <button
            className="ranking-button"
            type="button"
            onClick={ () => { history.push('/ranking'); } }
          >
            Ranking
          </button>
          <button
            className="profile-button"
            type="button"
            onClick={ () => { history.push('/settings'); } }
          >
            Settings
          </button>
        </div>
      </div>
    </main>
  );
};

export default Lobby;
