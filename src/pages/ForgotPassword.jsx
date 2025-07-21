"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import authService from "../services/authService"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      setError("Email is required")
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setError("")
    setMessage("")

    try {
      const response = await authService.forgotPassword(email)

      if (response.success) {
        setMessage("Password reset instructions have been sent to your email address.")
        setEmail("")

        // In development, show the reset token
        if (response.resetToken) {
          console.log("Reset token (dev only):", response.resetToken)
          setMessage(`Password reset instructions sent! For development, use this token: ${response.resetToken}`)
        }
      } else {
        setError(response.message || "Failed to send reset email")
      }
    } catch (error) {
      console.error("Forgot password error:", error)
      setError(error.message || "Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/login" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4">
            <span>← Back to Login</span>
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">💖</span>
            <span className="text-2xl font-bold text-gray-900">MatchMe</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Forgot Password</h1>
          <p className="text-gray-600">Enter your email to reset your password</p>
        </div>

        <Card className="p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">{error}</div>
          )}

          {message && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md mb-4">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError("")
                  setMessage("")
                }}
                className={error ? "border-red-500" : ""}
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Instructions"}
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

export default ForgotPassword
