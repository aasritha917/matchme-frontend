"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import Header from "../components/common/Header"
import Loader from "../components/common/Loader"
import toast from "react-hot-toast"

const Admin = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalMatches: 0,
    premiumUsers: 0,
    reportsCount: 0,
  })
  const [users, setUsers] = useState([])
  const [reports, setReports] = useState([])

  useEffect(() => {
    // Check if user is admin
    if (!user || user.role !== "admin") {
      navigate("/dashboard")
      return
    }

    fetchAdminData()
  }, [user, navigate])

  const fetchAdminData = async () => {
    try {
      setLoading(true)
      // Simulate API calls for admin data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data
      setStats({
        totalUsers: 15420,
        activeUsers: 8934,
        totalMatches: 45678,
        premiumUsers: 2341,
        reportsCount: 23,
      })

      setUsers([
        {
          _id: "1",
          name: "John Doe",
          email: "john@example.com",
          subscription: "premium",
          isActive: true,
          createdAt: "2024-01-15",
          lastActive: "2024-01-20",
        },
        {
          _id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          subscription: "free",
          isActive: false,
          createdAt: "2024-01-10",
          lastActive: "2024-01-18",
        },
      ])

      setReports([
        {
          _id: "1",
          reportedUser: "John Doe",
          reportedBy: "Jane Smith",
          reason: "Inappropriate behavior",
          status: "pending",
          createdAt: "2024-01-20",
        },
      ])
    } catch (error) {
      toast.error("Failed to load admin data")
    } finally {
      setLoading(false)
    }
  }

  const handleUserAction = async (userId, action) => {
    try {
      // API call to perform user action
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (action === "suspend") {
        toast.success("User suspended successfully")
      } else if (action === "activate") {
        toast.success("User activated successfully")
      } else if (action === "delete") {
        toast.success("User deleted successfully")
        setUsers(users.filter((user) => user._id !== userId))
      }
    } catch (error) {
      toast.error(`Failed to ${action} user`)
    }
  }

  const handleReportAction = async (reportId, action) => {
    try {
      // API call to handle report
      await new Promise((resolve) => setTimeout(resolve, 500))

      setReports(reports.map((report) => (report._id === reportId ? { ...report, status: action } : report)))

      toast.success(`Report ${action} successfully`)
    } catch (error) {
      toast.error(`Failed to ${action} report`)
    }
  }

  const tabs = [
    { id: "overview", name: "Overview", icon: "📊" },
    { id: "users", name: "Users", icon: "👥" },
    { id: "reports", name: "Reports", icon: "🚨" },
    { id: "analytics", name: "Analytics", icon: "📈" },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Loader />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, reports, and platform analytics</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-pink-500 text-pink-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Total Users</p>
                        <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                      </div>
                      <div className="text-4xl">👥</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">Active Users</p>
                        <p className="text-3xl font-bold">{stats.activeUsers.toLocaleString()}</p>
                      </div>
                      <div className="text-4xl">✅</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-pink-100 text-sm">Total Matches</p>
                        <p className="text-3xl font-bold">{stats.totalMatches.toLocaleString()}</p>
                      </div>
                      <div className="text-4xl">💕</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">Premium Users</p>
                        <p className="text-3xl font-bold">{stats.premiumUsers.toLocaleString()}</p>
                      </div>
                      <div className="text-4xl">⭐</div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">New user registration: john.doe@example.com</span>
                      <span className="text-gray-400">2 minutes ago</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">Premium subscription activated</span>
                      <span className="text-gray-400">5 minutes ago</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-600">New report submitted</span>
                      <span className="text-gray-400">10 minutes ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                    <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Search
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subscription
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                user.subscription === "premium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {user.subscription}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              {user.isActive ? "Active" : "Suspended"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => handleUserAction(user._id, user.isActive ? "suspend" : "activate")}
                              className={`${
                                user.isActive
                                  ? "text-red-600 hover:text-red-900"
                                  : "text-green-600 hover:text-green-900"
                              }`}
                            >
                              {user.isActive ? "Suspend" : "Activate"}
                            </button>
                            <button
                              onClick={() => handleUserAction(user._id, "delete")}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === "reports" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">User Reports</h3>
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    {stats.reportsCount} Pending
                  </div>
                </div>

                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report._id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium text-gray-900">Report against {report.reportedUser}</h4>
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                report.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : report.status === "resolved"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {report.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">Reported by: {report.reportedBy}</p>
                          <p className="text-sm text-gray-700 mb-3">Reason: {report.reason}</p>
                          <p className="text-xs text-gray-500">{new Date(report.createdAt).toLocaleDateString()}</p>
                        </div>

                        {report.status === "pending" && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleReportAction(report._id, "resolved")}
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                            >
                              Resolve
                            </button>
                            <button
                              onClick={() => handleReportAction(report._id, "dismissed")}
                              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                            >
                              Dismiss
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Platform Analytics</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">User Growth</h4>
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      Chart placeholder - Integrate with your preferred charting library
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">Match Success Rate</h4>
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      Chart placeholder - Integrate with your preferred charting library
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">Revenue</h4>
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      Chart placeholder - Integrate with your preferred charting library
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="font-medium text-gray-900 mb-4">User Activity</h4>
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      Chart placeholder - Integrate with your preferred charting library
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
