const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routes/index');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());

app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

// mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { useNewUrlParser: true });
mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('Успешное подключение к MongoDB'))
  .catch((error) => console.error('Ошибка подключения:', error));

app.listen(PORT, () => {
  console.log(`Запуск сервера на ${PORT} порту`);
});
