import React from 'react'

const Select = ({ label, id, className, value, onChange, children }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        className={`px-3 py-2 border border-gray-300 rounded-sm bg-white ${className}`}
        name={id}
        value={value}
        onChange={onChange}
      >
        {
          children
        }
      </select>
    </div>
  )
}

export default Select