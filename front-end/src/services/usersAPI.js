import axios from 'axios';

const api = axios.create({
  baseURL: 'http://trivia-game-back.herokuapp.com/',
});

const login = async ({ email, password }) => (
  api.post('/login', { email, password })
    .then((response) => response.data)
    .catch((err) => err.message)
);

const signUp = async ({ name, email, password, gravatarUrl }) => (
  api.post('/user/signup', { name, email, password, gravatarUrl })
    .then((response) => response.data)
    .catch((err) => err.message)
);

const getById = async (id, userToken) => (
  api.get(`/user/${id}`, { headers: { Authorization: userToken } })
    .then((response) => response.data)
    .catch((err) => err.message)
);

const update = async (id, userToken, { name, email }) => (
  api.put(`/user/${id}`, { name, email }, { headers: { Authorization: userToken } })
    .then((response) => response.data)
    .catch((err) => err.message)
);

const usersAPI = {
  login,
  signUp,
  getById,
  update,
};

export default usersAPI;
