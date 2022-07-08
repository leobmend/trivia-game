import React from 'react';
import { useSelector } from 'react-redux';

import './style.css';

import getGravatarUrl from '../../services/gravatar';

const Header = () => {
  const { info: player } = useSelector((state) => state.player);
  const { scorePoints } = useSelector((state) => state.score);

  return (
    <header className="Header">
      <div className="player-img-container">
        <img
          className="player-img"
          src={ getGravatarUrl(player.email) }
          alt="Imagem de perfil"
        />
      </div>

      <h1
        className="player-name"
        data-testid="header-player-name"
      >
        { player.name }
      </h1>

      <p
        className="player-score"
      >
        Pontuação atual:
        <span data-testid="header-score">{` ${scorePoints}`}</span>
      </p>
    </header>
  );
};

export default Header;
