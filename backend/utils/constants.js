const { JWT_SECRET = 'JWT_SECRET' } = process.env;

// const SUCCESS = 200;
// const CREATED = 201;
// const BAD_REQUEST = 400;
// const NOT_FOUND = 404;
// const INTERNAL_SERVER_ERROR = 500;

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports = {
  urlRegex,
  JWT_SECRET,
// SUCCESS,
// CREATED,
// BAD_REQUEST,
// NOT_FOUND,
// INTERNAL_SERVER_ERROR
};
