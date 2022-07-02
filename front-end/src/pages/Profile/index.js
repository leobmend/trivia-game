import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './style.css';

import getGravatar from '../../services/gravatar';
import { fetchEditUser } from '../../redux-test/player';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const player = useSelector((state) => state.player.info);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };

  const handleEdit = () => {
    const newName = name || player.name;
    const newEmail = email || player.email;
    dispatch(fetchEditUser(
      { id: player.id, userToken: player.userToken, name: newName, email: newEmail },
    ));
  };

  const renderInput = (current, state, setFunc) => (
    <input
      type="text"
      className="edit-input"
      value={ state }
      placeholder={ current }
      onChange={ ({ target }) => setFunc(target.value) }
    />
  );

  return (
    <main className="Profile">
      <section className="title-container">
        <h1 className="profile-title" data-testid="ranking-title">Profile</h1>
        <button
          className="home-button"
          data-testid="btn-go-home"
          type="button"
          onClick={ handleClick }
        >
          Início
        </button>
      </section>
      <section className="profile-container">
        <div className="gravatar-container">
          <h2>
            Gravatar
            <a
              href="https://br.gravatar.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="gravatar-anchor"
            >
              ?
            </a>
          </h2>
          <img
            className="profile-player-img"
            src={ getGravatar('') }
            alt="Gravatar profile"
          />
        </div>
        <div className="info-container">
          <h2>Name</h2>
          {
            isEditing
              ? renderInput(player.name, name, setName)
              : <p>{ player.name }</p>
          }
        </div>
        <div className="info-container">
          <h2>E-mail</h2>
          {
            isEditing
              ? renderInput(player.email, email, setEmail)
              : <p>{ player.email }</p>
          }
        </div>
        <button
          className={ `home-button ${isEditing && 'editing'}` }
          data-testid="btn-go-home"
          type="button"
          onClick={ () => {
            if (isEditing) handleEdit();
            else setIsEditing(!isEditing);
          } }
        >
          {`${isEditing ? 'Confirm ' : ''}Edit name / e-mail`}
        </button>
        <button
          className="home-button"
          data-testid="btn-go-home"
          type="button"
          onClick={ () => {} }
        >
          Change password
        </button>
      </section>
    </main>
  );
};

export default Profile;
