import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setLoading } from '../redux-test/loading';
import { fetchGetInfo } from '../redux-test/player';
import { fetchToken } from '../redux-test/trivia';
import { getLocalStorage } from './localStorage';

const HTTP_UNAUTHORIZED = 401;

const useTokensLocalStorage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userToken = getLocalStorage('trivia-user-token');

  const { token: reduxToken, loading: tokenLoading } = useSelector(
    (state) => state.trivia,
  );
  const {
    info: { userToken: reduxUserToken }, loading: userTokenLoading, lastStatus,
  } = useSelector((state) => state.player);

  const { value: isLoading } = useSelector((state) => state.loading);

  if (
    (!userToken && isLoading)
      || (lastStatus === HTTP_UNAUTHORIZED && isLoading)) {
    history.push('/login');
    dispatch(setLoading(false));
  }

  if (reduxToken && reduxUserToken && isLoading) {
    dispatch(setLoading(false));
  }

  if (userToken && !reduxUserToken && isLoading && !userTokenLoading
    && lastStatus !== HTTP_UNAUTHORIZED) {
    dispatch(fetchGetInfo({ userToken }));
  }

  if (!reduxToken && !tokenLoading) {
    dispatch(fetchToken());
  }
};

export default useTokensLocalStorage;
