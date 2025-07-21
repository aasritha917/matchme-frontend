import api from "./api"

export const matchService = {
  // Get potential matches
  getPotentialMatches: async (limit = 10) => {
    try {
      const response = await api.get(`/matches/potential?limit=${limit}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get matches")
    }
  },

  // Like a user
  likeUser: async (userId) => {
    try {
      const response = await api.post("/matches/like", { targetUserId: userId })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to like user")
    }
  },

  // Pass on a user
  passUser: async (userId) => {
    try {
      const response = await api.post("/matches/pass", { targetUserId: userId })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to pass user")
    }
  },

  // Super like a user
  superLikeUser: async (userId) => {
    try {
      const response = await api.post("/matches/super-like", { targetUserId: userId })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to super like user")
    }
  },

  // Get user's matches
  getMatches: async () => {
    try {
      const response = await api.get("/matches")
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get matches")
    }
  },

  // Get match details
  getMatchDetails: async (matchId) => {
    try {
      const response = await api.get(`/matches/${matchId}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get match details")
    }
  },

  // Unmatch a user
  unmatch: async (matchId) => {
    try {
      const response = await api.delete(`/matches/${matchId}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to unmatch")
    }
  },

  // Get match statistics
  getMatchStats: async () => {
    try {
      const response = await api.get("/matches/stats")
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get match stats")
    }
  },

  // Report a user
  reportUser: async (userId, reason, description) => {
    try {
      const response = await api.post("/matches/report", {
        reportedUserId: userId,
        reason,
        description,
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to report user")
    }
  },
}
