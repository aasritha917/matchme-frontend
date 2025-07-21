"use client"

import { useState } from "react"

const MatchCard = ({ match, onLike, onPass }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  const nextPhoto = () => {
    if (match.photos && match.photos.length > 1) {
      setCurrentPhotoIndex((prev) => (prev + 1) % match.photos.length)
    }
  }

  const prevPhoto = () => {
    if (match.photos && match.photos.length > 1) {
      setCurrentPhotoIndex((prev) => (prev - 1 + match.photos.length) % match.photos.length)
    }
  }

  const calculateAge = (birthDate) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }

    return age
  }

  if (!match) return null

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-sm mx-auto">
      {/* Photo Section */}
      <div className="relative h-96 bg-gray-200">
        {match.photos && match.photos.length > 0 ? (
          <>
            <img
              src={match.photos[currentPhotoIndex] || "/placeholder.svg"}
              alt={match.name}
              className="w-full h-full object-cover"
            />

            {/* Photo Navigation */}
            {match.photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition-all"
                >
                  ‹
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70 transition-all"
                >
                  ›
                </button>

                {/* Photo Indicators */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {match.photos.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentPhotoIndex ? "bg-white" : "bg-white bg-opacity-50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-6xl mb-2">👤</div>
              <div>No Photo</div>
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {match.name}, {calculateAge(match.dateOfBirth)}
            </h2>
            <p className="text-gray-600 flex items-center">📍 {match.location?.city || "Location not specified"}</p>
          </div>
        </div>

        {/* Bio */}
        {match.bio && <p className="text-gray-700 mb-4 text-sm leading-relaxed">{match.bio}</p>}

        {/* Interests */}
        {match.interests && match.interests.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {match.interests.slice(0, 6).map((interest, index) => (
                <span key={index} className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-xs font-medium">
                  {interest}
                </span>
              ))}
              {match.interests.length > 6 && (
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                  +{match.interests.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={onPass}
            className="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full w-14 h-14 flex items-center justify-center transition-all duration-200 hover:scale-105"
          >
            <span className="text-2xl">✕</span>
          </button>

          <button
            onClick={onLike}
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full w-14 h-14 flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <span className="text-2xl">💖</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MatchCard
