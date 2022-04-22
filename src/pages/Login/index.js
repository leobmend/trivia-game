import propTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchToken, resetGame, setUser } from '../../redux/actions';
import triviaLogo from '../../images/trivia.png';
import './style.css';

const pattern = /^\w.+@\w.+[\w]$/;

class Login extends Component {
  state = {
    gravatarEmail: '',
    name: '',
  }

  componentDidMount() {
    const { dispatchResetGame } = this.props;
    dispatchResetGame();
  }

  componentDidUpdate() {
    const { token, history } = this.props;
    const isFetchedToken = Boolean(token.length);
    if (isFetchedToken) {
      history.push('/trivia');
    }
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState({
      [id]: value,
    });
  };

  handleClick = () => {
    const { dispatchSetUser, dispatchFetchToken } = this.props;
    dispatchSetUser(this.state);
    dispatchFetchToken();
  };

  handleEnterKey = (event, isDisabledButton) => {
    if (event.key === 'Enter' && !isDisabledButton) {
      this.handleClick();
    }
  };

  render() {
    const { gravatarEmail, name } = this.state;
    const isDisabledButton = !(gravatarEmail.match(pattern) && name.length);
    const { history } = this.props;

    return (
      <div className="container-form">
        <form
          action="/action_page.php"
          method="post"
          className="container-form-box"
        >
          <header className="container-form-header">
            <img src={ triviaLogo } alt="Trivia logo" className="trivia-logo" />
          </header>

          <main className="container-form-main">
            <label
              htmlFor="gravatarEmail"
              className="container-form-main-label1"
            >
              <input
                className="container-form-main-label1-input1"
                id="gravatarEmail"
                value={ gravatarEmail }
                onChange={ this.handleChange }
                onKeyDown={ (event) => this.handleEnterKey(event, isDisabledButton) }
                data-testid="input-gravatar-email"
                type="email"
                placeholder="Email do Gravatar"
                name="gravatarEmail"
                autoComplete="off"
                required
              />
            </label>

            <label htmlFor="name" className="container-form-main-label2">
              <input
                className="container-form-main-label2-input1"
                id="name"
                value={ name }
                onChange={ this.handleChange }
                onKeyDown={ (event) => this.handleEnterKey(event, isDisabledButton) }
                data-testid="input-player-name"
                type="text"
                placeholder="Nome do Jogador"
                name="name"
                autoComplete="off"
                required
              />
            </label>

            <button
              className={
                isDisabledButton
                  ? 'container-form-main-button1 disabled'
                  : 'container-form-main-button1'
              }
              id="play-Button"
              type="button"
              disabled={ isDisabledButton }
              onClick={ this.handleClick }
              data-testid="btn-play"
            >
              Jogar
            </button>

            <button
              className="container-form-main-button2"
              type="button"
              data-testid="btn-settings"
              onClick={ () => {
                history.push('/configuration');
              } }
            >
              Configurações
            </button>
          </main>
          <footer className="container-form-footer" />

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  token: propTypes.string.isRequired,
  dispatchSetUser: propTypes.func.isRequired,
  dispatchFetchToken: propTypes.func.isRequired,
  dispatchResetGame: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSetUser: (user) => dispatch(setUser(user)),
  dispatchFetchToken: () => dispatch(fetchToken()),
  dispatchResetGame: () => dispatch(resetGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
