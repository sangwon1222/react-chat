import UserNameDialog from "./components/templates/UserNameDialog"
import { Chat } from "@pages/Chat"

export const App: React.FC = () => {
  return (
    <div className="p-6 border-2 min-w-[320px]">
      {/* 채팅 */}
      <Chat />

      {/* 초기 유저 이름 설정 Dialog */}
      <UserNameDialog />
    </div>
  )
}
