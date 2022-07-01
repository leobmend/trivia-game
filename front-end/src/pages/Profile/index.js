import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import getGravatar from '../../services/gravatar';
import './style.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const history = useHistory();

  const handleClick = () => {
    history.push('/');
  };

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
              ? <input type="text" className="edit-input" />
              : <p>Jogador</p>
          }
        </div>
        <div className="info-container">
          <h2>E-mail</h2>
          {
            isEditing
              ? <input type="text" className="edit-input" />
              : <p>jogador@email.com</p>
          }
        </div>
        <button
          className="home-button"
          data-testid="btn-go-home"
          type="button"
          onClick={ () => setIsEditing(!isEditing) }
        >
          Edit name / e-mail
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
