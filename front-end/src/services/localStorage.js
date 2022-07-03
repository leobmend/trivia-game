import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserToken } from '../redux-test/player';
import { setToken } from '../redux-test/trivia';

const getLocalStorage = (key) => (
  JSON.parse(localStorage.getItem(key))
);

const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const useTokensLocalStorage = () => {
  const dispatch = useDispatch();

  const token = getLocalStorage('trivia-token');
  const userToken = getLocalStorage('trivia-user-oken');

  if (token) dispatch(setToken(token));
  if (userToken) dispatch(setUserToken(userToken));

  const { userToken: reduxUserToken, email } = useSelector(
    (state) => state.player.info.userToken,
  );

  useEffect(() => {
    if (reduxUserToken && !email) {
      dispatch(fetchGetUser);
    }
  });
};

export { useTokensLocalStorage, setLocalStorage };
