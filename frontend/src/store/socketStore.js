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

  socket:
    null,

  onlineUsers:
    [],


  connectSocket:
  (
    userId
  ) => {

    socket.connect();

    socket.emit(
      "join",
      userId
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
    });
  },

}));

export default
useSocketStore;