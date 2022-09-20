const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { NOT_FOUND } = require('./status/status_code');
const { login, createUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '63139a119929a10f0a0bdc43', // вставьте сюда _id созданного пользователя
  };
  next();
});
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use('/*', (req, res) => {
  res.status(NOT_FOUND).send({
    message: 'Страница не найдена',
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
