import clsx from 'clsx'
import React from 'react'

const Button = ({ type = 'button', children, className, onClick, variant = 'primary' }) => {
  const styleByVariant = {
    primary: 'bg-blue-500 text-white hover:bg-blue-700 focus:ring-blue-400',
    secondary: 'bg-gray-400 text-white hover:bg-gray-700 focus:ring-gray-400',
  }

  return (
    <button
      type={type}
      className={clsx(
        "py-3 px-4 cursor-pointer rounded-md",
        "focus:outline-none focus:ring-2 focus:ring-opacity-75",
        "transition-colors duration-300 ease-in-out",
        styleByVariant[variant],
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button