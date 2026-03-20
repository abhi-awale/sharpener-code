const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expense.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const {
  validateCreateExpense,
  validateUpdateExpense,
  validateExpenseQuery
} = require("../validators/expense.validator");

/*
|--------------------------------------------------------------------------
| Expense Routes
|--------------------------------------------------------------------------
*/

// Get all expenses (with pagination/filter)
router.get(
  "/",
  authMiddleware,
  validateExpenseQuery,
  expenseController.getExpenses
);

// Get single expense
router.get(
  "/:id",
  authMiddleware,
  expenseController.getExpenseById
);

// Create expense
router.post(
  "/",
  authMiddleware,
  validateCreateExpense,
  expenseController.createExpense
);

// Update expense
router.put(
  "/:id",
  authMiddleware,
  validateUpdateExpense,
  expenseController.updateExpense
);

// Delete expense
router.delete(
  "/:id",
  authMiddleware,
  expenseController.deleteExpense
);

module.exports = router;