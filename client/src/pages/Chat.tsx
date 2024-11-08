import { useUserNameDialog } from "@context/dialog"
import { useChat } from "@hooks/user/useChat"
import { ChatList } from "@templates/ChatList"
import { ChatHeader } from "@atoms/ChatHeader"

import { useRef } from "react"

export const Chat: React.FC = () => {
  const chatInputRef = useRef<HTMLInputElement>(null)
  const { userName } = useUserNameDialog()
  const { userList, send, inputValue, updateInputValue, chatList } = useChat()

  const sendWithFocusInput = () => {
    send()
    chatInputRef?.current?.focus()
  }

  return (
    <>
      <ChatHeader userCount={userList.userCount} />

      <div className="flex flex-col p-10 gap-10">
        <ChatList chatList={chatList} />
        <div className="flex justify-between text-center mt-4 gap-10">
          <div className="flex gap-4 flex-1">
            <div className="flex items-center text-center font-bold w-fit min-w-9">
              {userName}:
            </div>
            <input
              ref={chatInputRef}
              value={inputValue}
              onChange={(e) => updateInputValue(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" ? sendWithFocusInput() : null
              }
              type="text"
              className="border-2 border-black rounded-xl flex-1"
            />
          </div>
          <button
            className="w-36 bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={sendWithFocusInput}
          >
            전송
          </button>
        </div>
      </div>
    </>
  )
}
