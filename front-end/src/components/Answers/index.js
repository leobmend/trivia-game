import React, { useState } from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import { useDispatch } from 'react-redux';
import { setScore } from '../../redux-test/score';

const DEFAULT_SCORE = 10;
const difficultyPoints = { hard: 3, medium: 2, easy: 1 };

const setStylesQuestions = (isCorrect, isSelected) => (
  `answer${isCorrect ? ' correct-answer' : ' wrong-answer'}`
    + `${isSelected ? ' selected-answer' : ''}`
);

const Answers = ({ type, correctAnswer, incorrectAnswers, timer,
  difficulty, isAnswered, setIsAnswered, randomCorrectIndex }) => {
  const dispatch = useDispatch();

  const [clickedIndex, setClickedIndex] = useState();

  const handleClickAnswer = ({ target: { value } }) => {
    setClickedIndex(value);
    setIsAnswered(true);
    if (Number(value) === randomCorrectIndex || value === correctAnswer) {
      dispatch(setScore(DEFAULT_SCORE + timer * difficultyPoints[difficulty]));
    }
  };

  const renderMultipleAnswers = () => {
    const correct = sanitizeHtml(correctAnswer);
    const incorrectList = incorrectAnswers
      .map((incorrectAnswer) => sanitizeHtml(incorrectAnswer));

    const answersList = [...incorrectList];
    answersList.splice(randomCorrectIndex, 0, correct);

    return answersList.map((answer, index) => (
      <button
        onClick={ handleClickAnswer }
        className={ isAnswered
          ? setStylesQuestions((index === randomCorrectIndex),
            (index === Number(clickedIndex)))
          : 'answer' }
        type="button"
        disabled={ isAnswered }
        key={ index }
        value={ index }
      >
        {answer}
      </button>
    ));
  };

  const renderBoolAnswers = (correct) => {
    const answersList = ['True', 'False'];

    return (
      <>
        {
          answersList.map((answer, index) => (
            <button
              type="button"
              key={ index }
              onClick={ (event) => (
                handleClickAnswer(event)
              ) }
              className={ isAnswered
                ? setStylesQuestions((answer === correct),
                  (answer === clickedIndex))
                : 'answer' }
              disabled={ isAnswered }
              value={ answer }
            >
              {answer}
            </button>
          ))
        }
      </>
    );
  };

  return (
    <section className="buttons-container" data-testid="answer-options">
      {type === 'multiple'
        ? renderMultipleAnswers()
        : renderBoolAnswers(correctAnswer)}
    </section>
  );
};

Answers.propTypes = {
  type: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  timer: PropTypes.number.isRequired,
  difficulty: PropTypes.string.isRequired,
  isAnswered: PropTypes.bool.isRequired,
  setIsAnswered: PropTypes.func.isRequired,
  randomCorrectIndex: PropTypes.number.isRequired,
};

export default Answers;
