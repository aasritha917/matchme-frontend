"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { Card } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { Badge } from "../components/ui/Badge"
import { Avatar } from "../components/ui/Avatar"
import { Heart, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

const Matches = () => {
  const { user } = useAuth()
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMatches()
  }, [])

  const fetchMatches = async () => {
    try {
      setLoading(true)
      // Mock data for now - replace with actual API call
      const mockMatches = [
        {
          id: "match_1",
          userId: "user_2",
          name: "Sarah Johnson",
          age: 26,
          location: "New York",
          photos: [{ url: "/placeholder.svg?height=100&width=100", isPrimary: true }],
          lastMessage: "Hey! How's your day going?",
          lastMessageTime: new Date(Date.now() - 3600000).toISOString(),
          unreadCount: 2,
          matchedAt: new Date(Date.now() - 86400000).toISOString(),
          isOnline: true,
        },
        {
          id: "match_2",
          userId: "user_3",
          name: "Emily Davis",
          age: 24,
          location: "Los Angeles",
          photos: [{ url: "/placeholder.svg?height=100&width=100", isPrimary: true }],
          lastMessage: "That sounds like a great plan!",
          lastMessageTime: new Date(Date.now() - 7200000).toISOString(),
          unreadCount: 0,
          matchedAt: new Date(Date.now() - 172800000).toISOString(),
          isOnline: false,
        },
        {
          id: "match_3",
          userId: "user_4",
          name: "Jessica Wilson",
          age: 28,
          location: "Chicago",
          photos: [{ url: "/placeholder.svg?height=100&width=100", isPrimary: true }],
          lastMessage: "See you tomorrow!",
          lastMessageTime: new Date(Date.now() - 86400000).toISOString(),
          unreadCount: 1,
          matchedAt: new Date(Date.now() - 259200000).toISOString(),
          isOnline: true,
        },
      ]
      setMatches(mockMatches)
    } catch (error) {
      console.error("Error fetching matches:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  const handleChatClick = (match) => {
    // Navigate to chat - you'll need to implement routing
    console.log("Opening chat with:", match.name)
  }

  const handleUnmatch = async (matchId) => {
    try {
      // API call to unmatch
      console.log("Unmatching:", matchId)
      setMatches(matches.filter((match) => match.id !== matchId))
    } catch (error) {
      console.error("Error unmatching:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-pink-600">Loading matches...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100">
      {/* Header */}
      
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-pink-600 dark:hover:text-gray"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>
            <h1 className="text-2xl font-bold text-pink-600">Your Matches</h1>
            <Badge className="bg-pink-100 text-pink-700">{matches.length} matches</Badge>
          </div>
        </div>
      </div>
      

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        {matches.length === 0 ? (
          <Card className="p-8 text-center bg-white border-pink-200">
            <div className="text-pink-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Matches Yet</h3>
            <p className="text-gray-600 mb-4">Start swiping to find your perfect match!</p>
            <Button className="bg-pink-500 hover:bg-pink-600 text-white">Start Matching</Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {matches.map((match) => (
              <Card key={match.id} className="p-4 bg-white border-pink-200 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4">
                  {/* Profile Picture */}
                  <div className="relative">
                    <Avatar className="w-16 h-16">
                      {match.photos && match.photos.length > 0 ? (
                        <img
                          src={match.photos.find((p) => p.isPrimary)?.url || match.photos[0]?.url}
                          alt={match.name}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-pink-300 text-pink-700 flex items-center justify-center text-xl font-semibold">
                          {match.name.charAt(0)}
                        </div>
                      )}
                    </Avatar>
                    {match.isOnline && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  {/* Match Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {match.name}, {match.age}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {match.unreadCount > 0 && (
                          <Badge className="bg-pink-500 text-white text-xs">{match.unreadCount}</Badge>
                        )}
                        <span className="text-sm text-gray-500">{formatTime(match.lastMessageTime)}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mb-1">{match.location}</p>

                    {match.lastMessage && <p className="text-sm text-gray-600 truncate">{match.lastMessage}</p>}

                    <p className="text-xs text-gray-400 mt-1">Matched {formatTime(match.matchedAt)}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col space-y-2">
                    <Button
                      onClick={() => handleChatClick(match)}
                      className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 text-sm"
                    >
                      Chat
                    </Button>
                    <Button
                      onClick={() => handleUnmatch(match.id)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 text-sm"
                    >
                      Unmatch
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Matches
