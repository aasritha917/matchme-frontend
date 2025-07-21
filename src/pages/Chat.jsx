"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Card } from "../components/ui/Card"
import { Avatar } from "../components/ui/Avatar"
import { Badge } from "../components/ui/Badge"
import ChatWindow from "../components/chat/ChatWindow"
import { Heart, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

// Mock data
const mockChats = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "That sounds like a great plan! When are you free?",
    timestamp: "2m ago",
    unread: 2,
    online: true,
    matchPercentage: 92,
  },
  {
    id: 2,
    name: "Emily Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I love hiking too! Have you been to Yosemite?",
    timestamp: "1h ago",
    unread: 0,
    online: false,
    matchPercentage: 88,
  },
  {
    id: 3,
    name: "Jessica Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for the book recommendation!",
    timestamp: "3h ago",
    unread: 1,
    online: true,
    matchPercentage: 85,
  },
]

const mockMessages = [
  {
    id: 1,
    senderId: 1,
    senderName: "Sarah Johnson",
    content: "Hi! I saw we matched. I love your hiking photos!",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: 2,
    senderId: "me",
    senderName: "You",
    content: "Thank you! I noticed you're into photography too. That's awesome!",
    timestamp: "10:32 AM",
    isOwn: true,
  },
  {
    id: 3,
    senderId: 1,
    senderName: "Sarah Johnson",
    content:
      "Yes! I actually just got back from a photography trip to the mountains. The sunrise shots were incredible.",
    timestamp: "10:35 AM",
    isOwn: false,
  },
  {
    id: 4,
    senderId: "me",
    senderName: "You",
    content:
      "That sounds amazing! I'd love to see some of those photos sometime. Maybe we could plan a hiking trip together?",
    timestamp: "10:37 AM",
    isOwn: true,
  },
  {
    id: 5,
    senderId: 1,
    senderName: "Sarah Johnson",
    content: "That sounds like a great plan! When are you free?",
    timestamp: "10:40 AM",
    isOwn: false,
  },
]

const Chat = () => {
  const { userId } = useParams()
  const [selectedChat, setSelectedChat] = useState(mockChats[0])
  const [messages, setMessages] = useState(mockMessages)

  useEffect(() => {
    if (userId) {
      const chat = mockChats.find((c) => c.id === Number.parseInt(userId))
      if (chat) {
        setSelectedChat(chat)
      }
    }
  }, [userId])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-pink-500" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Messages</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Chat List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Conversations</h2>
              </div>
              <div className="overflow-y-auto h-[calc(100vh-300px)]">
                <div className="space-y-1 p-4">
                  {mockChats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedChat.id === chat.id
                          ? "bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <img src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                          </Avatar>
                          {chat.online && (
                            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900 dark:text-white truncate">{chat.name}</p>
                            <div className="flex items-center space-x-1">
                              <Badge variant="secondary" className="text-xs">
                                {chat.matchPercentage}%
                              </Badge>
                              {chat.unread > 0 && (
                                <Badge className="bg-pink-500 text-white text-xs">{chat.unread}</Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                          <p className="text-xs text-gray-400 mt-1">{chat.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <ChatWindow selectedChat={selectedChat} messages={messages} setMessages={setMessages} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
