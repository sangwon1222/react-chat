import { createContext } from "react"

interface UserNameDialogContext {
  userName: string
  setUserName: (v: string) => void
  opened: boolean
  onOpen: () => void
  onClose: () => void
}

export const UserNameDialogContext =
  createContext<UserNameDialogContext | null>(null)
