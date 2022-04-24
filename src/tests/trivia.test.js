import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import { renderWithRouterAndStore } from './testConfig';

import * as gravatar from '../services/gravatar';
import { defaultQuestions, getInitialState } from './mocks';

const VALID_EMAIL = 'email@test.com';
const VALID_NAME = 'Player One';
// const ATTEMPTS_NUMBER = 12;
const TIMER_LENGTH = 35000;

describe('Trivia Page Tests', () => {
  afterEach(cleanup);

  const login = () => {
    const emailInput = screen.getByPlaceholderText('Email do Gravatar');
    const nameInput = screen.getByPlaceholderText('Nome do Jogador');
    const playButton = screen.getByRole('button', { name: 'Jogar' });

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(nameInput, VALID_NAME);
    userEvent.click(playButton);
  };

  const defaultState = getInitialState(VALID_NAME, defaultQuestions);

  it('Should get the image from Gravatar profile based on user '
    + 'e-mail provided, and name based on user name provided', async () => {
    const spy = jest.spyOn(gravatar, 'default');
    renderWithRouterAndStore(<App />);
    login();

    const playerImage = await screen.findByAltText('Imagem de perfil');
    expect(playerImage).toBeInTheDocument();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(VALID_EMAIL);

    const nameH1 = screen.getByRole('heading', { name: VALID_NAME });
    expect(nameH1).toBeInTheDocument();
  });

  it('Should have a question card, containing category and question text', () => {
    renderWithRouterAndStore(<App />, { route: '/trivia' }, defaultState);

    const categoryH1 = screen
      .getByRole('heading', { name: defaultQuestions[0].category });
    const questionTextP = screen.getByText(defaultQuestions[0].question);

    expect(questionTextP).toBeInTheDocument();
    expect(categoryH1).toBeInTheDocument();
  });

  it('Should have the possible answers in buttons, presented in random order.', () => {
    renderWithRouterAndStore(<App />, { route: '/trivia' }, defaultState);

    const correctAnswerButton = screen
      .getByRole('button', { name: defaultQuestions[0].correct_answer });
    expect(correctAnswerButton).toBeInTheDocument();
    defaultQuestions[0].incorrect_answers.forEach((incorrectAnswer) => {
      const incorrectAnswerButton = screen.getByRole('button', { name: incorrectAnswer });
      expect(incorrectAnswerButton).toBeInTheDocument();
    });

    // For future develop: Be able to test the randomness of the button order
    /* const positionsList = [];
    for (let i = 1; i <= ATTEMPTS_NUMBER; i += 1) {
      cleanup();
      renderWithRouterAndStore(<App />, { route: '/trivia' }, defaultState);

      const answerButtons = screen.getAllByTestId(/wrong-answer\d/);
      answerButtons.push(screen.getByTestId('correct-answer'));
      correctAnswerButton = screen
        .getByRole('button', { name: defaultQuestions[0].correct_answer });
      const correctAnswerIndex = answerButtons.indexOf(correctAnswerButton);

      console.log(correctAnswerIndex);

      positionsList.push(correctAnswerIndex);
    }
    const uniquePositions = positionsList.reduce((uniquePositionsList, position) => {
      if (!uniquePositionsList.includes(position)) {
        return [...uniquePositionsList, position];
      }
      return uniquePositionsList;
    }, []);
    console.log(uniquePositions);
    expect(uniquePositions.length).toBeGreaterThan(2); */
  });

  it('Should have a timer, starting with 30 seconds and disabling '
    + 'answers buttons after 30 seconds', async () => {
    renderWithRouterAndStore(<App />, { route: '/trivia' }, defaultState);

    jest.setTimeout(TIMER_LENGTH + 1);

    const initialTimerDiv = screen.getByText('30\'');
    expect(initialTimerDiv).toBeInTheDocument();

    const pause = (msec) => new Promise((res) => setTimeout(res, msec));
    await pause(TIMER_LENGTH);

    const endedTimerDiv = screen.getByText('0\'');
    expect(endedTimerDiv).toBeInTheDocument();

    const answerButtons = screen.getAllByTestId(/wrong-answer\d/);
    answerButtons.push(screen.getByTestId('correct-answer'));
    console.log(answerButtons.length);
    answerButtons.forEach((answerButton) => {
      console.log(answerButton);
      expect(answerButton).toHaveAttribute('disabled');
    });
  });
});
