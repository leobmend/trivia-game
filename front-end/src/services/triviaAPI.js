import axios from 'axios';

const api = axios.create({
  baseURL: 'https://opentdb.com/',
});

const getToken = async () => (
  api.get('/api_token.php?command=request')
    .then((response) => response.data)
    .catch((err) => console.log(err.message))
);

const triviaUsersAPI = {
  getToken,
};

export default triviaUsersAPI;
