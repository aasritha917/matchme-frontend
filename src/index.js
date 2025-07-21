import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { AuthProvider } from "./context/AuthContext"
import { SocketProvider } from "./context/SocketContext"
import { NotificationProvider } from "./context/NotificationContext"
import { ThemeProvider } from "./context/ThemeContext"
import { Toaster } from "react-hot-toast"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <SocketProvider>
          <NotificationProvider>
            <App />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
                success: {
                  duration: 3000,
                  theme: {
                    primary: "#4aed88",
                  },
                },
                error: {
                  duration: 4000,
                  theme: {
                    primary: "#ff6b6b",
                  },
                },
              }}
            />
          </NotificationProvider>
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
