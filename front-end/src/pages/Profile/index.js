import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './style.css';

import getGravatar from '../../services/gravatar';
import {
  fetchEditUser, fetchEditPassword, setEditing } from '../../redux-test/player';
import ProfileInfoContainer from '../../components/ProfileInfoContainer';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const { info: player, editing } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (!player.userToken) {
      history.push('/login');
    }
  });

  const handleClick = () => {
    history.push('/login');
  };

  const handleEdit = () => {
    if (editing === 'user') {
      const newName = name || player.name;
      const newEmail = email || player.email;
      return dispatch(fetchEditUser(
        { id: player.id, userToken: player.userToken, name: newName, email: newEmail },
      ));
    }
    dispatch(setEditing('user'));
  };

  const handleEditPassword = async () => {
    if (editing === 'password') {
      return dispatch(fetchEditPassword(
        { id: player.id, userToken: player.userToken, password: password1 },
      ));
    }
    dispatch(setEditing('password'));
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
            src={ getGravatar(player.email) }
            alt="Gravatar profile"
          />
        </div>
        <ProfileInfoContainer
          states={ { name, email, password1, password2 } }
          currValues={ { currName: player.name, currEmail: player.email } }
          setStateFuncs={ { setName, setEmail, setPassword1, setPassword2 } }
        />
        <button
          className={ `home-button ${editing === 'user' && 'editing-btn'}` }
          data-testid="btn-go-home"
          type="button"
          disabled={ editing === 'password' }
          onClick={ handleEdit }
        >
          {`${editing === 'user' ? 'Confirm ' : ''}Edit name / e-mail`}
        </button>
        <button
          className={ `home-button ${editing === 'password' && 'editing-btn'}` }
          data-testid="btn-go-home"
          type="button"
          disabled={
            editing === 'user' || (editing === 'password' && password1 !== password2)
          }
          onClick={ handleEditPassword }
        >
          {`${editing === 'password' ? 'Confirm ' : ''}Change password`}
        </button>
      </section>
    </main>
  );
};

export default Profile;
