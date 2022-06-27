const express = require('express');

const app = express();

const port = process.env.PORT || 3001;

app.get('/', (_req, res) => res.send(`<h1> Hello world!! </h1> <h2> Running on port ${port}. </h2>`));

app.listen(port, () => {
  console.log('Escutando na 3001')
});
