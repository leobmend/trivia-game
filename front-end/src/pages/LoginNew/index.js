import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import triviaLogo from '../../images/trivia.png';
import './style.css';

import { fetchLogin, fetchSignUp } from '../../redux-test/player';
import { setLocalStorage } from '../../services/localStorage';
import useTokensLocalStorage from '../../services/myHooks';
import Loading from '../Loading';

const pattern = /^\w.+@\w.+[\w]$/;

const LoginNew = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  const { userToken, name } = useSelector((state) => state.player.info);
  const { token } = useSelector((state) => state.trivia);
  const { value: isLoading } = useSelector((state) => state.loading);

  const dispatch = useDispatch();
  const history = useHistory();

  useTokensLocalStorage();

  useEffect(() => {
    if (userToken && token) {
      history.push('/lobby');
    }
  }, [userToken, token, history, name]);

  const isDisabledButton = !(email.match(pattern) && password.length);

  const handleLogin = async () => {
    dispatch(fetchLogin({ setLocalStorage, email, password }));
  };

  const handleEnterKey = (event) => {
    if (event.key === 'Enter' && !isDisabledButton) handleLogin();
  };

  const handleSignUp = () => {
    if (isSigningUp) {
      dispatch(fetchSignUp({ setLocalStorage, email, password }));
    } else {
      setIsSigningUp(true);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container-form">
      <form
        action="/action_page.php"
        method="post"
        className="container-form-box"
      >
        <img src={ triviaLogo } alt="Trivia logo" className="logo-login" />

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
            onClick={ handleSignUp }
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
