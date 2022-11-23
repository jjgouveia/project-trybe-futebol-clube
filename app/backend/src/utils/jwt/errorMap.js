const errorMap = {
  ok: 200,
  missingField: 400,
  unauthorized: 401,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
