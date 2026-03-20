const { HTTP_STATUS, MESSAGES } = require("./constants");

/*
|--------------------------------------------------------------------------
| Success Response
|--------------------------------------------------------------------------
*/

function success(res, message = MESSAGES.SUCCESS, data = null, statusCode = HTTP_STATUS.OK) {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
}

/*
|--------------------------------------------------------------------------
| Error Response
|--------------------------------------------------------------------------
*/

function error(res, message = MESSAGES.SERVER_ERROR, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, errors = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    errors
  });
}

/*
|--------------------------------------------------------------------------
| Validation Error Response
|--------------------------------------------------------------------------
*/

function validationError(res, errors, message = "Validation failed") {
  return res.status(HTTP_STATUS.BAD_REQUEST).json({
    success: false,
    message,
    errors
  });
}

/*
|--------------------------------------------------------------------------
| Pagination Response (useful for lists)
|--------------------------------------------------------------------------
*/

function paginated(res, message, data, pagination, statusCode = HTTP_STATUS.OK) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination
  });
}

module.exports = {
  success,
  error,
  validationError,
  paginated
};