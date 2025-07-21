"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { authService } from "../services/authService"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token")
      if (token) {
        const userData = await authService.getCurrentUser()
        setUser(userData.user)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      localStorage.removeItem("token")
    } finally {
      setLoading(false)
    }
  }

  const register = async (userData) => {
    try {
      console.log("AuthContext: Registering user with data:", userData)
      const response = await authService.register(userData)

      if (response.success) {
        localStorage.setItem("token", response.data.token)
        setUser(response.data.user)
        setIsAuthenticated(true)
        return { success: true, user: response.data.user }
      }

      return { success: false, message: response.message }
    } catch (error) {
      console.error("Registration error in AuthContext:", error)
      return { success: false, message: error.message }
    }
  }

  const login = async (credentials) => {
    try {
      console.log("AuthContext: Logging in user with credentials:", credentials)
      const response = await authService.login(credentials)

      if (response.success) {
        localStorage.setItem("token", response.data.token)
        setUser(response.data.user)
        setIsAuthenticated(true)
        return { success: true, user: response.data.user }
      }

      return { success: false, message: response.message }
    } catch (error) {
      console.error("Login error in AuthContext:", error)
      return { success: false, message: error.message }
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("token")
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const forgotPassword = async (email) => {
    try {
      const response = await authService.forgotPassword(email)
      return response
    } catch (error) {
      console.error("Forgot password error:", error)
      return { success: false, message: error.message }
    }
  }

  const resetPassword = async (token, password) => {
    try {
      const response = await authService.resetPassword(token, password)
      return response
    } catch (error) {
      console.error("Reset password error:", error)
      return { success: false, message: error.message }
    }
  }

  const value = {
    user,
    loading,
    isAuthenticated,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    checkAuthStatus,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
