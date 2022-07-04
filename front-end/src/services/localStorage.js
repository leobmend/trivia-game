import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux-test/loading';
import { fetchGetInfo } from '../redux-test/player';
import { fetchToken } from '../redux-test/trivia';

const getLocalStorage = (key) => (
  JSON.parse(localStorage.getItem(key))
);

const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const useTokensLocalStorage = () => {
  const dispatch = useDispatch();

  const userToken = getLocalStorage('trivia-user-token');

  const { token: reduxToken, loading: tokenLoading } = useSelector(
    (state) => state.trivia,
  );
  const { info: { userToken: reduxUserToken }, loading: userTokenLoading } = useSelector(
    (state) => state.player,
  );

  const { value: isLoading } = useSelector((state) => state.loading);

  if (userToken && !reduxToken && !reduxUserToken && !isLoading) {
    dispatch(setLoading(true));
  } else if (reduxToken && reduxUserToken && isLoading) {
    dispatch(setLoading(false));
  }

  if (userToken && !reduxUserToken && !userTokenLoading) {
    dispatch(fetchGetInfo({ userToken }));
  }

  if (!reduxToken && reduxUserToken && !tokenLoading) {
    dispatch(fetchToken());
  }
};

export { useTokensLocalStorage, setLocalStorage };
