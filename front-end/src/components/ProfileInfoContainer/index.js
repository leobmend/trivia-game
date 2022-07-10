import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import loadingGif from '../../images/loading.gif';
import './style.css';

const LOADING = 'Loading...';

const ProfileInfoContainer = ({
  states: { name, email, password1, password2 },
  currValues: { currName, currEmail },
  setStateFuncs: { setName, setEmail, setPassword1, setPassword2 },
}) => {
  const { loading: isLoading, editing } = useSelector((state) => state.player);

  if (isLoading) {
    return (
      <div className="loading-container">
        <img
          className="loading-gif"
          src={ loadingGif }
          alt="Loading gif"
        />
      </div>
    );
  }

  if (editing === 'password') {
    return (
      <div className="info-container password-container">
        <input
          type="text"
          className="edit-password"
          value={ isLoading ? LOADING : password1 }
          placeholder="Password"
          onChange={ ({ target }) => setPassword1(target.value) }
        />
        <input
          type="text"
          className="edit-password"
          value={ isLoading ? LOADING : password2 }
          placeholder="Confirm Password"
          onChange={ ({ target }) => setPassword2(target.value) }
        />
      </div>
    );
  }

  return (
    <>
      <div className="info-container">
        <h2>Name</h2>
        {editing === 'user'
          ? (
            <input
              type="text"
              className="edit-input"
              value={ name }
              placeholder={ currName }
              onChange={ ({ target }) => setName(target.value) }
            />)
          : <p>{isLoading ? LOADING : currName}</p>}
      </div>
      <div className="info-container">
        <h2>E-mail</h2>
        {editing === 'user'
          ? (
            <input
              type="text"
              className="edit-input"
              value={ email }
              placeholder={ currEmail }
              onChange={ ({ target }) => setEmail(target.value) }
            />)
          : <p>{isLoading ? LOADING : currEmail}</p>}
      </div>
    </>
  );
};

ProfileInfoContainer.propTypes = {
  states: PropTypes.objectOf(PropTypes.string).isRequired,
  currValues: PropTypes.objectOf(PropTypes.string).isRequired,
  setStateFuncs: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default ProfileInfoContainer;
