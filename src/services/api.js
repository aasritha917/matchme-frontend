import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log("API Request:", config.method?.toUpperCase(), config.url, config.data)
    return config
  },
  (error) => {
    console.error("Request Error:", error)
    return Promise.reject(error)
  },
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.data)
    return response
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message)

    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      window.location.href = "/login"
    }

    return Promise.reject(error)
  },
)

export default api
