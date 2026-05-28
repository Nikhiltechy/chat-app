import {
 create
}
from "zustand";

import chatService
from
"../services/chat.service";

import userService
from
"../services/user.service";

import
useSocketStore
from
"./socketStore";

import 
 useAuthStore

from
"./authStore";

const useChatStore =
create(
(set, get) => ({

  chats: [],

  users: [],

  selectedChat:
    null,

  messages: [],

  loading: false,


  fetchChats:
  async () => {

    try {

      set({
        loading:
          true
      });

      const token =
        useAuthStore
        .getState()
        .accessToken;

      const res =
        await chatService
        .getChats(
          token
        );

      set({

        chats:
          res.data
          .data,

        loading:
          false,
      });

    } catch {

      set({
        loading:
          false,
      });
    }
  },


  selectChat:
  async (chat) => {

    set({
      selectedChat:
        chat,
    });

    const token =
      useAuthStore
      .getState()
      .accessToken;

    const res =
      await chatService
      .getMessages(
        token,
        chat
        .conversationId
      );

    set({
      messages:
        res.data
        .data,
    });
  },


  sendMessage:
  async (text) => {

    const token =
      useAuthStore
      .getState()
      .accessToken;

    const selectedChat =
      get()
      .selectedChat;

    const res =
      await chatService
      .sendMessage(
        token,

        {
          conversationId:
            selectedChat
            .conversationId,

          text,
        }
      );

    set({
      messages: [

        ...get()
        .messages,

        res.data
        .data,
      ],
    });
  },

  listenMessages:
() => {

  const socket =
    useSocketStore
    .getState()
    .socket;

  if (!socket)
    return;

  // avoid duplicate listeners
  socket.off(
    "newMessage"
  );

  socket.on(
    "newMessage",

    (
      message
    ) => {

      console.log(
        "NEW MESSAGE:",
        message
      );

      set({
        messages: [

          ...get()
          .messages,

          message,
        ],
      });
    }
  );
},

fetchUsers:
async () => {

 const token =
 useAuthStore
 .getState()
 .accessToken;

 const res =
 await userService
 .getUsers(
   token
 );

 set({
   users:
   res.data
   .data
 });
},

startConversation:
async (
 targetUserId
) => {

 const token =
 useAuthStore
 .getState()
 .accessToken;

 const res =
 await chatService
 .startChat(
   token,
   targetUserId
 );

 await get()
 .fetchChats();

 const newChat =
 get()
 .chats.find(
  chat =>
   chat.user
   ._id
   ===
   targetUserId
 );

 if (
   newChat
 ) {

   get()
   .selectChat(
     newChat
   );
 }
},

}));



export default useChatStore;