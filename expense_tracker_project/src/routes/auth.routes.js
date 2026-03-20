const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const {
  validateRegister,
  validateLogin,
  validateRefreshToken
} = require("../validators/auth.validator");

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/

// Register new user
router.post(
  "/register",
  validateRegister,
  authController.register
);

// Login user
router.post(
  "/login",
  validateLogin,
  authController.login
);

// Refresh access token
router.post(
  "/refresh-token",
  validateRefreshToken,
  authController.refreshToken
);

// Logout (protected route)
router.post("/logout", authMiddleware, authController.logout);

module.exports = router;