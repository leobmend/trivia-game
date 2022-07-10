import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './style.css';

import Header from '../../components/Header';
import Question from '../../components/Question';

const Trivia = () => {
  const [questionIndex, setQuestionIndex] = useState(0);

  const { questions } = useSelector((state) => state.trivia);

  return (
    <main className="Trivia">
      <Header />
      <Question
        question={ questions[questionIndex] }
        questionIndex={ questionIndex }
        setQuestionIndex={ setQuestionIndex }
      />
    </main>
  );
};

export default Trivia;
