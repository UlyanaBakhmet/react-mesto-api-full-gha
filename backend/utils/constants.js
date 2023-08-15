const { JWT_SECRET = 'JWT_SECRET' } = process.env;

// eslint-disable-next-line no-useless-escape
const urlRegex = /^https?:\/\/[\w\-\.\/~:\?\#\[\]@!$&'\(\)\*\+,;=]+[\-\.\/~:\?\#\[\]@!$&'\(\)\*\+,;=]{1}[\w\-\.\/~:\?\#\[\]@!$&'\(\)\*\+,;=]+[#\/]?$/;

module.exports = { urlRegex, JWT_SECRET };
