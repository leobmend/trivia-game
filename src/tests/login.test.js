import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import { renderWithRouterAndStore } from './testConfig';

const VALID_EMAIL = 'email@test.com';
const INVALID_EMAIL = 'email';
const VALID_NAME = 'Player One';
const INVALID_NAME = '';

describe('Login Page Tests', () => {
  it('Should render Login Page when access the root path (/)', () => {
    renderWithRouterAndStore(<App />);

    const logoImage = screen.getByAltText('Trivia logo');
    expect(logoImage).toBeInTheDocument();
  });

  it('Should have a form to user inset e-mail and name', () => {
    renderWithRouterAndStore(<App />);

    const emailInput = screen.getByPlaceholderText('Email do Gravatar');
    const nameInput = screen.getByPlaceholderText('Nome do Jogador');
    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
  });

  it('Should disable the button that starts the game if the '
    + 'inputs are uncorrectly fulfilled', () => {
    renderWithRouterAndStore(<App />);

    const emailInput = screen.getByPlaceholderText('Email do Gravatar');
    const nameInput = screen.getByPlaceholderText('Nome do Jogador');
    const playButton = screen.getByRole('button', { name: 'Jogar' });

    expect(playButton).toHaveAttribute('disabled');

    userEvent.type(emailInput, INVALID_EMAIL);
    userEvent.type(nameInput, VALID_NAME);
    expect(playButton).toHaveAttribute('disabled');

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(nameInput, INVALID_NAME);
    expect(playButton).toHaveAttribute('disabled');

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(nameInput, VALID_NAME);
    expect(playButton).not.toHaveAttribute('disabled');
  });
});
