import express
from "express";

import protect
from "../middleware/auth.middleware.js";

import {
  startConversation,
  getMyConversations,
  sendMessage,
  getMessages,
}
from
"../controllers/chat.controller.js";

const router =
  express.Router();

router.post(
  "/start",
  protect,
  startConversation
);

router.get(
  "/",
  protect,
  getMyConversations
);

router.post(
  "/send",
  protect,
  sendMessage
);

router.get(
  "/messages/:conversationId",
  protect,
  getMessages
);

export default router;