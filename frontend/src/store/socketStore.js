import {
 create
}
from "zustand";

import socket
from
"../socket/socket";

const
useSocketStore =
create(
(set) => ({

  socket: null,

  onlineUsers:
    [],


connectSocket:
(
 userId
) => {

 if (
  !socket.connected
 ) {

  socket.connect();
 }

 socket.off(
  "connect"
 );

 socket.on(
  "connect",

  () => {

   console.log(
    "JOINING:",
    userId
   );

   socket.emit(
    "join",
    userId
   );
  }
 );

 socket.off(
  "onlineUsers"
 );

 socket.on(
  "onlineUsers",

  (
   users
  ) => {

   set({
    onlineUsers:
      users,
   });
  }
 );

 set({
  socket,
 });
},


  disconnectSocket:
  () => {

    socket.disconnect();

    set({

      socket:
        null,

      onlineUsers:
        [],
    });
  },

}));

export default
useSocketStore;