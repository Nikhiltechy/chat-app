import express
from "express";

import {
  signup, login, refreshAccessToken, logout, getCurrentUser, googleCallback

} from
"../controllers/auth.controller.js";

import protect
from
"../middleware/auth.middleware.js";

import passport
from "passport";

const router =
  express.Router();

router.post(
  "/signup",
  signup
);
router.post(
  "/login",
  login
);

router.post(
  "/logout",
  logout
);

router.post
("/refresh-token",
   refreshAccessToken)

router.get(
  "/me",
  protect,
  getCurrentUser
);

router.get(
  "/google",

  passport.authenticate(
    "google",
    {
      scope: [
        "profile",
        "email",
      ],
    }
  )
);

router.get(
  "/google/callback",

  passport.authenticate(
    "google",
    {
      session: false,
      failureRedirect:
        "/login",
    }
  ),

  googleCallback
);


export default router;