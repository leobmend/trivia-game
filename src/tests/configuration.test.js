import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import { renderWithRouterAndStore } from './testConfig';

import { categoriesFetchMock, categoriesMock,
  configuredQuestionsFetchMock } from './mocks';

const CONFIGURATION_PATH = '/configuration';

describe('Configuration Page Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('Should have a header displaying "Configurações".', () => {
    renderWithRouterAndStore(<App />, { route: CONFIGURATION_PATH });

    const rankingH1 = screen.getByRole('heading', { level: 1, name: 'Configurações' });
    expect(rankingH1).toBeInTheDocument();
  });

  it('Should have a button to redirect to login page.', () => {
    const { history } = renderWithRouterAndStore(<App />, { route: CONFIGURATION_PATH });

    const loginButton = screen.getByRole('button', { name: 'Início' });
    userEvent.click(loginButton);

    const logoImage = screen.getByAltText('Trivia logo');
    expect(logoImage).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });

  it('Should have dropdown menus for category with data fetched on '
    + 'DBTriviaAPI.', async () => {
    const spyFetch = jest.spyOn(global, 'fetch')
      .mockImplementation(categoriesFetchMock);

    renderWithRouterAndStore(<App />, { route: CONFIGURATION_PATH });

    expect(spyFetch).toHaveBeenCalled();
    expect(spyFetch).toHaveBeenCalledWith('https://opentdb.com/api_category.php');

    const categoriesLabel = screen.getByLabelText('Categoria');
    expect(categoriesLabel).toBeInTheDocument();

    categoriesMock.trivia_categories.forEach(async (category) => {
      await screen.findByText(category.name);
    });
  });

  it('Should have the difficulty and the type of questions dropdown menus.', () => {
    renderWithRouterAndStore(<App />, { route: CONFIGURATION_PATH });

    const difficultyLabel = screen.getByLabelText('Dificuldade');
    const typeLabel = screen.getByLabelText('Tipo de Questão');

    ['Fácil', 'Médio', 'Difícil'].forEach((difficulty) => {
      userEvent.selectOptions(difficultyLabel,
        screen.getByRole('option', { name: difficulty }));
    });

    ['Verdadeiro ou Falso', 'Múltipla Escolha'].forEach((type) => {
      userEvent.selectOptions(typeLabel,
        screen.getByRole('option', { name: type }));
    });
  });

  it('Should change the url fetched to get questions, according to '
    + 'the defined configuration.', async () => {
    const { history } = renderWithRouterAndStore(<App />, { route: CONFIGURATION_PATH });

    userEvent.selectOptions(
      screen.getByLabelText('Categoria'),
      await screen
        .findByRole('option', { name: categoriesMock.trivia_categories[0].name }),
    );

    userEvent.selectOptions(
      screen.getByLabelText('Dificuldade'),
      screen.getByRole('option', { name: 'Médio' }),
    );

    userEvent.selectOptions(
      screen.getByLabelText('Tipo de Questão'),
      screen.getByRole('option', { name: 'Múltipla Escolha' }),
    );

    const spyFetch = jest.spyOn(global, 'fetch')
      .mockImplementation(configuredQuestionsFetchMock);

    history.push('/trivia');

    expect(await screen.findByTestId('correct-answer')).toBeInTheDocument();

    expect(spyFetch).toHaveBeenCalled();
    expect(spyFetch).toHaveBeenCalledWith(
      `https://opentdb.com/api.php?amount=5&token=null&category=${categoriesMock.trivia_categories[0].id}&difficulty=medium&type=multiple`,
    );
  });
});
