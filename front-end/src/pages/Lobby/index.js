import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './style.css';

import triviaLogo from '../../images/trivia.png';
import { resetScore } from '../../redux/score';
import { fetchQuestions } from '../../redux/trivia';
import { getQuestionsBody } from '../../services/myHooks';

const Lobby = () => {
  const {
    trivia: { token, categories, questions, responseCode, loading: isFetchingQuestions },
    score: { scorePoints },
    settings,
  } = useSelector((state) => state);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (scorePoints) dispatch(resetScore());
    if (responseCode) {
      history.push('/settings');
    } else if (!questions.length && !isFetchingQuestions) {
      dispatch(fetchQuestions(getQuestionsBody(token, settings, categories)));
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
              disabled={ isFetchingQuestions }
              onClick={ () => { history.push('/trivia'); } }
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
