const Joi = require("joi");
const { validationError } = require("../utils/response");

/*
|--------------------------------------------------------------------------
| Schemas
|--------------------------------------------------------------------------
*/

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),

  password: Joi.string()
    .min(6)
    .max(100)
    .required(),

  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Confirm password must match password"
    })
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),

  password: Joi.string()
    .required()
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required()
});

/*
|--------------------------------------------------------------------------
| Validation Middleware
|--------------------------------------------------------------------------
*/

function validateRegister(req, res, next) {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map(err => err.message);
    return validationError(res, errors);
  }

  next();
}

function validateLogin(req, res, next) {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map(err => err.message);
    return validationError(res, errors);
  }

  next();
}

function validateRefreshToken(req, res, next) {
  const { error } = refreshTokenSchema.validate(req.body);

  if (error) {
    const errors = error.details.map(err => err.message);
    return validationError(res, errors);
  }

  next();
}

module.exports = {
  validateRegister,
  validateLogin,
  validateRefreshToken
};