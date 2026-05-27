import asyncHandler
from "../utils/asyncHandler.js";

import authService
from "../services/auth.service.js";

import ApiResponse
from "../utils/ApiResponse.js";

import {
  cookieOptions,
}
from "../utils/cookieOptions.js";

import jwt
from "jsonwebtoken";

export const signup =
asyncHandler(
  async (req, res) => {

    const result =
      await authService
      .signup(req.body);

    return res
      .status(201)

      .cookie(
        "refreshToken",
        result.refreshToken,
        cookieOptions
      )

      .json(
        new ApiResponse(
          201,
          "User created successfully",
          {
            user:
              result.user,

            accessToken:
              result.accessToken,
          }
        )
      );
  }
);

export const login =
asyncHandler(
  async (req, res) => {

    const result =
      await authService
      .login(req.body);

    return res
      .status(200)

      .cookie(
        "refreshToken",
        result.refreshToken,
        cookieOptions
      )

      .json(
        new ApiResponse(
          200,
          "Login successful",
          {
            user:
              result.user,

            accessToken:
              result.accessToken,
          }
        )
      );
  }
);

export const
refreshAccessToken =
asyncHandler(
  async (req, res) => {

    const refreshToken =
      req.cookies
      .refreshToken;

    const result =
      await authService
      .refreshAccessToken(
        refreshToken
      );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Token refreshed",
          result
        )
      );
  }
);

export const logout =
asyncHandler(
  async (req, res) => {

    const refreshToken =
      req.cookies
      .refreshToken;

    if (refreshToken) {

      const decoded =
        jwt.verify(
          refreshToken,
          process.env
          .JWT_REFRESH_SECRET
        );

      await authService
        .logout(
          decoded.userId
        );
    }

    return res
      .clearCookie(
        "refreshToken",
        cookieOptions
      )
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Logout successful"
        )
      );
  }
);

export const
getCurrentUser =
asyncHandler(
  async (
    req,
    res
  ) => {

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Current user fetched",
          req.user
        )
      );
  }
);


export const
googleCallback =
asyncHandler(
  async (
    req,
    res
  ) => {

    const user =
      req.user;

    const accessToken =
      user
      .generateAccessToken();

    const refreshToken =
      user
      .generateRefreshToken();

    user.refreshToken =
      refreshToken;

    await user.save({
      validateBeforeSave:
      false,
    });

    res.cookie(
      "refreshToken",
      refreshToken,
      cookieOptions
    );

    return res.redirect(
      `${
        process.env
        .CLIENT_URL
      }/oauth-success?token=${
        accessToken
      }`
    );
  }
);