import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import { renderWithRouterAndStore } from './testConfig';

import { rankingMock } from './mocks';

describe('Ranking Page Tests', () => {
  afterEach(cleanup);

  const localStorageSpy = jest
    .spyOn(Object.getPrototypeOf(localStorage), 'getItem')
    .mockImplementation(() => JSON.stringify(rankingMock));

  it('Should have a header displaying "Ranking".', () => {
    renderWithRouterAndStore(<App />, { route: '/ranking' });

    const rankingH1 = screen.getByRole('heading', { level: 1, name: 'Ranking' });
    expect(rankingH1).toBeInTheDocument();
  });

  it('Should get the previously ranked players on localStorage.', () => {
    renderWithRouterAndStore(<App />, { route: '/ranking' });

    expect(localStorageSpy).toHaveBeenCalled();
    expect(localStorageSpy).toHaveBeenCalledWith('ranking');
  });

  it('Should display the image, name and score from the previously '
    + 'ranked players.', () => {
    renderWithRouterAndStore(<App />, { route: '/ranking' });

    rankingMock.forEach((player, index) => {
      const playerImg = screen.getAllByRole('img')[index];
      expect(playerImg).toHaveAttribute('src', player.picture);

      const playerNameH1 = screen.getByRole('heading', { level: 1, name: player.name });
      expect(playerNameH1).toBeInTheDocument();

      const playerScoreH2 = screen
        .getByRole('heading', { level: 2, name: player.score.toString() });
      expect(playerScoreH2).toBeInTheDocument();
    });
  });

  it('Should have a button to redirect to login page', () => {
    const { history } = renderWithRouterAndStore(<App />, { route: '/ranking' });

    const restartButton = screen.getByRole('button', { name: 'Início' });
    userEvent.click(restartButton);

    const logoImage = screen.getByAltText('Trivia logo');
    expect(logoImage).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });
});
