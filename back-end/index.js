const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('<h1> Hello world! </h1>'));

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('Escutando na 3001')
});
