import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import Root from "./Root.tsx"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router-dom"
import { RecoilRoot } from "recoil"

const client = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <RecoilRoot>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  </StrictMode>,
)
