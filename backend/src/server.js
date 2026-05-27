import dotenv
from "dotenv";

import http
from "http";

import app
from "./app.js";

import connectDB
from "./config/db.js";

import {
  initSocket,
} from
"./socket/socket.js";

dotenv.config();

const startServer =
async () => {

  try {

    await connectDB();

    const PORT =
      process.env.PORT
      || 5000;

    // create http server
    const server =
      http.createServer(
        app
      );

    // initialize socket
    initSocket(server);

    // listen with server
    server.listen(
      PORT,
      () => {

        console.log(
          `Server running on port ${PORT}`
        );
      }
    );

  } catch (error) {

    console.error(
      "Server startup failed:",
      error
    );
  }
};

startServer();