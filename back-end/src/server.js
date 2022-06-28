require('dotenv').config();

const app = require('./api');

const port = process.env.PORT;

app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
