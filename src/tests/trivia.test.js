import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import { renderWithRouterAndStore } from './testConfig';

import * as gravatar from '../services/gravatar';
import { defaultQuestions, getInitialState } from './mocks';

const VALID_EMAIL = 'email@test.com';
const VALID_NAME = 'Player One';
const ATTEMPTS_NUMBER = 10;

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

  it('Should have the possible answers, presented in random order buttons.', () => {
    renderWithRouterAndStore(<App />, { route: '/trivia' }, defaultState);

    let correctAnswerButton = screen
      .getByRole('button', { name: defaultQuestions[0].correct_answer });
    expect(correctAnswerButton).toBeInTheDocument();
    defaultQuestions[0].incorrect_answers.forEach((incorrectAnswer) => {
      const incorrectAnswerButton = screen.getByRole('button', { name: incorrectAnswer });
      expect(incorrectAnswerButton).toBeInTheDocument();
    });

    const positionsList = [];
    for (let i = 1; i <= ATTEMPTS_NUMBER; i += 1) {
      cleanup();
      renderWithRouterAndStore(<App />, { route: '/trivia' }, defaultState);

      const answersButtons = screen.getAllByRole('button');
      correctAnswerButton = screen
        .getByRole('button', { name: defaultQuestions[0].correct_answer });
      const correctAnswerIndex = answersButtons.indexOf(correctAnswerButton);

      positionsList.push(correctAnswerIndex);
    }
    const uniquePositions = positionsList.reduce((uniquePositionsList, position) => {
      if (!uniquePositionsList.includes(position)) {
        return [...uniquePositionsList, position];
      }
      return uniquePositionsList;
    }, []);
    expect(uniquePositions.length).toBeGreaterThan(2);
  });
});
