const bcrypt = require("bcrypt");

const { User } = require("../models");

const { success, error } = require("../utils/response");
const { HTTP_STATUS, MESSAGES } = require("../utils/constants");

const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} = require("../utils/jwt");

/*
|--------------------------------------------------------------------------
| Register User
|--------------------------------------------------------------------------
*/

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {
      return error(
        res,
        "Email already registered",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    return success(
      res,
      MESSAGES.CREATED,
      {
        id: user.id,
        name: user.name,
        email: user.email
      },
      HTTP_STATUS.CREATED
    );
  } catch (err) {
    return error(res);
  }
};

/*
|--------------------------------------------------------------------------
| Login User
|--------------------------------------------------------------------------
*/

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return error(
        res,
        MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return error(
        res,
        MESSAGES.INVALID_CREDENTIALS,
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const payload = {
      id: user.id,
      email: user.email
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await user.update({ refreshToken });

    return success(res, "Login successful", {
      accessToken,
      refreshToken
    });
  } catch (err) {
    return error(res);
  }
};

/*
|--------------------------------------------------------------------------
| Refresh Token
|--------------------------------------------------------------------------
*/

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const decoded = verifyRefreshToken(refreshToken);

    if (!decoded) {
      return error(
        res,
        "Invalid refresh token",
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const user = await User.findByPk(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return error(
        res,
        "Refresh token mismatch",
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    const newAccessToken = generateAccessToken({
      id: user.id,
      email: user.email
    });

    return success(res, "Token refreshed", {
      accessToken: newAccessToken
    });
  } catch (err) {
    return error(res);
  }
};

/*
|--------------------------------------------------------------------------
| Logout User
|--------------------------------------------------------------------------
*/

exports.logout = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId);

    if (user) {
      await user.update({ refreshToken: null });
    }

    return success(res, "Logged out successfully");
  } catch (err) {
    return error(res);
  }
};