const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

class AuthService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    console.log("Making request to:", url)

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    // Add auth token if available
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      console.log("Response:", { status: response.status, data })

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  async register(userData) {
    try {
      const response = await this.makeRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      })
      return response
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  async login(credentials) {
    try {
      const response = await this.makeRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      })
      return response
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  async logout() {
    try {
      await this.makeRequest("/auth/logout", {
        method: "POST",
      })
    } catch (error) {
      console.error("Logout error:", error)
      // Don't throw error for logout as we want to clear local state anyway
    }
  }

  async getCurrentUser() {
    try {
      const response = await this.makeRequest("/auth/me")
      return response
    } catch (error) {
      console.error("Get current user error:", error)
      throw error
    }
  }

  async forgotPassword(email) {
    try {
      const response = await this.makeRequest("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      })
      return response
    } catch (error) {
      console.error("Forgot password error:", error)
      throw error
    }
  }

  async resetPassword(token, password) {
    try {
      const response = await this.makeRequest("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      })
      return response
    } catch (error) {
      console.error("Reset password error:", error)
      throw error
    }
  }
}

export const authService = new AuthService()
