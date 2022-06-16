import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import { renderWithRouterAndStore } from './testConfig';

import { defaultQuestions, getInitialState } from './mocks';

const QUESTION_QUANTITY = 5;
const DEFAULT_SCORE = 10;
const TIMER_SCORE_CALC = 30;
const VALID_NAME = 'Player One';

describe('Feedback Page Tests', () => {
  afterEach(cleanup);

  const defaultState = getInitialState(VALID_NAME, defaultQuestions);
  const feedbackState = getInitialState(VALID_NAME, [], { score: 150, assertions: 3 });

  it('Should display the right number of correct answers and correct score', () => {
    renderWithRouterAndStore(<App />, { route: '/trivia' }, defaultState);

    const getDifficultyPoints = { hard: 3, medium: 2, easy: 1 };
    const getScore = (timer, difficulty) => (
      DEFAULT_SCORE + timer * getDifficultyPoints[difficulty]
    );

    const playerScore = { score: 0, assertions: 0 };
    for (let i = 0; i < QUESTION_QUANTITY; i += 1) {
      if (i % 2) {
        const correctAnswerButton = screen.getByTestId('correct-answer');
        userEvent.click(correctAnswerButton);
      } else {
        const incorrectAnswerButton = screen.getByTestId('wrong-answer-0');
        userEvent.click(incorrectAnswerButton);
      }

      const nextButton = screen.getByRole('button', { name: 'Próxima' });
      userEvent.click(nextButton);

      if (i % 2) {
        playerScore.score += getScore(TIMER_SCORE_CALC, defaultQuestions[i].difficulty);
        playerScore.assertions += 1;
      }
    }

    const assertionsH2 = screen.getAllByRole('heading', { level: 2 })[2];
    const scoreH1 = screen.getAllByRole('heading', { level: 2 })[3];
    expect(assertionsH2)
      .toHaveTextContent(`Voce acertou ${playerScore.assertions} questões!`);
    expect(scoreH1)
      .toHaveTextContent(`Um total de ${playerScore.score} pontos.`);
  });

  it('Should have a button to redirect to login page', () => {
    const { history } = renderWithRouterAndStore(
      <App />, { route: '/feedback' }, feedbackState,
    );

    const restartButton = screen.getByRole('button', { name: 'Jogar novamente' });
    userEvent.click(restartButton);

    const logoImage = screen.getByAltText('Trivia logo');
    expect(logoImage).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });

  it('Should have a button to redirect to ranking page', () => {
    const { history } = renderWithRouterAndStore(
      <App />, { route: '/feedback' }, feedbackState,
    );

    const rankingButton = screen.getByRole('button', { name: 'Ver Ranking' });
    userEvent.click(rankingButton);

    const titleH1 = screen.getByRole('heading', { name: 'Ranking' });
    expect(titleH1).toBeInTheDocument();
    expect(history.location.pathname).toBe('/ranking');
  });
});
