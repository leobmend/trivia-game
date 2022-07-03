import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const ProfileInfoContainer = ({
  states: { name, email, password1, password2 },
  currValues: { currName, currEmail },
  setStateFuncs: { setName, setEmail, setPassword1, setPassword2 },
  switchers: { isEditing, isPasswordEditing, isLoading },
}) => (
  isPasswordEditing
    ? (
      <div className="info-container password-container">
        <input
          type="text"
          className="edit-input edit-password"
          value={ password1 }
          placeholder="Password"
          onChange={ ({ target }) => setPassword1(target.value) }
        />
        <input
          type="text"
          className="edit-input edit-password"
          value={ password2 }
          placeholder="Confirm Password"
          onChange={ ({ target }) => setPassword2(target.value) }
        />
      </div>
    ) : (
      <>
        <div className="info-container">
          <h2>Name</h2>
          {isEditing
            ? (
              <input
                type="text"
                className="edit-input"
                value={ name }
                placeholder={ currName }
                onChange={ ({ target }) => setName(target.value) }
              />)
            : <p>{isLoading ? 'Loading...' : currName}</p>}
        </div>
        <div className="info-container">
          <h2>E-mail</h2>
          {isEditing
            ? (
              <input
                type="text"
                className="edit-input"
                value={ email }
                placeholder={ currEmail }
                onChange={ ({ target }) => setEmail(target.value) }
              />)
            : <p>{isLoading ? 'Loading...' : currEmail}</p>}
        </div>
      </>
    )
);

ProfileInfoContainer.propTypes = {
  states: PropTypes.objectOf(PropTypes.string).isRequired,
  currValues: PropTypes.objectOf(PropTypes.string).isRequired,
  setStateFuncs: PropTypes.objectOf(PropTypes.func).isRequired,
  switchers: PropTypes.objectOf(PropTypes.bool).isRequired,
};

export default ProfileInfoContainer;
