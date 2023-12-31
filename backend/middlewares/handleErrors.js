// централизованный обработчик ошибок
const handleErrors = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? 'Ошибка на сервере' : message,
    });
  next();
});

module.exports = handleErrors;
