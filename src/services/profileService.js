import {authService} from "./authService"

class ProfileService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"
  }

  // Get current user profile
  async getProfile() {
    try {
      const response = await authService.makeRequest(`${this.baseURL}/profiles/me`, {
        method: "GET",
      })
      return response
    } catch (error) {
      console.error("Get profile error:", error)
      throw error
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      const response = await authService.makeRequest(`${this.baseURL}/profiles/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      })
      return response
    } catch (error) {
      console.error("Update profile error:", error)
      throw error
    }
  }

  // Upload profile photo
  async uploadPhoto(photoFile) {
    try {
      const formData = new FormData()
      formData.append("photo", photoFile)

      const response = await authService.makeRequest(`${this.baseURL}/profiles/upload-photo`, {
        method: "POST",
        body: formData,
      })
      return response
    } catch (error) {
      console.error("Upload photo error:", error)
      throw error
    }
  }

  // Delete profile photo
  async deletePhoto(photoId) {
    try {
      const response = await authService.makeRequest(`${this.baseURL}/profiles/photos/${photoId}`, {
        method: "DELETE",
      })
      return response
    } catch (error) {
      console.error("Delete photo error:", error)
      throw error
    }
  }

  // Set primary photo
  async setPrimaryPhoto(photoId) {
    try {
      const response = await authService.makeRequest(`${this.baseURL}/profiles/photos/${photoId}/primary`, {
        method: "PUT",
      })
      return response
    } catch (error) {
      console.error("Set primary photo error:", error)
      throw error
    }
  }

  // Get all users for matching
  async getAllUsers(page = 1, limit = 10) {
    try {
      const response = await authService.makeRequest(`${this.baseURL}/profiles/users?page=${page}&limit=${limit}`, {
        method: "GET",
      })
      return response
    } catch (error) {
      console.error("Get all users error:", error)
      throw error
    }
  }

  // Get specific user profile
  async getUserProfile(userId) {
    try {
      const response = await authService.makeRequest(`${this.baseURL}/profiles/${userId}`, {
        method: "GET",
      })
      return response
    } catch (error) {
      console.error("Get user profile error:", error)
      throw error
    }
  }

  // Get potential matches
  async getPotentialMatches(userId) {
    try {
      const response = await authService.makeRequest(`${this.baseURL}/matches/potential/${userId}`, {
        method: "GET",
      })
      return response
    } catch (error) {
      console.error("Get potential matches error:", error)
      throw error
    }
  }

  // Create a match (swipe)
  async createMatch(userId, targetUserId, action) {
    try {
      const response = await authService.makeRequest(`${this.baseURL}/matches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          targetUserId,
          action,
        }),
      })
      return response
    } catch (error) {
      console.error("Create match error:", error)
      throw error
    }
  }

  // Get user matches
  async getUserMatches(userId) {
    try {
      const response = await authService.makeRequest(`${this.baseURL}/matches/${userId}`, {
        method: "GET",
      })
      return response
    } catch (error) {
      console.error("Get user matches error:", error)
      throw error
    }
  }

  // Unmatch users
  async unmatch(matchId) {
    try {
      const response = await authService.makeRequest(`${this.baseURL}/matches/${matchId}`, {
        method: "DELETE",
      })
      return response
    } catch (error) {
      console.error("Unmatch error:", error)
      throw error
    }
  }
}

const profileService = new ProfileService()
export default profileService
