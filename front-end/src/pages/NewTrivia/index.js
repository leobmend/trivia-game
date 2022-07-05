import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NewHeader from '../../components/NewHeader';
import NewQuestion from '../../components/NewQuestion';
import { resetScore } from '../../redux-test/score';
import { useTokensLocalStorage, useQuestions } from '../../services/myHooks';
import Loading from '../Loading';

const NewTrivia = () => {
  const [questionIndex, setQuestionIndex] = useState(0);

  const { questions } = useSelector((state) => state.trivia);
  const { value: isLoading } = useSelector((state) => state.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetScore());
  }, [dispatch]);

  useTokensLocalStorage();

  useQuestions();

  if (isLoading || !questions.length) return <Loading />;

  return (
    <main className="Trivia">
      <NewHeader />

      <NewQuestion
        question={ questions[questionIndex] }
        questionIndex={ questionIndex }
        setQuestionIndex={ setQuestionIndex }
      />
    </main>
  );
};

export default NewTrivia;
