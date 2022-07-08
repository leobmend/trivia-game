import React, { useEffect, useRef, useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';

import './style.css';

import QuestionAndTimer from '../QuestionAndTimer';
import Answers from '../Answers';

import { resetQuestions } from '../../redux/trivia';
import usersAPI from '../../services/usersAPI';
import { resetRanking } from '../../redux/ranking';

const TIMER_SEC = 8;
const LIMIT_QUESTIONS = 4;
const ANSWERS_ARRAY_SIZE = 4;

const getRandom = () => Math.floor(Math.random() * ANSWERS_ARRAY_SIZE);

const Question = ({ question, questionIndex, setQuestionIndex }) => {
  const { type, category, question: questionText, correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers, difficulty } = question;
  const cleanQuestionText = sanitizeHtml(questionText);

  const [timer, setTimer] = useState(TIMER_SEC);
  const [isAnswered, setIsAnswered] = useState(false);

  const { userToken } = useSelector((state) => state.player.info);
  const { settings } = useSelector((state) => state);
  const { scorePoints: score } = useSelector((state) => state.score);

  const randomCorrectIndex = useRef(getRandom());

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAnswered && timer === 0) setIsAnswered(true);
  }, [isAnswered, timer]);

  const handleClickNextQuestion = () => {
    if (questionIndex < LIMIT_QUESTIONS) {
      randomCorrectIndex.current = getRandom();

      setQuestionIndex(questionIndex + 1);
      setIsAnswered(false);
      setTimer(TIMER_SEC);
    } else {
      dispatch(resetRanking());
      dispatch(resetQuestions());

      usersAPI.registerScore(userToken, { score, ...settings });

      history.push('/feedback');
    }
  };

  return (
    <main className="Question">
      <QuestionAndTimer
        category={ category }
        cleanQuestionText={ cleanQuestionText }
        timer={ timer }
        setTimer={ setTimer }
        isAnswered={ isAnswered }
      />

      <div className="vl" />

      <section className="buttons-container" data-testid="answer-options">
        <Answers
          type={ type }
          correctAnswer={ correctAnswer }
          incorrectAnswers={ incorrectAnswers }
          timer={ timer }
          setTimer={ setTimer }
          difficulty={ difficulty }
          isAnswered={ isAnswered }
          setIsAnswered={ setIsAnswered }
          randomCorrectIndex={ randomCorrectIndex.current }
        />
        {(isAnswered || timer < 1) && (
          <button
            className="next-button"
            onClick={ handleClickNextQuestion }
            data-testid="btn-next"
            type="button"
          >
            {questionIndex < LIMIT_QUESTIONS ? 'Next' : 'Finish'}
          </button>
        )}
      </section>

    </main>
  );
};

Question.propTypes = {
  question: PropTypes.objectOf(oneOfType([
    PropTypes.string,
    PropTypes.array,
  ])).isRequired,
  questionIndex: PropTypes.number.isRequired,
  setQuestionIndex: PropTypes.func.isRequired,
};

export default Question;
