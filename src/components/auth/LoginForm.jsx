'use client'

import React from 'react'
import Button from '../base/Button'
import Input from '../base/Input'
import useAuth from '@/hooks/useAuth'
import useForm from '@/hooks/useForm'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
  const router = useRouter()
  const { values, handleChange } = useForm()
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    login({
      email: values.email,
      password: values.password,
      onSuccess: () => {
        router.push('/tareas')
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white p-20 rounded-md shadow-md"
    >
      <h1 className="text-2xl font-bold">Iniciar sesión</h1>
      <Input
        type="text"
        placeholder="Email"
        label="Email"
        id="email"
        value={values.email}
        onChange={handleChange}
        autoComplete="off"
      />
      <Input
        type="password"
        placeholder="Password"
        label="Password"
        id="password"
        value={values.password}
        onChange={handleChange}
        autoComplete="off"
      />
      <Button type="submit">Ingresar</Button>
    </form>
  );
}

export default LoginForm