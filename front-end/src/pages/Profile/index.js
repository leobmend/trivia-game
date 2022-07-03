import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './style.css';

import getGravatar from '../../services/gravatar';
import { fetchEditUser } from '../../redux-test/player';
import ProfileInfoContainer from '../../components/ProfileInfoContainer';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const { info: player, loading: isLoading } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (!player.userToken) {
      history.push('/login');
    }
  });

  const handleClick = () => {
    history.push('/');
  };

  const handleEdit = () => {
    if (isEditing) {
      const newName = name || player.name;
      const newEmail = email || player.email;
      dispatch(fetchEditUser(
        { id: player.id, userToken: player.userToken, name: newName, email: newEmail },
      ));
      setIsEditing(false);
    } else setIsEditing(true);
  };

  const handleEditPassword = () => {
    if (isPasswordEditing) {
      console.log(1);
    } else setIsPasswordEditing(true);
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
        <ProfileInfoContainer
          states={ { name, email, password1, password2 } }
          currValues={ { currName: player.name, currEmail: player.email } }
          setStateFuncs={ { setName, setEmail, setPassword1, setPassword2 } }
          switchers={ { isEditing, isPasswordEditing, isLoading } }
        />
        <button
          className={ `home-button ${isEditing && 'editing'}` }
          data-testid="btn-go-home"
          type="button"
          disabled={ isPasswordEditing }
          onClick={ handleEdit }
        >
          {`${isEditing ? 'Confirm ' : ''}Edit name / e-mail`}
        </button>
        <button
          className="home-button"
          data-testid="btn-go-home"
          type="button"
          disabled={ isEditing }
          onClick={ handleEditPassword }
        >
          Change password
        </button>
      </section>
    </main>
  );
};

export default Profile;
