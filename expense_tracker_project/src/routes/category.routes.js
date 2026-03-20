const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/*
|--------------------------------------------------------------------------
| Category Routes
|--------------------------------------------------------------------------
*/

// Get all categories
router.get(
  "/",
  authMiddleware,
  categoryController.getCategories
);

// Create new category
router.post(
  "/",
  authMiddleware,
  categoryController.createCategory
);

// get category by. id
router.get(
  "/:id",
  authMiddleware,
  categoryController.getCategoryById
);


// Update category
router.put(
  "/:id",
  authMiddleware,
  categoryController.updateCategory
);

// Delete category
router.delete(
  "/:id",
  authMiddleware,
  categoryController.deleteCategory
);

module.exports = router;