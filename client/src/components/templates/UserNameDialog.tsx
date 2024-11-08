import React, { useRef } from "react"
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogNotAllowOverlayContent,
} from "@atoms/Dialog"
import { useUserNameDialog } from "@context/dialog"

const UserNameDialog: React.FC = () => {
  const userNameRef = useRef<HTMLInputElement>(null)
  const { opened, onClose, setUserName } = useUserNameDialog()

  const handleKeydown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault() // Enter 키로 인해 다이얼로그가 닫히지 않도록 함
      submit()
    }
  }

  const submit = () => {
    if (userNameRef.current?.value) {
      setUserName(userNameRef.current!.value)
      onClose()
    }
  }
  return (
    opened && (
      <Dialog open={opened} onOpenChange={onClose}>
        <DialogNotAllowOverlayContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">USER NAME</DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex-col flex md:flex-row md:items-center gap-2 mt-2 text-gray-700 border">
            <span>사용자 이름: </span>
            <input
              type="text"
              ref={userNameRef}
              className="flex-1"
              onKeyDown={handleKeydown}
            />
            <button onClick={submit}>전송</button>
          </DialogDescription>
        </DialogNotAllowOverlayContent>
      </Dialog>
    )
  )
}

export default UserNameDialog
