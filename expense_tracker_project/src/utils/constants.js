/*
|--------------------------------------------------------------------------
| HTTP Status Codes
|--------------------------------------------------------------------------
*/

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,

  INTERNAL_SERVER_ERROR: 500
};

/*
|--------------------------------------------------------------------------
| Common Response Messages
|--------------------------------------------------------------------------
*/

const MESSAGES = {
  SUCCESS: "Success",
  CREATED: "Resource created successfully",
  UPDATED: "Resource updated successfully",
  DELETED: "Resource deleted successfully",

  INVALID_CREDENTIALS: "Invalid email or password",
  UNAUTHORIZED: "Unauthorized access",
  NOT_FOUND: "Resource not found",
  ROUTE_NOT_FOUND: "Route not found",

  SERVER_ERROR: "Internal server error"
};

/*
|--------------------------------------------------------------------------
| Pagination Defaults (useful later)
|--------------------------------------------------------------------------
*/

const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100
};

/*
|--------------------------------------------------------------------------
| User Roles (if you add roles later)
|--------------------------------------------------------------------------
*/

const ROLES = {
  USER: "user",
  ADMIN: "admin"
};

module.exports = {
  HTTP_STATUS,
  MESSAGES,
  PAGINATION,
  ROLES
};