const { error } = require("../utils/response");
const { HTTP_STATUS, MESSAGES } = require("../utils/constants");

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

function errorMiddleware(err, req, res, next) {
  console.error(err);

  // Sequelize validation error
  if (err.name === "SequelizeValidationError") {
    const errors = err.errors.map(e => e.message);

    return error(
      res,
      "Validation error",
      HTTP_STATUS.BAD_REQUEST,
      errors
    );
  }

  // Sequelize unique constraint error
  if (err.name === "SequelizeUniqueConstraintError") {
    const errors = err.errors.map(e => e.message);

    return error(
      res,
      "Duplicate value error",
      HTTP_STATUS.BAD_REQUEST,
      errors
    );
  }

  // Default server error
  return error(
    res,
    MESSAGES.SERVER_ERROR,
    HTTP_STATUS.INTERNAL_SERVER_ERROR
  );
}

module.exports = errorMiddleware;