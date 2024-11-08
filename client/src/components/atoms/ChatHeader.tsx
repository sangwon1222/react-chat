export const ChatHeader: React.FC<{ userCount: number }> = ({ userCount }) => {
  return (
    <h1 className="text-2xl md:text-3xl  font-bold text-center">
      테스트 채팅 [인원 수: {userCount}]
    </h1>
  )
}
