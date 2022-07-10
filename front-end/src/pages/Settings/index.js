import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './style.css';

import { setSettings } from '../../redux/settings';
import { resetQuestions, resetResponseCode } from '../../redux/trivia';

const TIME_TO_SHOW_MODAL = 5000;

const difficultyObj = [
  { value: 'any', name: 'Any' },
  { value: 'easy', name: 'Easy' },
  { value: 'medium', name: 'Medium' },
  { value: 'hard', name: 'Hard' },
];

const typeObj = [
  { value: 'any', name: 'Any' },
  { value: 'boolean', name: 'True / False' },
  { value: 'multiple', name: 'Multiple Choice' },
];

const Settings = () => {
  const {
    trivia: { categories, responseCode },
    settings: { category, difficulty, type },
  } = useSelector((state) => state);

  const [categorySelect, setCategory] = useState(category);
  const [difficultySelect, setDifficulty] = useState(difficulty);
  const [typeSelect, setType] = useState(type);

  const history = useHistory();
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (responseCode) {
      setTimeout(() => {
        dispatch(resetResponseCode());
      }, TIME_TO_SHOW_MODAL);
    }
  });

  const handleApply = () => {
    dispatch(setSettings(
      { category: categorySelect, difficulty: difficultySelect, type: typeSelect },
    ));
    dispatch(resetQuestions());

    history.push('/lobby');
  };

  return (
    <main className="Configuration">
      <section className="config-title-container">
        <h1 className="config-title">
          Game Settings
        </h1>
        <button
          className="config-navigate-button"
          type="button"
          disabled={ responseCode }
          onClick={ () => history.push('/lobby') }
        >
          Lobby
        </button>
      </section>

      <section className="config-container">
        <div className="config-box">
          <label className="config-label" htmlFor="category">
            Category
            <select
              className="config-select"
              id="category"
              onChange={ handleChange }
              value={ categorySelect }
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
              value={ difficultySelect }
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
              value={ typeSelect }
            >
              {typeObj.map(({ name, value }) => (
                <option key={ value } value={ value }>{name}</option>
              ))}
            </select>
          </label>
          <button
            className="apply-button"
            type="button"
            disabled={ responseCode }
            onClick={ handleApply }
          >
            Apply
          </button>
        </div>
      </section>
    </main>
  );
};

export default Settings;
