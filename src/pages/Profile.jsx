"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { Textarea } from "../components/ui/Textarea"
import { Select } from "../components/ui/Select"
import { Avatar } from "../components/ui/Avatar"
import { Badge } from "../components/ui/Badge"
import { Progress } from "../components/ui/Progress"
import { Edit3, Save, X, Upload, Trash2, Star, LogOut, Heart } from "lucide-react"
import profileService from "../services/profileService"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

const Profile = () => {
  const { user, logout, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    location: "",
    profession: "",
    education: "",
    religion: "",
    bio: "",
    interests: [],
    photos: [],
  })

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        age: user.age || "",
        gender: user.gender || "",
        location: user.location || "",
        profession: user.profession || "",
        education: user.education || "",
        religion: user.religion || "",
        bio: user.bio || "",
        interests: user.interests || [],
        photos: user.photos || [],
      })
    }
  }, [user])

  const handleSignOut = () => {
    logout()
  }

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const updatedUser = await profileService.updateProfile(profileData)
      updateUser(updatedUser)
      setIsEditing(false)
      alert("Profile updated successfully!")
    } catch (error) {
      console.error("Profile update error:", error)
      alert("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setUploadingPhoto(true)
    try {
      const formData = new FormData()
      formData.append("photo", file)

      const response = await profileService.uploadPhoto(formData)
      const updatedPhotos = [...profileData.photos, response.photo]

      setProfileData((prev) => ({
        ...prev,
        photos: updatedPhotos,
      }))

      updateUser({ ...user, photos: updatedPhotos })
      alert("Photo uploaded successfully!")
    } catch (error) {
      console.error("Photo upload error:", error)
      alert("Failed to upload photo")
    } finally {
      setUploadingPhoto(false)
    }
  }

  const handleDeletePhoto = async (photoId) => {
    try {
      await profileService.deletePhoto(photoId)
      const updatedPhotos = profileData.photos.filter((photo) => photo._id !== photoId)

      setProfileData((prev) => ({
        ...prev,
        photos: updatedPhotos,
      }))

      updateUser({ ...user, photos: updatedPhotos })
      alert("Photo deleted successfully!")
    } catch (error) {
      console.error("Photo delete error:", error)
      alert("Failed to delete photo")
    }
  }

  const handleSetPrimaryPhoto = async (photoId) => {
    try {
      await profileService.setPrimaryPhoto(photoId)
      const updatedPhotos = profileData.photos.map((photo) => ({
        ...photo,
        isPrimary: photo._id === photoId,
      }))

      setProfileData((prev) => ({
        ...prev,
        photos: updatedPhotos,
      }))

      updateUser({ ...user, photos: updatedPhotos })
      alert("Primary photo updated!")
    } catch (error) {
      console.error("Set primary photo error:", error)
      alert("Failed to set primary photo")
    }
  }

  const calculateProfileCompletion = () => {
    const fields = ["name", "email", "phone", "age", "gender", "location", "profession", "education", "bio"]
    const completedFields = fields.filter((field) => profileData[field] && profileData[field].toString().trim() !== "")
    const photoScore = profileData.photos.length > 0 ? 1 : 0
    return Math.round(((completedFields.length + photoScore) / (fields.length + 1)) * 100)
  }

  const primaryPhoto = profileData.photos.find((photo) => photo.isPrimary)
  const profileCompletion = calculateProfileCompletion()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Link
              to="/dashboard"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>
              <Heart className="h-8 w-8 text-pink-500" />
              
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center space-x-2"
              >
                {isEditing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
              </Button>
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 bg-transparent"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Profile Completion */}
        <Card className="mb-6 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Profile Completion</h3>
            <Badge variant={profileCompletion === 100 ? "success" : "secondary"}>{profileCompletion}% Complete</Badge>
          </div>
          <Progress value={profileCompletion} className="w-full" />
          {profileCompletion < 100 && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Complete your profile to get better matches!
            </p>
          )}
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Photo Section */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Photos</h3>

              {/* Primary Photo */}
              <div className="mb-6">
                <Avatar
                  src={primaryPhoto?.url || "/placeholder.svg?height=200&width=200&query=profile"}
                  alt="Profile"
                  className="w-32 h-32 mx-auto"
                />
              </div>

              {/* Photo Upload */}
              <div className="mb-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                  disabled={uploadingPhoto}
                />
                <label htmlFor="photo-upload">
                  <Button
                    as="span"
                    variant="outline"
                    className="w-full flex items-center justify-center space-x-2 cursor-pointer bg-transparent"
                    disabled={uploadingPhoto}
                  >
                    {uploadingPhoto ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-pink-500"></div>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        <span>Upload Photo</span>
                      </>
                    )}
                  </Button>
                </label>
              </div>

              {/* Photo Gallery */}
              {profileData.photos.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {profileData.photos.map((photo) => (
                    <div key={photo._id} className="relative group">
                      <img
                        src={photo.url || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                        {!photo.isPrimary && (
                          <Button size="sm" onClick={() => handleSetPrimaryPhoto(photo._id)} className="p-1">
                            <Star className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeletePhoto(photo._id)}
                          className="p-1"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      {photo.isPrimary && <Badge className="absolute top-1 left-1 text-xs">Primary</Badge>}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Profile Information</h3>
                {isEditing && (
                  <Button onClick={handleSave} disabled={loading} className="flex items-center space-x-2">
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    <span>{loading ? "Saving..." : "Save Changes"}</span>
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Information */}
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    value={profileData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                    type="email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <Input
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Age</label>
                  <Input
                    value={profileData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    disabled={!isEditing}
                    type="number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Gender</label>
                  <Select
                    value={profileData.gender}
                    onChange={(value) => handleInputChange("gender", value)}
                    disabled={!isEditing}
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "other", label: "Other" },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <Input
                    value={profileData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Profession</label>
                  <Input
                    value={profileData.profession}
                    onChange={(e) => handleInputChange("profession", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Education</label>
                  <Select
                    value={profileData.education}
                    onChange={(value) => handleInputChange("education", value)}
                    disabled={!isEditing}
                    options={[
                      { value: "high_school", label: "High School" },
                      { value: "bachelors", label: "Bachelor's Degree" },
                      { value: "masters", label: "Master's Degree" },
                      { value: "phd", label: "PhD" },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Religion</label>
                  <Select
                    value={profileData.religion}
                    onChange={(value) => handleInputChange("religion", value)}
                    disabled={!isEditing}
                    options={[
                      { value: "hindu", label: "Hindu" },
                      { value: "muslim", label: "Muslim" },
                      { value: "christian", label: "Christian" },
                      { value: "sikh", label: "Sikh" },
                      { value: "buddhist", label: "Buddhist" },
                      { value: "other", label: "Other" },
                    ]}
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Bio</label>
                <Textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                  placeholder="Tell us about yourself..."
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
