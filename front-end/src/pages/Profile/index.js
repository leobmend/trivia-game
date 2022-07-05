import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading';
import ProfileInfoContainer from '../../components/ProfileInfoContainer';

import './style.css';

import { useTokensLocalStorage } from '../../services/myHooks';
import { fetchEditUser, fetchEditPassword, setEditing, setLogout,
} from '../../redux-test/player';
import { setLocalStorage } from '../../services/localStorage';
import getGravatar from '../../services/gravatar';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const { info: player, editing } = useSelector((state) => state.player);
  const { value: isLoading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const history = useHistory();

  useTokensLocalStorage();

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

  if (isLoading) return <Loading />;

  return (
    <main className="Profile">
      <section className="title-container">
        <h1 className="profile-title" data-testid="ranking-title">Profile</h1>
        <div className="navigate-container">
          <button
            className="navigate-button"
            data-testid="btn-go-home"
            type="button"
            onClick={ () => history.push('/login') }
          >
            Lobby
          </button>
          <button
            className="navigate-button"
            data-testid="btn-go-home"
            type="button"
            onClick={ () => {
              dispatch(setLogout({ setLocalStorage }));
              history.push('/login');
            } }
          >
            Log out
          </button>
        </div>
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
