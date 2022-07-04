import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import triviaLogo from '../../images/trivia.png';
import { fetchToken } from '../../redux-test/trivia';
import { useTokensLocalStorage } from '../../services/localStorage';

import './style.css';

const Lobby = () => {
  const { token } = useSelector((state) => state.trivia);
  const { info: { userToken }, loading } = useSelector((state) => state.player);

  const dispatch = useDispatch();
  const history = useHistory();

  useTokensLocalStorage();

  useEffect(() => {
    if (!userToken && !loading) {
      history.push('/login');
    } else if (!token) {
      dispatch(fetchToken());
    }
  });

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
              onClick={ () => {} }
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
