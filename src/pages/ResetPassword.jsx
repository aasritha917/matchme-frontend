"use client"

import { useState, useEffect } from "react"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import authService from "../services/authService"

const ResetPassword = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const token = searchParams.get("token")

  useEffect(() => {
    if (!token) {
      setError("Invalid reset token")
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!password || !confirmPassword) {
      setError("All fields are required")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await authService.resetPassword(token, password)
      if (response.success) {
        // Store the new token
        localStorage.setItem("token", response.data.token)
        navigate("/dashboard")
      }
    } catch (error) {
      setError(error.message || "Failed to reset password")
    } finally {
      setIsLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Reset Link</h1>
          <p className="text-gray-600 mb-4">This password reset link is invalid or has expired.</p>
          <Link to="/forgot-password" className="text-pink-500 hover:underline">
            Request a new reset link
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">💖</span>
            <span className="text-2xl font-bold text-gray-900">MatchMe</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-600">Enter your new password</p>
        </div>

        <Card className="p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <Input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </Card>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Remember your password?{" "}
            <Link to="/login" className="text-pink-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
