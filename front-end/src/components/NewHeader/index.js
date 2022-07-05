import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import getGravatarUrl from '../../services/gravatar';

const NewHeader = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { info: player } = useSelector((state) => state.player);
  const { scorePoints } = useSelector((state) => state.score);

  return (
    <header className="Header">
      <div
        onClick={ () => setIsModalVisible(!isModalVisible) }
        onKeyDown={ () => {} }
        role="button"
        tabIndex={ 0 }
      >
        <img
          className="player-img"
          src={ getGravatarUrl(player.email) }
          alt="Imagem de perfil"
        />
        <div className={ isModalVisible ? 'modal-on' : 'modal-off' }>
          <button
            className="close-modal-btn"
            onClick={ () => setIsModalVisible(!isModalVisible) }
            type="button"
            disabled={ !isModalVisible }
          >
            X
          </button>
          <div className="modal-text-container">
            <a
              href="https://br.gravatar.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="modal-title"
            >
              Gravatar
            </a>
            <p className="modal-p">
              Cadastre seu email na plataforma para exibir sua foto enquanto joga!
            </p>
          </div>
        </div>
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

export default NewHeader;
