"use client"

import { useState, useEffect, useRef } from "react"
import { useSocket } from "../../context/SocketContext"
import { useAuth } from "../../context/AuthContext"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Avatar } from "../ui/Avatar"
import MessageBubble from "./MessageBubble"
import TypingIndicator from "./TypingIndicator"
import { Send, Phone, Video, MoreVertical } from "lucide-react"

const ChatWindow = ({ selectedChat, messages, setMessages }) => {
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [otherUserTyping, setOtherUserTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const { socket } = useSocket()
  const { user } = useAuth()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (socket) {
      // Join chat room
      socket.emit("joinChat", selectedChat.id)

      // Listen for new messages
      socket.on("newMessage", (message) => {
        setMessages((prev) => [...prev, message])
      })

      // Listen for typing indicators
      socket.on("userTyping", ({ userId, isTyping }) => {
        if (userId === selectedChat.id) {
          setOtherUserTyping(isTyping)
        }
      })

      return () => {
        socket.off("newMessage")
        socket.off("userTyping")
      }
    }
  }, [socket, selectedChat.id, setMessages])

  const handleSendMessage = () => {
    if (newMessage.trim() && socket) {
      const messageData = {
        chatId: selectedChat.id,
        content: newMessage,
        timestamp: new Date().toISOString(),
      }

      socket.emit("sendMessage", messageData)
      setNewMessage("")
      setIsTyping(false)
    }
  }

  const handleTyping = (value) => {
    setNewMessage(value)

    if (socket) {
      if (value && !isTyping) {
        setIsTyping(true)
        socket.emit("typing", { chatId: selectedChat.id, isTyping: true })
      } else if (!value && isTyping) {
        setIsTyping(false)
        socket.emit("typing", { chatId: selectedChat.id, isTyping: false })
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="border-b p-4 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-10 w-10">
                <img src={selectedChat.avatar || "/placeholder.svg"} alt={selectedChat.name} />
              </Avatar>
              {selectedChat.online && (
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{selectedChat.name}</h3>
              <p className="text-sm text-gray-500">
                {selectedChat.online ? "Online now" : "Last seen 1h ago"} • {selectedChat.matchPercentage}% match
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderId === (user?.id || "me")}
            avatar={message.senderId === (user?.id || "me") ? user?.avatar : selectedChat.avatar}
          />
        ))}

        {otherUserTyping && <TypingIndicator name={selectedChat.name} avatar={selectedChat.avatar} />}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t p-4 bg-white dark:bg-gray-800">
        <div className="flex space-x-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => handleTyping(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} className="bg-pink-500 hover:bg-pink-600" disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
