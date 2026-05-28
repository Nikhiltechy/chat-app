import api
from "../api/axios";

const getChats =
(token) => {

  return api.get(
    "/chat",
    {
      headers: {
        Authorization:
        `Bearer ${token}`,
      },
    }
  );
};

const startChat =
(
 token,
 targetUserId
) => {

  return api.post(
    "/chat/start",

    {
      targetUserId,
    },

    {
      headers: {
        Authorization:
        `Bearer ${token}`,
      },
    }
  );
};

const getMessages =
(
 token,
 conversationId
) => {

  return api.get(
    `/chat/messages/${conversationId}`,

    {
      headers: {
        Authorization:
        `Bearer ${token}`,
      },
    }
  );
};

const sendMessage =
(
 token,
 data
) => {

  return api.post(
    "/chat/send",
    data,

    {
      headers: {
        Authorization:
        `Bearer ${token}`,
      },
    }
  );
};

export default {
  getChats,
  startChat,
  getMessages,
  sendMessage,
};