"use client"

import { useState, useRef, useEffect } from "react"

const Select = ({
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const selectRef = useRef(null)

  useEffect(() => {
    if (value) {
      const option = options.find((opt) => opt.value === value)
      setSelectedOption(option)
    } else {
      setSelectedOption(null)
    }
  }, [value, options])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelect = (option) => {
    setSelectedOption(option)
    onChange(option.value)
    setIsOpen(false)
  }

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled}
        className={`
          w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "cursor-pointer hover:border-gray-400"}
          ${className.includes("border-red-500") ? "border-red-500" : ""}
        `}
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.length === 0 ? (
            <div className="px-3 py-2 text-gray-500">No options available</div>
          ) : (
            options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option)}
                className={`
                  w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none
                  ${selectedOption?.value === option.value ? "bg-pink-50 text-pink-600" : "text-gray-900"}
                `}
              >
                {option.label}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export { Select }
