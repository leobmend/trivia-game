import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const TIMER_ENDING = 5;
const ONE_SECOND = 1000;

const QuestionAndTimer = (
  { category, cleanQuestionText, timer, setTimer, isAnswered },
) => {
  const timerId = useRef(0);

  const startTimer = () => {
    timerId.current = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, ONE_SECOND);
  };

  const stopTimer = () => {
    clearInterval(timerId.current);
    timerId.current = 0;
  };

  useEffect(() => {
    if (timerId.current === 0) {
      startTimer();
    }
    if (timerId.current !== 0 && (timer === 0 || isAnswered)) {
      stopTimer();
    }
  });

  return (
    <section className="question-container">
      <div className="rotated-card-1">
        <div className="rotated-card-2">
          <div className="rotated-card-3">
            <div className="question-card">
              <h1 className="category" data-testid="question-category">{category}</h1>
              <p
                className="question"
                data-testid="question-text"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={ { __html: cleanQuestionText } }
              />
            </div>
          </div>
        </div>
      </div>
      <div className={ `timer ${timer <= TIMER_ENDING && ' timer-ending'}` }>
        { `${timer}'` }
      </div>
    </section>
  );
};

QuestionAndTimer.propTypes = {
  category: PropTypes.string.isRequired,
  cleanQuestionText: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
  setTimer: PropTypes.func.isRequired,
  isAnswered: PropTypes.bool.isRequired,
};

export default QuestionAndTimer;
