import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetInfo } from '../redux/player';
import { fetchRanking } from '../redux/ranking';
import { fetchCategories, fetchQuestions, fetchToken } from '../redux/trivia';
import { getLocalStorage } from './localStorage';

const HTTP_UNAUTHORIZED = 401;
const HTTP_NOT_FOUND = 404;
const httpErrors = [HTTP_UNAUTHORIZED, HTTP_NOT_FOUND];

export const getQuestionsBody = (token, settings) => {
  const {
    category: categoryRedux, difficulty: difficultyRedux, type: typeRedux,
  } = settings;

  const category = categoryRedux === '999' ? '' : categoryRedux;
  const difficulty = difficultyRedux === 'any' ? '' : difficultyRedux;
  const type = typeRedux === 'any' ? '' : typeRedux;

  return { token, category, difficulty, type };
};

const useDataLoading = () => {
  const dispatch = useDispatch();

  const {
    loading: { value: isLoading },
    trivia: { token, categories, questions, loading: triviaLoading },
    player: { info: { userToken }, loading: playerLoading, lastStatus },
    settings,
  } = useSelector((state) => state);

  const localUserToken = getLocalStorage('trivia-user-token') || '';

  if (isLoading) {
    if (!userToken && !playerLoading && !httpErrors.includes(lastStatus)) {
      dispatch(fetchGetInfo({ userToken: localUserToken }));
    }

    if (!token && !triviaLoading) {
      dispatch(fetchToken());
    }

    if (!categories.length && token && !triviaLoading) {
      dispatch(fetchCategories());
    }

    if (!questions.length && categories.length && !triviaLoading) {
      dispatch(fetchQuestions(getQuestionsBody(token, settings)));
    }
  }
};

const useRanking = () => {
  const dispatch = useDispatch();

  const {
    ranking: { loading: isRankingLoading, topTwenty },
    player: { info: { userToken } },
  } = useSelector((state) => state);

  useEffect(() => {
    if (userToken && !topTwenty.length && !isRankingLoading) {
      dispatch(fetchRanking(userToken));
    }
  });
};

const myHooks = {
  useDataLoading,
  useRanking,
};

export default myHooks;
