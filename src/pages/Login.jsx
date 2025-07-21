"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { Input } from "../components/ui/Input"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [validationErrors, setValidationErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { login, error, clearError } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: null }))
    }
    if (error) clearError()
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.email) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
    }

    if (!formData.password) {
      errors.password = "Password is required"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const credentials = {
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      }

      console.log("Attempting login with:", { email: credentials.email })
      await login(credentials)
      navigate("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4">
            <span>← Back to Home</span>
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">💖</span>
            <span className="text-2xl font-bold text-gray-900">MatchMe</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <Card className="p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={validationErrors.email ? "border-red-500" : ""}
              />
              {validationErrors.email && <p className="text-red-500 text-sm">{validationErrors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password *</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={validationErrors.password ? "border-red-500" : ""}
              />
              {validationErrors.password && <p className="text-red-500 text-sm">{validationErrors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-pink-600 hover:text-pink-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Card>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-pink-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
