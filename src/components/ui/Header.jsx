"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useNotification } from "../../context/NotificationContext"

const Header = () => {
  const { user, logout } = useAuth()
  const { unreadCount } = useNotification()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900">MatchMe</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className={`font-medium transition-colors ${
                isActive("/dashboard") ? "text-pink-600" : "text-gray-600 hover:text-pink-600"
              }`}
            >
              Discover
            </Link>
            <Link
              to="/matches"
              className={`font-medium transition-colors ${
                isActive("/matches") ? "text-pink-600" : "text-gray-600 hover:text-pink-600"
              }`}
            >
              Matches
            </Link>
            <Link
              to="/chat"
              className={`font-medium transition-colors relative ${
                isActive("/chat") ? "text-pink-600" : "text-gray-600 hover:text-pink-600"
              }`}
            >
              Messages
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>
            <Link
              to="/premium"
              className={`font-medium transition-colors ${
                isActive("/premium") ? "text-pink-600" : "text-gray-600 hover:text-pink-600"
              }`}
            >
              Premium
            </Link>
          </nav>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <img
                src={user?.profilePhoto || "/placeholder.svg?height=32&width=32"}
                alt={user?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="hidden md:block text-gray-700 font-medium">{user?.name}</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <hr className="my-2" />
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
