import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading';
import ProfileInfoContainer from '../../components/ProfileInfoContainer';

import './style.css';

import { fetchEditUser, fetchEditPassword, setEditing, setLogout,
} from '../../redux/player';
import { setLocalStorage } from '../../services/localStorage';
import getGravatar from '../../services/gravatar';

const getBtnClassName = (editing, type) => {
  if (type === 'user') {
    return 'edit-button '
      + `${editing === 'user' && ' editing-btn'}`
      + `${editing === 'password' && ' disabled-btn'}`;
  }
  if (type === 'password') {
    return 'edit-button '
      + `${editing === 'password' && ' editing-btn'}`
      + `${editing === 'user' && ' disabled-btn'}`;
  }
};

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const { info: player, editing } = useSelector((state) => state.player);
  const { value: isLoading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const history = useHistory();

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
      dispatch(fetchEditPassword(
        { id: player.id, userToken: player.userToken, password: password1 },
      ));
      setPassword1('');
      setPassword2('');
    } else {
      dispatch(setEditing('password'));
    }
  };

  if (isLoading) return <Loading />;

  return (
    <main className="Profile">
      <section className="profile-title-container">
        <h1 className="profile-title">Profile</h1>
        <div className="navigate-container">
          <button
            className="navigate-button"
            type="button"
            onClick={ () => history.push('/lobby') }
          >
            Lobby
          </button>
          <button
            className="navigate-button"
            type="button"
            onClick={ () => {
              dispatch(setLogout({ setLocalStorage }));
              history.push('/');
            } }
          >
            Log out
          </button>
        </div>
      </section>
      <section className="profile-container">
        <div className="profile-box">
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
            className={ getBtnClassName(editing, 'user') }
            type="button"
            disabled={ editing === 'password' }
            onClick={ handleEdit }
          >
            {`${editing === 'user' ? 'Confirm ' : ''}Edit name / e-mail`}
          </button>
          <button
            className={ getBtnClassName(editing, 'password') }
            type="button"
            disabled={
              editing === 'user' || (editing === 'password' && password1 !== password2)
            }
            onClick={ handleEditPassword }
          >
            {`${editing === 'password' ? 'Confirm ' : ''}Change password`}
          </button>
        </div>
      </section>
    </main>
  );
};

export default Profile;
