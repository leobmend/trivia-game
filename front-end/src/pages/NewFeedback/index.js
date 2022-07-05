import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NewHeader from '../../components/NewHeader';
import { useTokensLocalStorage } from '../../services/myHooks';
import Loading from '../Loading';

const THREE_ASSERTIONS = 3;

const NewFeedback = () => {
  const { assertions, scorePoints: score } = useSelector((state) => state.score);
  const { value: isLoading } = useSelector((state) => state.loading);

  const history = useHistory();

  useTokensLocalStorage();

  const feedback = () => {
    if (assertions < THREE_ASSERTIONS) {
      return (<h1 className="fb-h1" data-testid="feedback-text">Could be better...</h1>);
    }
    return (<h1 className="fb-h1" data-testid="feedback-text">Well Done!</h1>);
  };

  const redirectToLogin = () => {
    history.push('/lobby');
  };

  const redirectToRanking = () => {
    history.push('/newranking');
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <NewHeader />
      <main className="FeedBack">
        <section className="feedback-container">
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
        </section>
        <section className="fb-buttons-container">
          <button
            className="play-again-button"
            type="button"
            data-testid="btn-play-again"
            onClick={ redirectToLogin }
          >
            Lobby
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ redirectToRanking }
          >
            Ranking
          </button>
        </section>
      </main>
    </>
  );
};

export default NewFeedback;
