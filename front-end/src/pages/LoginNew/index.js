import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import triviaLogo from '../../images/trivia.png';
import { fetchLogin, fetchSignUp } from '../../redux-test/player';
import './style.css';

const pattern = /^\w.+@\w.+[\w]$/;

const LoginNew = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);
  const history = useHistory();

  useEffect(() => {
    if (player.info.userToken) {
      if (player.info.name === 'Player') history.push('/profile');
      else history.push('/ranking');
    }
  });

  const isDisabledButton = !(email.match(pattern) && password.length);

  const handleLogin = async () => {
    dispatch(fetchLogin({ email, password }));
  };

  const handleEnterKey = (event) => {
    if (event.key === 'Enter' && !isDisabledButton) {
      handleLogin();
    }
  };

  const handleSignUp = () => {
    dispatch(fetchSignUp({ email, password }));
  };

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
          <label htmlFor="email" className="login-label">
            <input
              className="login-input"
              id="email"
              value={ email }
              onChange={ ({ target }) => setEmail(target.value) }
              onKeyDown={ (event) => handleEnterKey(event) }
              type="email"
              placeholder="Email"
              name="email"
              autoComplete="off"
              required
            />
          </label>

          <label htmlFor="password" className="login-label">
            <input
              className="login-input"
              id="password"
              value={ password }
              onChange={ ({ target }) => setPassword(target.value) }
              onKeyDown={ (event) => handleEnterKey(event) }
              type="text"
              placeholder="Password"
              name="password"
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
            onClick={ handleLogin }
          >
            Login
          </button>

          <button
            className="container-form-main-button2"
            type="button"
            onClick={ () => {
              if (isSigningUp) {
                handleSignUp();
              } else {
                setIsSigningUp(true);
              }
            } }
          >
            {isSigningUp ? 'Confirm Sign Up' : 'Sign Up'}
          </button>
        </main>
        <footer className="container-form-footer" />

      </form>
    </div>
  );
};

export default LoginNew;
