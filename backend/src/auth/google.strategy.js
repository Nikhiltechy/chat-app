import passport
from "passport";

import {
  Strategy
}
from
"passport-google-oauth20";

import User
from "../models/user.model.js";

import "../config/env.js";

console.log(
 process.env
   .GOOGLE_CLIENT_ID
);

passport.use(
  new Strategy(
    {
      clientID:
        process.env
        .GOOGLE_CLIENT_ID,

      clientSecret:
        process.env
        .GOOGLE_CLIENT_SECRET,

      callbackURL:
        "/api/auth/google/callback",
    },

    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {

      try {

        const email =
          profile.emails?.[0]
          ?.value;

        // find existing user
        let user =
          await User.findOne({
            email,
          });

        // existing user
        if (user) {

          // merge google account
          if (
            !user.googleId
          ) {

            user.googleId =
              profile.id;

            user.provider =
              "google";

            if (
              !user.avatar
            ) {
              user.avatar =
                profile.photos?.[0]
                ?.value || "";
            }

            await user.save({
              validateBeforeSave:
              false,
            });
          }

          return done(
            null,
            user
          );
        }

        // new google user
        user =
          await User.create({
            name:
              profile
              .displayName,

            email,

            googleId:
              profile.id,

            provider:
              "google",

            avatar:
              profile.photos?.[0]
              ?.value || "",
          });

        return done(
          null,
          user
        );

      } catch (
        error
      ) {

        done(
          error,
          null
        );
      }
    }
  )
);

export default passport;