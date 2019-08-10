const serializeError = require('serialize-error');

module.exports = (error) => {
  console.log(error);

  error.message = JSON.stringify(error, Object.getOwnPropertyNames(error));
  return serializeError(error);
}
