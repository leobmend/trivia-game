require('dotenv').config();

const app = require('./api');

const port = process.env.NODE_ENV === 'production' 
  ? process.env.PORT
  : process.env.API_PORT;

app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
