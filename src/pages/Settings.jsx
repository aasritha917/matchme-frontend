"use client"

import { useState } from "react"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { Switch } from "../components/ui/Switch"
import { Heart, ArrowLeft, Save, Bell, Shield, CreditCard, HelpCircle } from "lucide-react"
import { Link } from "react-router-dom"

const Settings = () => {
  const [notifications, setNotifications] = useState({
    newMatches: true,
    messages: true,
    profileViews: false,
    marketing: false,
    push: true,
    email: true,
    sms: false,
  })

  const [privacy, setPrivacy] = useState({
    showOnlineStatus: true,
    showLastSeen: false,
    allowProfileViews: true,
    showDistance: true,
  })

  const [account, setAccount] = useState({
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    password: "••••••••",
  })

  const handleNotificationChange = (key, value) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handlePrivacyChange = (key, value) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }))
  }

  const handleAccountChange = (key, value) => {
    setAccount((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    console.log("Saving settings:", { notifications, privacy, account })
    // Here you would save to your backend
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-pink-500" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Settings</span>
            </div>
          </div>
          <Button onClick={handleSave} className="bg-pink-500 hover:bg-pink-600">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Account Settings */}
          <Card className="p-6">
            <div className="flex items-center mb-6">
              <Shield className="h-5 w-5 mr-2 text-blue-500" />
              <h2 className="text-xl font-semibold">Account Settings</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Email Address</label>
                <Input
                  type="email"
                  value={account.email}
                  onChange={(e) => handleAccountChange("email", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Phone Number</label>
                <Input
                  type="tel"
                  value={account.phone}
                  onChange={(e) => handleAccountChange("phone", e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Password</label>
                <div className="flex space-x-2">
                  <Input type="password" value={account.password} readOnly className="flex-1" />
                  <Button variant="outline">Change Password</Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card className="p-6">
            <div className="flex items-center mb-6">
              <Bell className="h-5 w-5 mr-2 text-yellow-500" />
              <h2 className="text-xl font-semibold">Notification Preferences</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">What notifications do you want to receive?</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Matches</p>
                      <p className="text-sm text-gray-500">Get notified when you have new matches</p>
                    </div>
                    <Switch
                      checked={notifications.newMatches}
                      onCheckedChange={(checked) => handleNotificationChange("newMatches", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Messages</p>
                      <p className="text-sm text-gray-500">Get notified when you receive new messages</p>
                    </div>
                    <Switch
                      checked={notifications.messages}
                      onCheckedChange={(checked) => handleNotificationChange("messages", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Profile Views</p>
                      <p className="text-sm text-gray-500">Get notified when someone views your profile</p>
                    </div>
                    <Switch
                      checked={notifications.profileViews}
                      onCheckedChange={(checked) => handleNotificationChange("profileViews", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing</p>
                      <p className="text-sm text-gray-500">Receive promotional emails and updates</p>
                    </div>
                    <Switch
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => handleNotificationChange("marketing", checked)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-4">How do you want to receive notifications?</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-500">Receive notifications on your device</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-gray-500">Receive notifications via text message</p>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Privacy Settings */}
          <Card className="p-6">
            <div className="flex items-center mb-6">
              <Shield className="h-5 w-5 mr-2 text-green-500" />
              <h2 className="text-xl font-semibold">Privacy Settings</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Online Status</p>
                  <p className="text-sm text-gray-500">Let others see when you're online</p>
                </div>
                <Switch
                  checked={privacy.showOnlineStatus}
                  onCheckedChange={(checked) => handlePrivacyChange("showOnlineStatus", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Last Seen</p>
                  <p className="text-sm text-gray-500">Let others see when you were last active</p>
                </div>
                <Switch
                  checked={privacy.showLastSeen}
                  onCheckedChange={(checked) => handlePrivacyChange("showLastSeen", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Allow Profile Views</p>
                  <p className="text-sm text-gray-500">Let others view your full profile</p>
                </div>
                <Switch
                  checked={privacy.allowProfileViews}
                  onCheckedChange={(checked) => handlePrivacyChange("allowProfileViews", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Show Distance</p>
                  <p className="text-sm text-gray-500">Display your distance from other users</p>
                </div>
                <Switch
                  checked={privacy.showDistance}
                  onCheckedChange={(checked) => handlePrivacyChange("showDistance", checked)}
                />
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <CreditCard className="h-5 w-5 mr-2 text-purple-500" />
                <h3 className="text-lg font-semibold">Subscription</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Manage your premium subscription and billing information.
              </p>
              <Link to="/premium">
                <Button variant="outline" className="w-full bg-transparent">
                  Manage Subscription
                </Button>
              </Link>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <HelpCircle className="h-5 w-5 mr-2 text-blue-500" />
                <h3 className="text-lg font-semibold">Help & Support</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Get help with your account or report issues.</p>
              <Button variant="outline" className="w-full bg-transparent">
                Contact Support
              </Button>
            </Card>
          </div>

          {/* Danger Zone */}
          <Card className="p-6 border-red-200 dark:border-red-800">
            <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">Danger Zone</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Deactivate Account</p>
                  <p className="text-sm text-gray-500">Temporarily hide your profile from other users</p>
                </div>
                <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent">
                  Deactivate
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Settings
