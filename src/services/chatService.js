import api from "./api"

export const chatService = {
  // Get user's chats
  getChats: async () => {
    try {
      const response = await api.get("/chats")
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get chats")
    }
  },

  // Get chat messages
  getChatMessages: async (chatId, page = 1, limit = 50) => {
    try {
      const response = await api.get(`/chats/${chatId}/messages?page=${page}&limit=${limit}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get messages")
    }
  },

  // Send message
  sendMessage: async (chatId, content, type = "text") => {
    try {
      const response = await api.post(`/chats/${chatId}/messages`, {
        content,
        type,
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to send message")
    }
  },

  // Mark messages as read
  markAsRead: async (chatId) => {
    try {
      const response = await api.put(`/chats/${chatId}/read`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to mark as read")
    }
  },

  // Delete message
  deleteMessage: async (chatId, messageId) => {
    try {
      const response = await api.delete(`/chats/${chatId}/messages/${messageId}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete message")
    }
  },

  // Get chat details
  getChatDetails: async (chatId) => {
    try {
      const response = await api.get(`/chats/${chatId}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get chat details")
    }
  },

  // Block user
  blockUser: async (userId) => {
    try {
      const response = await api.post("/chats/block", { userId })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to block user")
    }
  },

  // Unblock user
  unblockUser: async (userId) => {
    try {
      const response = await api.post("/chats/unblock", { userId })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to unblock user")
    }
  },
}
