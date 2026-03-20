const Joi = require("joi");
const { validationError } = require("../utils/response");

/*
|--------------------------------------------------------------------------
| Expense Schemas
|--------------------------------------------------------------------------
*/

const createExpenseSchema = Joi.object({
  amount: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "Amount must be a number",
      "number.positive": "Amount must be greater than zero",
      "any.required": "Amount is required"
    }),

  categoryId: Joi.number()
    .integer()
    .required()
    .messages({
      "any.required": "Category is required"
    }),

  paymentMethod: Joi.string()
    .valid("cash", "upi", "card", "netbanking")
    .required()
    .messages({
      "any.only": "Payment method must be cash, upi, card, or netbanking"
    }),

  description: Joi.string()
    .max(255)
    .allow("", null),

  date: Joi.date()
    .optional()
});


const updateExpenseSchema = Joi.object({
  amount: Joi.number().positive(),

  categoryId: Joi.number().integer(),

  paymentMethod: Joi.string().valid("cash", "upi", "card", "netbanking"),

  description: Joi.string().max(255).allow("", null),

  date: Joi.date()
});


const expenseQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),

  limit: Joi.number().integer().min(1).max(100).default(10),

  categoryId: Joi.number().integer(),

  startDate: Joi.date(),

  endDate: Joi.date()
});


/*
|--------------------------------------------------------------------------
| Validation Middleware
|--------------------------------------------------------------------------
*/

function validateCreateExpense(req, res, next) {
  const { error } = createExpenseSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map(err => err.message);
    return validationError(res, errors);
  }

  next();
}

function validateUpdateExpense(req, res, next) {
  const { error } = updateExpenseSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map(err => err.message);
    return validationError(res, errors);
  }

  next();
}

function validateExpenseQuery(req, res, next) {
  const { error, value } = expenseQuerySchema.validate(req.query);

  if (error) {
    const errors = error.details.map(err => err.message);
    return validationError(res, errors);
  }

  req.query = value; // sanitized query values
  next();
}

module.exports = {
  validateCreateExpense,
  validateUpdateExpense,
  validateExpenseQuery
};