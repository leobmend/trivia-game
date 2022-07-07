import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './style.css';

import loadingGif from '../../images/loading.gif';

import myHooks from '../../services/myHooks';
import getGravatarUrl from '../../services/gravatar';

const { useRanking } = myHooks;

const Ranking = () => {
  const {
    ranking: { topTwenty },
  } = useSelector((state) => state);

  const history = useHistory();

  useRanking();

  const renderRanking = () => (
    <>
      {topTwenty.map(({ name, maxScore, email }, index) => (
        <div className="rank-card" key={ index }>
          <img
            className="rank-img"
            src={ getGravatarUrl(email) }
            alt="imagem de perfil do jogador"
          />
          <h1 className="rank-name">
            { name }
          </h1>
          <h2 className="rank-score">
            { maxScore }
          </h2>
        </div>
      ))}
    </>
  );

  return (
    <main className="Ranking">
      <section className="title-container">
        <h1 className="ranking-title" data-testid="ranking-title">Ranking</h1>
        <button
          className="home-button"
          data-testid="btn-go-home"
          type="button"
          onClick={ () => history.push('/lobby') }
        >
          Início
        </button>
      </section>

      <section className="ranking-container">
        {!topTwenty.length
          ? (
            <img className="loading-ranking-gif" src={ loadingGif } alt="Loading gif" />
          ) : renderRanking() }
      </section>
    </main>
  );
};

export default Ranking;
