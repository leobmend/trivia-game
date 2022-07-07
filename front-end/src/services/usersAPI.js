import axios from 'axios';

const api = axios.create({
  baseURL: 'http://trivia-game-back.herokuapp.com/',
});

const login = async ({ email, password }) => (
  api.post('/login', { email, password })
    .then(({ data, status }) => ({ data, status }))
    .catch((err) => err.message)
);

const signUp = async ({ name, email, password, gravatarUrl }) => (
  api.post('/user/signup', { name, email, password, gravatarUrl })
    .then(({ data, status }) => ({ data, status }))
    .catch((err) => err.message)
);

const getById = async (userToken) => (
  api.get('/user', { headers: { Authorization: userToken } })
    .then(({ data, status }) => ({ data, status }))
    .catch(({ response: { status } }) => ({ status }))
);

const update = async (id, userToken, { name, email }) => (
  api.put(`/user/${id}`, { name, email }, { headers: { Authorization: userToken } })
    .then(({ data, status }) => ({ data, status }))
    .catch((err) => err.message)
);

const updatePassword = async (id, userToken, { password }) => (
  api.put(`/user/${id}/password`, { password }, { headers: { Authorization: userToken } })
    .then(({ status }) => ({ status }))
    .catch((err) => err.message)
);

const registerScore = async (userToken, { score, category, difficulty, type }) => (
  api.post('/score',
    { score, category, difficulty, type }, { headers: { Authorization: userToken } })
    .then(({ data }) => ({ data }))
    .catch((err) => err.message)
);

const getTopTwenty = async (userToken) => (
  api.get('/score/ranking', { headers: { Authorization: userToken } })
    .then(({ data }) => ({ data }))
    .catch((err) => err.message)
);

const usersAPI = {
  login,
  signUp,
  getById,
  update,
  updatePassword,
  registerScore,
  getTopTwenty,
};

export default usersAPI;
