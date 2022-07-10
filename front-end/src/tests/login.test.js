import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import { renderWithRouterAndStore } from './testConfig';

const VALID_EMAIL = 'email@test.com';
const INVALID_EMAIL = 'email';
const VALID_NAME = 'Player One';

describe('Login Page Tests', () => {
  const getFormElements = () => ({
    emailInput: screen.getByPlaceholderText('Email do Gravatar'),
    nameInput: screen.getByPlaceholderText('Nome do Jogador'),
    playButton: screen.getByRole('button', { name: 'Jogar' }),
    configurationButton: screen.getByRole('button', { name: 'Configurações' }),
  });

  it('Should render Login Page when access the root path (/).', () => {
    renderWithRouterAndStore(<App />);

    const logoImage = screen.getByAltText('Trivia logo');
    expect(logoImage).toBeInTheDocument();
  });

  it('Should have a form to user inset e-mail and name.', () => {
    renderWithRouterAndStore(<App />);

    const { emailInput, nameInput } = getFormElements();
    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
  });

  it('Should have a button that starts the game, changing the url path.', async () => {
    const { history } = renderWithRouterAndStore(<App />);

    const { emailInput, nameInput, playButton } = getFormElements();

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(nameInput, VALID_NAME);
    userEvent.click(playButton);

    const playerName = await screen.findByRole('heading', { level: 1 });
    expect(playerName).toHaveTextContent(VALID_NAME);
    expect(history.location.pathname).toBe('/trivia');
  });

  it('Should have a button that redirect to configuration page.', () => {
    const { history } = renderWithRouterAndStore(<App />);

    const { configurationButton } = getFormElements();

    userEvent.click(configurationButton);

    const configurationHeader = screen.getByRole('heading', { level: 1 });
    expect(configurationHeader).toHaveTextContent('Configurações');
    expect(history.location.pathname).toBe('/configuration');
  });

  it('Should disable the button that starts the game if the '
    + 'inputs are uncorrectly fulfilled.', () => {
    renderWithRouterAndStore(<App />);

    const { emailInput, nameInput, playButton } = getFormElements();

    expect(playButton).toHaveAttribute('disabled');

    userEvent.type(emailInput, INVALID_EMAIL);
    userEvent.type(nameInput, VALID_NAME);
    expect(playButton).toHaveAttribute('disabled');

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.clear(nameInput);
    expect(playButton).toHaveAttribute('disabled');

    userEvent.type(emailInput, VALID_EMAIL);
    userEvent.type(nameInput, VALID_NAME);
    expect(playButton).not.toHaveAttribute('disabled');
  });
});
