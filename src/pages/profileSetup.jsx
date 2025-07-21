const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

class ProfileService {
  async makeRequest(url, options = {}) {
    const token = localStorage.getItem("token")

    const config = {
      headers: {
        ...options.headers,
      },
      ...options,
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Don't set Content-Type for FormData
    if (!(options.body instanceof FormData)) {
      config.headers["Content-Type"] = "application/json"
    }

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }

      return data
    } catch (error) {
      console.error("API request failed:", error)
      throw error
    }
  }

  async getProfile() {
    return await this.makeRequest("/profiles/me")
  }

  async updateProfile(profileData) {
    return await this.makeRequest("/profiles/me", {
      method: "PUT",
      body: JSON.stringify(profileData),
    })
  }

  async uploadPhoto(file) {
    const formData = new FormData()
    formData.append("photo", file)

    return await this.makeRequest("/profiles/upload-photo", {
      method: "POST",
      body: formData,
    })
  }

  async deletePhoto(photoId) {
    return await this.makeRequest(`/profiles/photos/${photoId}`, {
      method: "DELETE",
    })
  }

  async setPrimaryPhoto(photoId) {
    return await this.makeRequest(`/profiles/photos/${photoId}/primary`, {
      method: "PUT",
    })
  }

  async getAllUsers(page = 1, limit = 10) {
    return await this.makeRequest(`/profiles/users?page=${page}&limit=${limit}`)
  }

  async getUserProfile(userId) {
    return await this.makeRequest(`/profiles/${userId}`)
  }
}

const profileService = new ProfileService()
export default profileService
