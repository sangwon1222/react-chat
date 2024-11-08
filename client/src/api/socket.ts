import { io, Socket } from "socket.io-client"

const SOCKET_SERVER_URL = "http://localhost:3000"

let socket: Socket | null = null

// 소켓 초기화 함수
export const initializeSocket = () => {
  if (!socket) {
    socket = io(SOCKET_SERVER_URL, {
      withCredentials: false, // 쿠키나 인증 정보 전송 필요 시 설정
      autoConnect: true, // 자동 연결 방지 (원할 때 연결 가능)
    })

    // 연결 이벤트 리스너 추가
    socket.on("connect", () => {
      console.log("Socket connected:", socket?.id)
    })

    // 에러 이벤트 리스너 추가
    socket.on("connect_error", (error) => {
      console.error("Connection error:", error)
    })

    // 연결 해제 이벤트 리스너
    socket.on("disconnect", () => {
      console.log("Socket disconnected")
    })
  }

  return socket
}

// 소켓 연결 함수
export const connectSocket = () => {
  if (!socket) initializeSocket()
  socket?.connect()
  return socket
}

// 소켓 연결 해제 함수
export const disconnectSocket = () => {
  socket?.disconnect()
}

// 소켓 이벤트 수신 함수
export const onMessage = (event: string, callback: (data: any) => void) => {
  socket?.on(event, callback)
}

// 소켓 이벤트 전송 함수
export const emitMessage = (event: string, data: any) => {
  socket?.emit(event, data)
}
