import React, { useEffect, useState } from 'react';
import usersAPI from '../../services/usersAPI';

import './style.css';

const Ranking = () => {
  // const [isRankingFetching, setIsRankingFetching] = useState(false);
  // const [ranking, setRanking] = useState();

  // useEffect(() => {
  //   const fetchRanking = () => {
  //     usersAPI
  //   }

  //   if (!ranking.length) {

  //   }
  // }, [ranking]);
  const ranking = [
    { name: 'Teste 1', score: 100, picture: '' },
    { name: 'Teste 2', score: 100, picture: '' },
  ];

  console.log();
  return (
    <main className="Ranking">
      <section className="title-container">
        <h1 className="ranking-title" data-testid="ranking-title">Ranking</h1>
        <button
          className="home-button"
          data-testid="btn-go-home"
          type="button"
        // onClick={ this.handleClick }
        >
          Início
        </button>
      </section>
      <section className="ranking-container">
        {ranking.map(({ name, score, picture }, index) => (
          <div className="rank-card" key={ index }>
            <img className="rank-img" src={ picture } alt="imagem de perfil do jogador" />
            <h1 className="rank-name" data-testid={ `player-name-${index}` }>
              { name }
            </h1>
            <h2 className="rank-score" data-testid={ `player-score-${index}` }>
              { score }
            </h2>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Ranking;
