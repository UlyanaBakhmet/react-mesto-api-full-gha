require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
// app.use(cors({ origin: true, credentials: true }));
app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  // eslint-disable-next-line no-console
  .then(() => console.log('Успешное подключение к MongoDB'))
  // eslint-disable-next-line no-console
  .catch((err) => console.err('Ошибка подключения:', err));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Запуск сервера на ${PORT} порту`);
});
