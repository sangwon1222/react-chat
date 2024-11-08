import { useUserNameDialog } from "@context/dialog"
import { useEffect, useRef } from "react"

export const ChatList: React.FC<{
  chatList: { id: string; message: string }[]
}> = ({ chatList }) => {
  const { userName } = useUserNameDialog()
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const lastMessageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
    if (lastMessageRef.current) {
      lastMessageRef.current.classList.add("animate-pulse-fast")
      const timeout = setTimeout(() => {
        lastMessageRef.current?.classList.remove("animate-pulse-fast")
      }, 500)

      return () => clearTimeout(timeout)
    }
  }, [chatList])

  const setJustifyByUserId = (userId: string) => {
    if (userId === "") return "justify-center"
    if (userId === userName) return "justify-end"
    if (userId !== userName) return "justify-start"
  }
  return (
    <div
      ref={chatContainerRef}
      className="flex flex-col gap-2 border-2 border-black w-full overflow-y-auto h-60 px-4"
    >
      {chatList.map(({ id, message }, index) => (
        <div
          key={`${index}th-${id}`}
          className={`flex gap-6 w-full ${setJustifyByUserId(id)}`}
          ref={index === chatList.length - 1 ? lastMessageRef : null}
        >
          {id ? (
            <>
              <p
                className={`${id === userName ? "bg-blue-200 flex-row-reverse" : ""} rounded p-2`}
              >
                {id} :
              </p>
              <p
                className={`${id === userName ? "bg-gray-200" : "bg-gray-200"} rounded p-2`}
              >
                {message}
              </p>
            </>
          ) : (
            <p className="rounded bg-blue-300 py-2 w-[80%] text-center">
              {message}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
