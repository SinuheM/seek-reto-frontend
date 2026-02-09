'use client'

import useAuth from '@/hooks/useAuth'
import React from 'react'
import Button from './Button'

const Navigation = () => {
  const { user, logout } = useAuth()

  return (
    <div className='w-full bg-blue-500 text-white shadow-md'>
      <div className='flex justify-between items-center px-4 py-2'>
        <div className='flex items-center gap-4'>
          <h1 className='text-2xl font-bold'>Tareas</h1>
        </div>
        {user ? (
          <div className='flex items-center gap-4'>
            <span className='hidden sm:inline-block'>Hola, {user.name}</span>
            <span className='hidden sm:inline-block'> | </span>
            <Button onClick={logout}>
              Cerrar sesión
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Navigation