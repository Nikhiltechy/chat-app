import Conversation
from "../models/conversation.model.js";

import Message
from "../models/message.model.js";

import ApiError
from "../utils/ApiError.js";

import {
 getIO,
 getReceiverSocketId
}
from
"../socket/socket.js";

const startConversation =
async (
  currentUserId,
  targetUserId
) => {

  if (
    !targetUserId
  ) {
    throw new ApiError(
      400,
      "Target user required"
    );
  }

  // existing conversation
  let conversation =
    await Conversation.findOne({
      participants: {
        $all: [
          currentUserId,
          targetUserId,
        ],
      },
    });

  if (
    conversation
  ) {
    return conversation;
  }

  // create
  conversation =
    await Conversation.create({
      participants: [
        currentUserId,
        targetUserId,
      ],
    });

  return conversation;
};

const sendMessage =
async (
  senderId,
  conversationId,
  text
) => {

  if (
    !conversationId ||
    !text?.trim()
  ) {
    throw new ApiError(
      400,
      "Conversation and message required"
    );
  }

  // check conversation
  const conversation =
    await Conversation.findById(
      conversationId
    );

  if (!conversation) {
    throw new ApiError(
      404,
      "Conversation not found"
    );
  }

  // create message
  const message =
    await Message.create({
      conversationId,
      senderId,
      text,
    });

  // update last message
  conversation.lastMessage =
    message._id;

    conversation.updatedAt =
  new Date();

  await conversation.save({
    validateBeforeSave:
      false,
  });

 const populatedMessage =
 await Message
.findById(
 message._id
)
.populate(
 "senderId",
 "name email avatar"
);

// receiver
const receiverId =
  conversation
  .participants
  .find(
    (
      id
    ) =>
      id.toString()
      !==
      senderId
      .toString()
  );

const receiverSocketId =
 getReceiverSocketId(
  receiverId
 );

if (
 receiverSocketId
) {

 getIO().to(
   receiverSocketId
 )
 .emit(
   "newMessage",
   populatedMessage
 );
}

return populatedMessage;
};

const getMessages =
async (
  conversationId
) => {

  const messages =
    await Message.find({
      conversationId,
    })

    .sort({
      createdAt: 1,
    })

    .populate(
      "senderId",
      "name email avatar"
    );

  return messages;
};

const getMyConversations =
async (userId) => {

  const conversations =
    await Conversation
      .find({
        participants:
          userId,
      })

      .populate(
        "participants",
        "name email avatar isOnline"
      )

      .populate(
        "lastMessage"
      )

      .sort({
        updatedAt: -1,
      });

  return conversations.map(
    (
      conversation
    ) => {

      const otherUser =
        conversation
        .participants
        .find(
          (
            participant
          ) =>
            participant
            ._id
            .toString()
            !==
            userId
            .toString()
        );

      return {
        conversationId:
          conversation._id,

        user:
          otherUser,

        lastMessage:
          conversation
          .lastMessage,

        updatedAt:
          conversation
          .updatedAt,
      };
    }
  );
};

export default {
startConversation, sendMessage, getMessages, getMyConversations,
};