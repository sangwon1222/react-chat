import { PropsWithChildren, useMemo, useState } from "react"
import { UserNameDialogContext } from "./context"

export const UserNameDialogProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [userName, setUserName] = useState("")
  const [opened, setOpen] = useState(true)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)

  const value = useMemo(
    () => ({ userName, setUserName, opened, onOpen, onClose }),
    [opened],
  )
  return (
    <UserNameDialogContext.Provider value={value}>
      {" "}
      {children}
    </UserNameDialogContext.Provider>
  )
}
