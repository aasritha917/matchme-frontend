"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useSocket } from "./SocketContext"
import toast from "react-hot-toast"

const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const { socket } = useSocket()

  useEffect(() => {
    if (socket) {
      socket.on("newMatch", (data) => {
        toast.success(`🎉 New match with ${data.user.name}!`)
        addNotification({
          type: "match",
          title: "New Match!",
          message: `You matched with ${data.user.name}`,
          data: data,
        })
      })

      socket.on("newMessage", (data) => {
        toast.success(`💬 New message from ${data.sender.name}`)
        addNotification({
          type: "message",
          title: "New Message",
          message: `${data.sender.name}: ${data.content}`,
          data: data,
        })
      })

      socket.on("profileView", (data) => {
        addNotification({
          type: "view",
          title: "Profile View",
          message: `${data.viewer.name} viewed your profile`,
          data: data,
        })
      })

      socket.on("superLike", (data) => {
        toast.success(`⭐ ${data.user.name} super liked you!`)
        addNotification({
          type: "superlike",
          title: "Super Like!",
          message: `${data.user.name} super liked you`,
          data: data,
        })
      })

      return () => {
        socket.off("newMatch")
        socket.off("newMessage")
        socket.off("profileView")
        socket.off("superLike")
      }
    }
  }, [socket])

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      timestamp: new Date(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])
    setUnreadCount((prev) => prev + 1)
  }

  const markAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === notificationId ? { ...notification, read: true } : notification)),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    setUnreadCount(0)
  }

  const clearNotifications = () => {
    setNotifications([])
    setUnreadCount(0)
  }

  const value = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}
