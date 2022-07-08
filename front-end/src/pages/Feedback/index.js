import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './style.css';

const THREE_ASSERTIONS = 3;

const Feedback = () => {
  const { assertions, scorePoints: score } = useSelector((state) => state.score);

  const history = useHistory();

  const feedback = () => {
    if (assertions < THREE_ASSERTIONS) {
      return (<h1 className="fb-h1" data-testid="feedback-text">Could be better...</h1>);
    }
    return (<h1 className="fb-h1" data-testid="feedback-text">Well Done!</h1>);
  };

  return (
    <main className="Feedback">
      <section className="feedback-container">
        <div className="feedback-box">
          <div className="feedback-text-container">
            {feedback()}
            <h2 className="fb-h2">
              Voce acertou
              <span data-testid="feedback-total-question">{` ${assertions} `}</span>
              questões!
            </h2>
            <h2 className="fb-h2">
              Um total de
              <span data-testid="feedback-total-score">{` ${score} `}</span>
              pontos.
            </h2>
          </div>
          <div className="fb-buttons-container">
            <button
              className="play-again-button"
              type="button"
              data-testid="btn-play-again"
              onClick={ () => history.push('/lobby') }
            >
              Lobby
            </button>
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ () => history.push('/ranking') }
            >
              Ranking
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Feedback;
