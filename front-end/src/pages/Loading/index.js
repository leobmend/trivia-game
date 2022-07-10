import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './style.css';

import triviaLogo from '../../images/trivia.png';
import loadingGif from '../../images/loading.gif';

import myHooks from '../../services/myHooks';
import { setLoading } from '../../redux/loading';

const { useDataLoading, useRanking } = myHooks;

const HTTP_UNAUTHORIZED = 401;
const HTTP_NOT_FOUND = 404;
const httpErrors = [HTTP_UNAUTHORIZED, HTTP_NOT_FOUND];

const Loading = () => {
  const {
    loading: { value: isLoading },
    trivia: { token, categories, questions },
    player: { info: { userToken }, lastStatus },
    ranking: { topTwenty },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const history = useHistory();

  useDataLoading();
  useRanking();

  useEffect(() => {
    if (isLoading && token && categories.length && questions.length
      && (topTwenty.length || httpErrors.includes(lastStatus))
      && (userToken || httpErrors.includes(lastStatus))) {
      if (!userToken) {
        history.push('/');
      } else if (
        ['', '/', '/trivia', '/feedback'].includes(history.location.pathname)) {
        history.push('/lobby');
      }
      dispatch(setLoading(false));
    }
  }, [isLoading, userToken, token, categories, questions,
    lastStatus, topTwenty, dispatch, history]);

  return (
    <main className="Loading">
      <div className="loading-pg-container">
        <div className="loading-pg-box">
          <img
            className="logo-img"
            src={ triviaLogo }
            alt="Loading gif"
          />
          <img
            className="loading-pg-gif"
            src={ loadingGif }
            alt="Loading gif"
          />
        </div>
      </div>
    </main>
  );
};

export default Loading;
