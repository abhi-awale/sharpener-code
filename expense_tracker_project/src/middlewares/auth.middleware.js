const { verifyAccessToken } = require("../utils/jwt");
const { error } = require("../utils/response");
const { HTTP_STATUS, MESSAGES } = require("../utils/constants");

/*
|--------------------------------------------------------------------------
| Authentication Middleware
|--------------------------------------------------------------------------
*/

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return error(
        res,
        MESSAGES.UNAUTHORIZED,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = verifyAccessToken(token);

    if (!decoded) {
      return error(
        res,
        "Invalid or expired token",
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    // Attach user info to request
    req.user = decoded;

    next();
  } catch (err) {
    return error(
      res,
      MESSAGES.SERVER_ERROR,
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = authMiddleware;