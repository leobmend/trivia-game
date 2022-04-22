import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import { renderWithRouterAndStore } from './testConfig';

import * as gravatar from '../services/gravatar';
/* import { defaultQuestions } from './mocks';
 */
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
});
