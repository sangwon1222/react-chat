import ReactDOM from "react-dom/client"
import { App } from "./App"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { UserNameDialogProvider } from "@context/dialog"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <UserNameDialogProvider>
      <App />
    </UserNameDialogProvider>
  </QueryClientProvider>,
)
