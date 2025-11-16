import React from "react"
import  ReactDOM  from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>

    <App />
    <Toaster
  position="top-center"
  toastOptions={{
    style: {
      background: "#1e3a8a",
      color: "#fff",
      borderRadius: "8px",
      zIndex: 999999,
    },
    success: {
      style: { background: "#059669" },
    },
    error: {
      style: { background: "#dc2626" },
    },
  }}
/>


    </QueryClientProvider>
  </React.StrictMode>,
)
