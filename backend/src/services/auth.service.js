import User
from "../models/user.model.js";

import ApiError
from "../utils/ApiError.js";

import jwt
from "jsonwebtoken";

const signup =
async (data) => {

  const {
    name,
    email,
    password,
  } = data;

  // validation
  if (
    !name ||
    !email ||
    !password
  ) {
    throw new ApiError(
      400,
      "All fields are required"
    );
  }

  // existing user
  const existingUser =
    await User.findOne({
      email,
    });

  if (existingUser) {
    throw new ApiError(
      409,
      "User already exists"
    );
  }

  // create user
  const user =
    await User.create({
      name,
      email,
      password,
    });

  // generate tokens
  const accessToken =
    user.generateAccessToken();

  const refreshToken =
    user.generateRefreshToken();

  // save refresh token
  user.refreshToken =
    refreshToken;

await user.save({
  validateBeforeSave: false
});
  // clean response
  const createdUser =
    await User.findById(
      user._id
    ).select(
      "-password -refreshToken"
    );

  return {
    user: createdUser,
    accessToken,
    refreshToken,
  };
};

const login =
async (data) => {

  const {
    email,
    password,
  } = data;

  // validation
  if (
    !email ||
    !password
  ) {
    throw new ApiError(
      400,
      "Email and password are required"
    );
  }

  // get user
  const user =
    await User.findOne({
      email,
    }).select(
      "+password +refreshToken"
    );

  if (!user) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  // provider check
  if (
    user.provider
    === "google"
  ) {
    throw new ApiError(
      400,
      "Please login with Google"
    );
  }

  // compare password
  const isMatch =
    await user
    .comparePassword(
      password
    );

  if (!isMatch) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  // tokens
  const accessToken =
    user
    .generateAccessToken();

  const refreshToken =
    user
    .generateRefreshToken();

  // save refresh token
  user.refreshToken =
    refreshToken;

await user.save({
  validateBeforeSave: false
});
  // remove sensitive data
  const loggedInUser =
    await User.findById(
      user._id
    ).select(
      "-password -refreshToken"
    );

  return {
    user:
      loggedInUser,

    accessToken,

    refreshToken,
  };
};

const refreshAccessToken =
async (refreshToken) => {

  if (!refreshToken) {
    throw new ApiError(
      401,
      "Refresh token missing"
    );
  }

  // verify token
  const decoded =
    jwt.verify(
      refreshToken,
      process.env
      .JWT_REFRESH_SECRET
    );

  // find user
  const user =
    await User.findById(
      decoded.userId
    ).select(
      "+refreshToken"
    );

  if (!user) {
    throw new ApiError(
      401,
      "User not found"
    );
  }

  // token match
  if (
    user.refreshToken
    !== refreshToken
  ) {
    throw new ApiError(
      401,
      "Invalid refresh token"
    );
  }

  // new access token
  const accessToken =
    user
    .generateAccessToken();

  return {
    accessToken,
  };
};

const logout =
async (userId) => {

  await User.findByIdAndUpdate(
    userId,
    {
      refreshToken: null,
    }
  );

  return null;
};

export default {
  signup, login, refreshAccessToken, logout,
};
