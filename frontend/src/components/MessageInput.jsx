import {
 useState
}
from "react";

import 
 useChatStore

from
"../store/chatStore";

function
MessageInput() {

  const [text,
    setText] =
    useState("");

  const sendMessage =
    useChatStore(
      (
        state
      ) =>
      state
      .sendMessage
    );

  const handleSend =
  async () => {

    if (
      !text.trim()
    ) return;

    await sendMessage(
      text
    );

    setText("");
  };

  return (
    <div
      className="
      border-t
      p-4
      flex
      gap-2
    "
    >

      <input
        value={text}

        onChange={
          (e) =>
          setText(
            e.target
            .value
          )
        }

        onKeyDown={
 async (e) => {

  if (
   e.key ===
   "Enter"
  ) {

   e.preventDefault();

   await
   handleSend();
  }
 }
}

        className="
        flex-1
        border
        rounded-lg
        p-3
      "
      />

      <button
        onClick={
          handleSend
        }

        className="
        bg-black
        text-white
        px-6
        rounded-lg
      "
      >
        Send
      </button>
    </div>
  );
}

export default
MessageInput;