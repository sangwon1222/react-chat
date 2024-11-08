import { useEffect, useState } from "react"
import { connectSocket } from "@api/socket"
import { Socket } from "socket.io-client"
import { useUserNameDialog } from "@context/dialog"
import { useAtom } from "jotai"
import { chatAtom, userListAtom } from "@store/atom"

export const useChat = () => {
  const [inputValue, setInputState] = useState("")
  const [userList, setUserList] = useAtom(userListAtom)
  const [socket, setSocket] = useState<Socket | null>(null)
  const { userName } = useUserNameDialog()

  const [chatList, setChatList] = useAtom(chatAtom)

  useEffect(() => {
    // 소켓 초기화 및 Atom 업데이트
    if (!socket && userName) {
      const socket = connectSocket()
      setSocket(socket)

      socket!.on("incoming", ({ clientsCount, userName }) => {
        setUserList({ userCount: clientsCount })
        setChatList((prev) => [
          ...prev,
          { id: "", message: `[ ${userName} ]등장 !` },
        ])
      })

      socket!.emit("incoming-user-name", { userName })

      socket!.on("leave-user", ({ clientsCount }) => {
        console.log("leave-user", clientsCount)
        setUserList({ userCount: clientsCount })
      })

      socket!.on("welcome", ({ clientsCount }) => {
        console.log("welcome", clientsCount)
        setUserList({ userCount: clientsCount })
      })

      socket!.on("receive-message", ({ id, message }) => {
        setChatList((prev) => [...prev, { id, message }])
      })
    }

    return () => {
      // 컴포넌트가 언마운트되면 소켓 연결 해제
      socket?.disconnect()
    }
  }, [userName, setUserList])

  const send = () => {
    socket!.emit("send-message", { id: userName, message: inputValue })
    setInputState("")
  }

  const updateInputValue = (v: string) => setInputState(v)

  return { socket, userList, send, inputValue, updateInputValue, chatList }
}
