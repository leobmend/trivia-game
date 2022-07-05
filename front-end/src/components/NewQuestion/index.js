import React, { useEffect, useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import { useHistory } from 'react-router-dom';
import QuestionAndTimer from '../QuestionAndTimer';
import Answers from '../Answers';

const TIMER_SEC = 10;
const LIMIT_QUESTIONS = 4;

const NewQuestion = ({ question, questionIndex, setQuestionIndex }) => {
  const { type, category, question: questionText, correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers, difficulty } = question;
  const cleanQuestionText = sanitizeHtml(questionText);

  const [timer, setTimer] = useState(TIMER_SEC);
  const [isAnswered, setIsAnswered] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (!isAnswered && timer === 0) setIsAnswered(true);
  }, [isAnswered, timer]);

  const handleClickNextQuestion = () => {
    if (questionIndex < LIMIT_QUESTIONS) {
      setQuestionIndex(questionIndex + 1);
      setIsAnswered(false);
      setTimer(TIMER_SEC);
    } else {
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
        />
        {(isAnswered || timer < 1) && (
          <button
            className="next-button"
            onClick={ handleClickNextQuestion }
            data-testid="btn-next"
            type="button"
          >
            Next
          </button>
        )}
      </section>

    </main>
  );
};

NewQuestion.propTypes = {
  question: PropTypes.objectOf(oneOfType([
    PropTypes.string,
    PropTypes.array,
  ])).isRequired,
  questionIndex: PropTypes.number.isRequired,
  setQuestionIndex: PropTypes.func.isRequired,
};

export default NewQuestion;
