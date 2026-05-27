import asyncHandler
from "../utils/asyncHandler.js";

import chatService
from "../services/chat.service.js";

import ApiResponse
from "../utils/ApiResponse.js";

export const
startConversation =
asyncHandler(
  async (
    req,
    res
  ) => {

    const {
      targetUserId,
    } = req.body;

    const result =
      await chatService
      .startConversation(
        req.user._id,
        targetUserId
      );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Conversation started",
          result
        )
      );
  }
);

export const sendMessage =
asyncHandler(
  async (
    req,
    res
  ) => {

    const {
      conversationId,
      text,
    } = req.body;

    const result =
      await chatService
      .sendMessage(
        req.user._id,
        conversationId,
        text
      );

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          "Message sent",
          result
        )
      );
  }
);

export const getMessages =
asyncHandler(
  async (
    req,
    res
  ) => {

    const {
      conversationId,
    } = req.params;

    const result =
      await chatService
      .getMessages(
        conversationId
      );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Messages fetched",
          result
        )
      );
  }
);

export const
getMyConversations =
asyncHandler(
  async (
    req,
    res
  ) => {

    const result =
      await chatService
      .getMyConversations(
        req.user._id
      );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Chats fetched",
          result
        )
      );
  }
);