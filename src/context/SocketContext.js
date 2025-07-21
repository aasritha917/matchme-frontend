"use client"

import { createContext, useContext, useEffect, useState } from "react"
import io from "socket.io-client"
import { useAuth } from "./AuthContext"

const SocketContext = createContext()

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider")
  }
  return context
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const newSocket = io(process.env.REACT_APP_SERVER_URL || "http://localhost:5000", {
        auth: {
          token: localStorage.getItem("token"),
        },
      })

      newSocket.on("connect", () => {
        console.log("Connected to server")
      })

      newSocket.on("onlineUsers", (users) => {
        setOnlineUsers(users)
      })

      newSocket.on("disconnect", () => {
        console.log("Disconnected from server")
      })

      setSocket(newSocket)

      return () => {
        newSocket.close()
      }
    }
  }, [user])

  const value = {
    socket,
    onlineUsers,
  }

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}
