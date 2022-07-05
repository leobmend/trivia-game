import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setSettings } from '../../redux-test/settings';
import { useCategories, useTokensLocalStorage } from '../../services/myHooks';
import Loading from '../Loading';

const difficultyObj = [
  { value: 'any', name: 'Any' },
  { value: 'easy', name: 'Easy' },
  { value: 'medium', name: 'Medium' },
  { value: 'hard', name: 'Hard' },
];

const typeObj = [
  { value: '', name: 'Any' },
  { value: 'boolean', name: 'True / False' },
  { value: 'multiple', name: 'Multiple Choice' },
];

const Settings = () => {
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [type, setType] = useState('');

  const { categories } = useSelector((state) => state.trivia);
  const { value: isLoading } = useSelector((state) => state.loading);

  const history = useHistory();
  const dispatch = useDispatch();

  useTokensLocalStorage();

  useCategories();

  const handleChange = ({ target: { id, value } }) => {
    switch (id) {
    case 'category':
      setCategory(value);
      break;
    case 'difficulty':
      setDifficulty(value);
      break;
    case 'type':
      setType(value);
      break;
    default: break;
    }
  };

  const handleApply = () => {
    dispatch(setSettings({ category, difficulty, type }));
  };

  if (isLoading || !categories.length) return <Loading />;

  return (
    <main className="Configuration">
      <section className="config-title-container">
        <h1 className="config-title">
          Game Settings
        </h1>
        <button
          className="config-home-button"
          type="button"
          onClick={ () => history.push('/lobby') }
        >
          Lobby
        </button>
      </section>

      <section className="config-container">
        <label className="config-label" htmlFor="category">
          Category
          <select
            className="config-select"
            id="category"
            onChange={ handleChange }
            value={ category }
          >
            {categories.map(({ name, id }) => (
              <option key={ id } value={ id }>{name}</option>
            ))}
          </select>
        </label>

        <label className="config-label" htmlFor="difficulty">
          Difficulty
          <select
            className="config-select"
            id="difficulty"
            onChange={ handleChange }
            value={ difficulty }
          >
            {difficultyObj.map(({ name, value }) => (
              <option key={ value } value={ value }>{name}</option>
            ))}
          </select>
        </label>

        <label className="config-label" htmlFor="type">
          Question Type
          <select
            className="config-select"
            id="type"
            onChange={ handleChange }
            value={ type }
          >
            {typeObj.map(({ name, value }) => (
              <option key={ value } value={ value }>{name}</option>
            ))}
          </select>
        </label>
        <button
          className="home-button"
          type="button"
          onClick={ handleApply }
        >
          Apply
        </button>
      </section>
    </main>
  );
};

export default Settings;
