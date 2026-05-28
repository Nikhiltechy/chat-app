import { useEffect } from "react";
import { LogOut } from "lucide-react";

import  useAuthStore  from "../store/authStore";
import  useChatStore  from "../store/chatStore";

import MessageInput from "../components/MessageInput";
import useSocketStore from "../store/socketStore";
function ChatPage() {
const socket =
useSocketStore(
  (state) =>
  state.socket
);

  const { user, logout } =
    useAuthStore();
const {
  chats,
  users,
  fetchChats,
  fetchUsers,
  startConversation,
  selectedChat,
  selectChat,
  messages,
  listenMessages,
} = useChatStore();

  useEffect(() => {
    fetchChats();
    fetchUsers();
  }, []);

  useEffect(() => {

  if (socket) {
    listenMessages();
  }

}, [socket]);

  return (
    <div className="h-screen bg-gray-100 p-4">

      <div
        className="
        h-full
        bg-white
        rounded-[28px]
        shadow-sm
        overflow-hidden
        flex
      "
      >

        {/* Sidebar */}

        <div
          className="
          w-[340px]
          border-r
          bg-gray-50
          flex
          flex-col
        "
        >

          {/* Profile */}

          <div
            className="
            p-5
            border-b
            flex
            items-center
            justify-between
          "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                w-12
                h-12
                rounded-full
                bg-black
                text-white
                flex
                items-center
                justify-center
                font-bold
              "
              >
                {user?.name?.[0]}
              </div>

              <div>
                <h2 className="font-semibold">
                  {user?.name}
                </h2>

                <p
                  className="
                  text-sm
                  text-gray-500
                "
                >
                  Online
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="
              p-2
              hover:bg-gray-200
              rounded-xl
              transition
            "
            >
              <LogOut size={20} />
            </button>
          </div>

          {/* Search */}

          <div className="p-4">

            <input
              placeholder="Search chats..."
              className="
              w-full
              bg-white
              border
              rounded-2xl
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-black
            "
            />
          </div>

          <h2
 className="
 text-sm
 font-semibold
 text-gray-500
 mb-2
 px-2
"
>
Start New Chat
</h2>

<div
 className="
 mb-4
 space-y-2
"
>

{users.map(
 (user) => (

  <div

   key={user._id}

   onClick={() =>
   startConversation(
    user._id
   )}

   className="
   p-3
   rounded-xl
   hover:bg-gray-200
   cursor-pointer
   flex
   items-center
   gap-3
  "
  >

   <div
    className="
    w-10
    h-10
    rounded-full
    bg-gray-300
    flex
    items-center
    justify-center
    font-bold
   "
   >
    {user.name[0]}
   </div>

   <span>
    {user.name}
   </span>

  </div>
 )
)}

</div>

          {/* Chat List */}

          <div
            className="
            flex-1
            overflow-y-auto
            px-3
          "
          >

            {chats.map(
              (chat) => (

                <div
                  key={
                    chat.conversationId
                  }

                  onClick={() =>
                    selectChat(chat)
                  }

                  className={`
                    flex
                    items-center
                    gap-3
                    p-3
                    rounded-2xl
                    cursor-pointer
                    mb-2
                    transition

                    ${
                      selectedChat
                        ?.conversationId
                      ===
                      chat
                      .conversationId

                        ? "bg-black text-white"

                        : "hover:bg-gray-200"
                    }
                  `}
                >

                  <div
                    className="
                    relative
                  "
                  >

                    <div
                      className="
                      w-12
                      h-12
                      rounded-full
                      bg-gray-300
                      flex
                      items-center
                      justify-center
                      font-bold
                    "
                    >
                      {
                        chat.user.name[0]
                      }
                    </div>

                    {chat.user
                      .isOnline && (

                      <div
                        className="
                        absolute
                        bottom-0
                        right-0
                        w-3
                        h-3
                        bg-green-500
                        border-2
                        border-white
                        rounded-full
                      "
                      />
                    )}

                  </div>

                  <div
                    className="
                    flex-1
                    overflow-hidden
                  "
                  >

                    <h3
                      className="
                      font-semibold
                    "
                    >
                      {
                        chat.user.name
                      }
                    </h3>

                    <p
                      className="
                      text-sm
                      truncate
                      opacity-70
                    "
                    >
                      {
                        chat
                        .lastMessage
                        ?.text
                      }
                    </p>
                  </div>

                </div>
              )
            )}

          </div>
        </div>


        {/* Chat Section */}

        <div
          className="
          flex-1
          flex
          flex-col
        "
        >

          {selectedChat ? (

            <>

              {/* Header */}

              <div
                className="
                border-b
                px-6
                py-4
                flex
                items-center
                gap-3
              "
              >

                <div
                  className="
                  w-12
                  h-12
                  rounded-full
                  bg-gray-300
                  flex
                  items-center
                  justify-center
                  font-bold
                "
                >
                  {
                    selectedChat
                    .user
                    .name[0]
                  }
                </div>

                <div>
                  <h2
                    className="
                    font-semibold
                    text-lg
                  "
                  >
                    {
                      selectedChat
                      .user
                      .name
                    }
                  </h2>

                  <p
                    className="
                    text-sm
                    text-gray-500
                  "
                  >
                    {
                      selectedChat
                      .user
                      .isOnline

                        ? "Online"

                        : "Offline"
                    }
                  </p>
                </div>

              </div>


              {/* Messages */}

              <div
                className="
                flex-1
                overflow-y-auto
                px-6
                py-4
                space-y-4
                bg-gray-50
              "
              >

                {messages.map(
                  (msg) => {

                    const isMine =
                      msg.senderId
                      ._id ===
                      user._id;

                    return (

                      <div
                        key={
                          msg._id
                        }

                        className={`
                          flex
                          ${
                            isMine

                              ? "justify-end"

                              : "justify-start"
                          }
                        `}
                      >

                        <div
                          className={`
                            max-w-sm
                            px-5
                            py-3
                            rounded-[24px]
                            shadow-sm

                            ${
                              isMine

                                ? "bg-black text-white rounded-br-md"

                                : "bg-white rounded-bl-md"
                            }
                          `}
                        >

                          {msg.text}

                        </div>
                      </div>
                    );
                  }
                )}

              </div>

              <MessageInput />

            </>

          ) : (

            <div
              className="
              flex-1
              flex
              flex-col
              items-center
              justify-center
              text-gray-500
            "
            >

              <h2
                className="
                text-3xl
                font-semibold
                mb-2
              "
              >
                Welcome 👋
              </h2>

              <p>
                Select a chat to start messaging
              </p>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default ChatPage;