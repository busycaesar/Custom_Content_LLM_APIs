// Standardize format for all the response.
module.exports = (success, message, data) => {
  return {
    ok: success,
    message: message,
    body: data,
  };
};
