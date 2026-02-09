import clsx from 'clsx'
import React from 'react'

const Input = ({ type, placeholder, label, id, className, value, onChange, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={clsx(
          "px-3 py-2 border border-gray-300 rounded-sm bg-white",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export default Input