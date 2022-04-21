import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import getGravatarUrl from '../../services/gravatar';
import './style.css';

class Header extends React.Component {
  state = {
    isModalVisible: false,
  }

  render() {
    const { name, score, gravatarEmail } = this.props;
    const { isModalVisible } = this.state;

    return (
      <header className="Header">
        <div>
          <img
            className="player-img"
            src={ getGravatarUrl(gravatarEmail) }
            alt="Imagem de perfil"
            data-testid="header-profile-picture"
          />
          <div className={ isModalVisible ? 'modal-on' : 'modal-off' }>
            <button className="close-modal-btn" type="button">X</button>
            <p>Alou</p>
          </div>
        </div>

        <h1
          className="player-name"
          data-testid="header-player-name"
        >
          { name }
        </h1>

        <p
          className="player-score"
        >
          Pontuação atual:
          <span data-testid="header-score">{` ${score}`}</span>
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps, null)(Header);
