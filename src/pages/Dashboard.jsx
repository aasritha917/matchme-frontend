"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { Avatar } from "../components/ui/Avatar"
import { Badge } from "../components/ui/Badge"

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate("/login")
      return
    }

    // Simulate loading matches
    setTimeout(() => {
      setMatches([
        {
          id: 1,
          name: "Sarah Johnson",
          age: 25,
          location: "New York",
          profession: "Designer",
          matchPercentage: 92,
          photo: "/placeholder.svg?height=200&width=200",
          interests: ["Travel", "Photography", "Yoga"],
        },
        {
          id: 2,
          name: "Emily Davis",
          age: 28,
          location: "Los Angeles",
          profession: "Teacher",
          matchPercentage: 88,
          photo: "/placeholder.svg?height=200&width=200",
          interests: ["Reading", "Hiking", "Cooking"],
        },
        {
          id: 3,
          name: "Jessica Wilson",
          age: 26,
          location: "Chicago",
          profession: "Engineer",
          matchPercentage: 85,
          photo: "/placeholder.svg?height=200&width=200",
          interests: ["Technology", "Music", "Fitness"],
        },
      ])
      setLoading(false)
    }, 1000)
  }, [user, navigate])

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  const handleLike = (matchId) => {
    console.log("Liked user:", matchId)
    // Handle like logic here
  }

  const handlePass = (matchId) => {
    console.log("Passed user:", matchId)
    setMatches(matches.filter((match) => match.id !== matchId))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your matches...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">💖</span>
              <span className="text-xl font-bold text-gray-900">MatchMe</span>
            </div>

            <nav className="hidden md:flex space-x-8">
              <button className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium">Discover</button>
              <button
                onClick={() => navigate("/matches")}
                className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium"
              >
                Matches
              </button>
              <button
                onClick={() => navigate("/chat")}
                className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium"
              >
                Messages
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium"
              >
                Profile
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Avatar
                  src={user?.photos?.[0]?.url || "/placeholder.svg?height=32&width=32&query=user+avatar"}
                  alt={user?.name}
                  className="h-8 w-8"
                />
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 bg-transparent"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}! 👋</h1>
          <p className="text-gray-600">Here are some people you might be interested in</p>
        </div>

        {/* Matches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <Card key={match.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img src={match.photo || "/placeholder.svg"} alt={match.name} className="w-full h-64 object-cover" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white">{match.matchPercentage}% Match</Badge>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{match.name}</h3>
                  <span className="text-gray-500">{match.age}</span>
                </div>

                <div className="text-gray-600 mb-2">
                  <p>{match.profession}</p>
                  <p className="text-sm">{match.location}</p>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {match.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex-1 text-gray-600 hover:text-gray-900 bg-transparent"
                    onClick={() => handlePass(match.id)}
                  >
                    Pass
                  </Button>
                  <Button
                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white"
                    onClick={() => handleLike(match.id)}
                  >
                    Like ❤️
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {matches.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No more matches for now</h3>
            <p className="text-gray-600 mb-4">Check back later for more potential matches!</p>
            <Button onClick={() => window.location.reload()} className="bg-pink-500 hover:bg-pink-600 text-white">
              Refresh Matches
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard
