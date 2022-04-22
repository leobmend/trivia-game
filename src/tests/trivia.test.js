import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import { renderWithRouterAndStore } from './testConfig';

import * as gravatar from '../services/gravatar';
import { defaultQuestions, getInitialState } from './mocks';

const VALID_EMAIL = 'email@test.com';
const VALID_NAME = 'Player One';

describe('Trivia Page Tests', () => {
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

  it('Should have the possible answers, presented in random order buttons, '
    + 'and a timer starting at 30sec', () => {
    renderWithRouterAndStore(<App />, { route: '/trivia' }, defaultState);

    const correctAnswerButton = screen.getByText(defaultQuestions[0].correct_answer);
    expect(correctAnswerButton).toBeInTheDocument();
    defaultQuestions[0].incorrect_answers.forEach((incorrectAnswer) => {
      const incorrectAnswerButton = screen.getByText(incorrectAnswer);
      expect(incorrectAnswerButton).toBeInTheDocument();
    });
  });
});
