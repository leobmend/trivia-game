import axios from 'axios';

const api = axios.create({
  baseURL: 'http://trivia-game-back.herokuapp.com/',
});

const login = async ({ email, password }) => (
  api.post('/login', { email, password })
    .then((response) => response.data)
    .catch((err) => console.log(err.message))
);

const signUp = async ({ name, email, password, gravatarUrl }) => (
  api.post('/user/signup', { name, email, password, gravatarUrl })
    .then((response) => response.data)
    .catch((err) => console.log(err.message))
);

const usersAPI = {
  login,
  signUp,
};

export default usersAPI;
