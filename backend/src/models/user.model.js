import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      password: {
        type: String,

        required: function () {
                  return (this.provider === "local");},

        select: false,
},

      provider: {
        type: String,
        enum: [
          "local",
          "google",
        ],
        default: "local",
      },

      googleId: {
        type: String,
      },

      avatar: {
        type: String,
        default: "",
      },

      bio: {
        type: String,
        default: "",
      },

      isOnline: {
        type: Boolean,
        default: false,
      },

      lastSeen: {
        type: Date,
      },

      refreshToken: {
        type: String,
        select: false,
      },
    },
    {
      timestamps: true,
    }
  );


// HASH PASSWORD
userSchema.pre(
  "save",
  async function () {

    if (
      !this.isModified(
        "password"
      )
    ) {
      return;
    }

    this.password =
      await bcrypt.hash(
        this.password,
        12
      );

    
  }
);


// COMPARE PASSWORD
userSchema.methods.comparePassword =
  async function (
    enteredPassword
  ) {

    return await bcrypt.compare(
      enteredPassword,
      this.password
    );
  };


// ACCESS TOKEN
userSchema.methods
.generateAccessToken =
function () {

  return jwt.sign(
    {
      userId: this._id,
    },

    process.env
      .JWT_ACCESS_SECRET,

    {
      expiresIn: "15m",
    }
  );
};


// REFRESH TOKEN
userSchema.methods
.generateRefreshToken =
function () {

  return jwt.sign(
    {
      userId: this._id,
    },

    process.env
      .JWT_REFRESH_SECRET,

    {
      expiresIn: "7d",
    }
  );
};

const User =
  mongoose.model(
    "User",
    userSchema
  );

export default User;