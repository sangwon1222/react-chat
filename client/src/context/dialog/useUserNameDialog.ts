import { useContext } from "react"
import { UserNameDialogContext } from "./context"

export const useUserNameDialog = () => {
  const context = useContext(UserNameDialogContext)
  if (!context)
    throw new Error(
      "useUserNameDialog must be used within a UserNameDialogProvider",
    )

  return context
}
