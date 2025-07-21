"use client"

const Checkbox = ({ checked, onChange, className = "", id, ...props }) => {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onChange && onChange(e.target.checked)}
      className={`h-4 w-4 rounded border border-primary text-primary focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    />
  )
}

export default Checkbox
