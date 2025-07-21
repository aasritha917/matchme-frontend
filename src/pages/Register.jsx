"use client"

import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Card } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { Select } from "../components/ui/Select"

const Register = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    name: "",
    age: "",
    gender: "",
    religion: "",
    education: "",
    profession: "",
    location: "",
    agreeToTerms: false,
  })
  const [validationErrors, setValidationErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { register, error, clearError } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: null }))
    }
    if (error) clearError()
  }

  const validateStep = (stepNumber) => {
    const errors = {}

    if (stepNumber === 1) {
      if (!formData.email) {
        errors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Email is invalid"
      }

      if (!formData.phone) {
        errors.phone = "Phone number is required"
      } else if (!/^\+?[\d\s\-$$$$]+$/.test(formData.phone)) {
        errors.phone = "Phone number is invalid"
      }

      if (!formData.password) {
        errors.password = "Password is required"
      } else if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters"
      }

      if (!formData.confirmPassword) {
        errors.confirmPassword = "Please confirm your password"
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords don't match"
      }
    }

    if (stepNumber === 2) {
      if (!formData.name) {
        errors.name = "Full name is required"
      } else if (formData.name.length < 2) {
        errors.name = "Name must be at least 2 characters"
      }

      if (!formData.age) {
        errors.age = "Age is required"
      } else if (Number.parseInt(formData.age) < 18) {
        errors.age = "Must be at least 18 years old"
      } else if (Number.parseInt(formData.age) > 100) {
        errors.age = "Age cannot exceed 100"
      }

      if (!formData.gender) {
        errors.gender = "Gender is required"
      }

      if (!formData.location) {
        errors.location = "Location is required"
      }
    }

    if (stepNumber === 3) {
      if (!formData.agreeToTerms) {
        errors.agreeToTerms = "You must agree to the terms and conditions"
      }
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return

    setIsLoading(true)

    try {
      const userData = {
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        phone: formData.phone.trim(),
        age: Number.parseInt(formData.age),
        gender: formData.gender,
        location: formData.location.trim(),
        profession: formData.profession.trim(),
        education: formData.education,
        religion: formData.religion,
      }

      console.log("Submitting user data:", userData)
      await register(userData)
      navigate("/dashboard")
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ]

  const religionOptions = [
    { value: "christian", label: "Christian" },
    { value: "muslim", label: "Muslim" },
    { value: "hindu", label: "Hindu" },
    { value: "buddhist", label: "Buddhist" },
    { value: "jewish", label: "Jewish" },
    { value: "other", label: "Other" },
    { value: "none", label: "Prefer not to say" },
  ]

  const educationOptions = [
    { value: "high-school", label: "High School" },
    { value: "bachelors", label: "Bachelor's Degree" },
    { value: "masters", label: "Master's Degree" },
    { value: "phd", label: "PhD" },
    { value: "other", label: "Other" },
  ]

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
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600">Step {step} of 3</p>
        </div>

        <Card className="p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">{error}</div>
          )}

          <div className="space-y-4">
            {step === 1 && (
              <>
                <h3 className="text-lg font-semibold">Account Details</h3>
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
                  <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={validationErrors.phone ? "border-red-500" : ""}
                  />
                  {validationErrors.phone && <p className="text-red-500 text-sm">{validationErrors.phone}</p>}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Password *</label>
                  <Input
                    type="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className={validationErrors.password ? "border-red-500" : ""}
                  />
                  {validationErrors.password && <p className="text-red-500 text-sm">{validationErrors.password}</p>}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Confirm Password *</label>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className={validationErrors.confirmPassword ? "border-red-500" : ""}
                  />
                  {validationErrors.confirmPassword && (
                    <p className="text-red-500 text-sm">{validationErrors.confirmPassword}</p>
                  )}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                  <Input
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={validationErrors.name ? "border-red-500" : ""}
                  />
                  {validationErrors.name && <p className="text-red-500 text-sm">{validationErrors.name}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Age *</label>
                    <Input
                      type="number"
                      placeholder="25"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      className={validationErrors.age ? "border-red-500" : ""}
                    />
                    {validationErrors.age && <p className="text-red-500 text-sm">{validationErrors.age}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Gender *</label>
                    <Select
                      value={formData.gender}
                      onChange={(value) => handleInputChange("gender", value)}
                      options={genderOptions}
                      placeholder="Select gender"
                      className={validationErrors.gender ? "border-red-500" : ""}
                    />
                    {validationErrors.gender && <p className="text-red-500 text-sm">{validationErrors.gender}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Location *</label>
                  <Input
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className={validationErrors.location ? "border-red-500" : ""}
                  />
                  {validationErrors.location && <p className="text-red-500 text-sm">{validationErrors.location}</p>}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h3 className="text-lg font-semibold">Profile Setup</h3>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Religion</label>
                  <Select
                    value={formData.religion}
                    onChange={(value) => handleInputChange("religion", value)}
                    options={religionOptions}
                    placeholder="Select religion"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Education</label>
                  <Select
                    value={formData.education}
                    onChange={(value) => handleInputChange("education", value)}
                    options={educationOptions}
                    placeholder="Select education level"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Profession</label>
                  <Input
                    placeholder="Your profession"
                    value={formData.profession}
                    onChange={(e) => handleInputChange("profession", e.target.value)}
                  />
                </div>
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                    className="mt-1 rounded border-gray-300"
                  />
                  <label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link to="/terms" className="text-pink-500 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-pink-500 hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {validationErrors.agreeToTerms && (
                  <p className="text-red-500 text-sm">{validationErrors.agreeToTerms}</p>
                )}
              </>
            )}

            <div className="flex justify-between pt-4">
              {step > 1 && (
                <Button variant="outline" onClick={handlePrevStep}>
                  Previous
                </Button>
              )}
              {step < 3 ? (
                <Button onClick={handleNextStep} className="ml-auto bg-pink-500 hover:bg-pink-600">
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="ml-auto bg-pink-500 hover:bg-pink-600" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              )}
            </div>
          </div>
        </Card>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
