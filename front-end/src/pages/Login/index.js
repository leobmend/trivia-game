import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import triviaLogo from '../../images/trivia.png';
import loadingGif from '../../images/loading.gif';
import './style.css';

import { fetchLogin, fetchSignUp } from '../../redux/player';
import { setLocalStorage } from '../../services/localStorage';

const pattern = /^\w.+@\w.+[\w]$/;

const getBtnClassName = (isDisabledButton, isSigningUp, type) => {
  const DISABLED_BTN = ' disabled-btn';
  if (type === 'login') {
    return 'login-button'
      + `${isDisabledButton ? DISABLED_BTN : ''}`
      + `${isSigningUp ? DISABLED_BTN : ''}`;
  }
  if (type === 'signup') {
    return 'login-button'
      + `${isSigningUp && isDisabledButton ? DISABLED_BTN : ''}`;
  }
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  const {
    info: { userToken }, loading: isUserLoading,
  } = useSelector((state) => state.player);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (userToken) {
      history.push('/lobby');
    }
  }, [userToken, history]);

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

  return (
    <div className="Login">
      {/* <div className="login-modal">

      </div> */}

      <form className="login-box">
        <img src={ triviaLogo } alt="Trivia logo" className="login-logo" />

        <main className="login-container">
          {!isUserLoading
            ? (
              <>
                <label htmlFor="email" className="login-label">
                  <input
                    className="login-input"
                    id="email"
                    value={ email }
                    onChange={ ({ target }) => setEmail(target.value) }
                    onKeyDown={ (event) => handleEnterKey(event) }
                    type="email"
                    placeholder="Email"
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
                    type="password"
                    placeholder="Password"
                    autoComplete="off"
                    required
                  />
                </label>
              </>
            ) : (
              <div className="login-loading-container">
                <img
                  className="login-loading-gif"
                  src={ loadingGif }
                  alt="Loading gif"
                />
              </div>
            )}
          <button
            className={ getBtnClassName(isDisabledButton, isSigningUp, 'login') }
            id="play-Button"
            type="button"
            disabled={ isDisabledButton || isSigningUp }
            onClick={ handleLogin }
          >
            Login
          </button>

          <button
            className={ getBtnClassName(isDisabledButton, isSigningUp, 'signup') }
            type="button"
            disabled={ isSigningUp && isDisabledButton }
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

export default Login;
