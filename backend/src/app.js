import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";

import hpp from "hpp";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import errorMiddleware from "./middleware/error.middleware.js";
import notFound from "./middleware/notFound.middleware.js";

import authRoutes from "./routes/auth.routes.js";

import passport from "./auth/google.strategy.js";

const app = express();

app.use(helmet());

app.use(compression());



app.use(hpp());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.use(express.json());

app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/auth",authRoutes);
app.use(notFound);

app.use(errorMiddleware);

export default app;