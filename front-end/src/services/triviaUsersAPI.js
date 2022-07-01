import axios from 'axios';

const api = axios.create({
  baseURL: 'http://trivia-game-back.herokuapp.com/',
});

const login = async ({ email, password }) => (
  api.post('/user/login', { email, password })
    .then((response) => response.data)
    .catch((err) => console.log(err.message))
);

const triviaUsersAPI = {
  login,
};

export default triviaUsersAPI;
