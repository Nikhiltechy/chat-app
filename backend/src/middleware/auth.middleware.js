import jwt
from "jsonwebtoken";

import User
from "../models/user.model.js";

import ApiError
from "../utils/ApiError.js";

import asyncHandler
from "../utils/asyncHandler.js";

const protect =
asyncHandler(
  async (
    req,
    res,
    next
  ) => {

    let token;

    const authHeader =
      req.headers.authorization;

    if (
      authHeader &&
      authHeader.startsWith(
        "Bearer "
      )
    ) {

      token =
        authHeader.split(
          " "
        )[1];
    }

    if (!token) {
      throw new ApiError(
        401,
        "Unauthorized"
      );
    }

    const decoded =
      jwt.verify(
        token,
        process.env
        .JWT_ACCESS_SECRET
      );

    const user =
      await User.findById(
        decoded.userId
      ).select(
        "-password -refreshToken"
      );

    if (!user) {
      throw new ApiError(
        401,
        "User not found"
      );
    }

    req.user = user;

    next();
  }
);

export default protect;