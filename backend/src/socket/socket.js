import {
 Server
}
from "socket.io";

let io;

// online users
const onlineUsers =
  new Map();

export const initSocket =
(server) => {

  io =
    new Server(
      server,
      {
        cors: {
          origin:
            process.env
            .CLIENT_URL,

          credentials:
            true,
        },
      }
    );

  io.on(
    "connection",
    (socket) => {

      console.log(
        "User connected:",
        socket.id
      );

      // user joins
      socket.on(
        "join",
        (userId) => {

          onlineUsers.set(
            userId,
            socket.id
          );
          io.emit(
  "onlineUsers",
  Array.from(
    onlineUsers.keys()
  )
);

          console.log(
            "Online users:",
            onlineUsers
          );
        }
      );

      // disconnect
      socket.on(
        "disconnect",
        () => {

          for (
            const [
              userId,
              socketId,
            ]
            of onlineUsers
          ) {

            if (
              socketId ===
              socket.id
            ) {

              onlineUsers
              .delete(
                userId
              );

              io.emit(
  "onlineUsers",
  Array.from(
    onlineUsers.keys()
  )
);

              break;
            }
          }

          console.log(
            "Disconnected:",
            socket.id
          );
        }
      );
    }
  );

  return io;
};

export const getIO =
() => io;

export const
getReceiverSocketId =
(userId) => {

  return onlineUsers
    .get(userId);
};