import axios from 'axios';

const api = axios.create({
  baseURL: 'https://opentdb.com/',
});

const getToken = async () => (
  api.get('/api_token.php?command=request')
    .then((response) => response.data)
    .catch((err) => console.log(err.message))
);

const getQuestions = async ({ token, category, difficulty, type }) => (
  api.get(`/api.php?amount=5&token=${token}&category=${category || ''}`
    + `&difficulty=${difficulty || ''}&type=${type || ''}`)
    .then((response) => response.data)
    .catch((err) => console.log(err.message))
);

const triviaUsersAPI = {
  getToken,
  getQuestions,
};

export default triviaUsersAPI;
