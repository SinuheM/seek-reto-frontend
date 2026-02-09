import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginForm from '../../../components/auth/LoginForm'

const { mockLogin } = require('../../../hooks/useAuth')
const { mockPush } = require('next/navigation')

jest.mock('../../../hooks/useAuth', () => {
  const mockLogin = jest.fn()
  return {
    __esModule: true,
    default: () => ({
      login: mockLogin,
      user: null,
      logout: jest.fn(),
    }),
    mockLogin
  }
})

jest.mock('next/navigation', () => {
  const mockPush = jest.fn()
  return {
    __esModule: true,
    useRouter: () => ({ push: mockPush }),
    mockPush,
  }
})

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Renderiza campos y botón (por role y name)', () => {
    render(<LoginForm />)

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByRole('button', { name: /ingresar/i })

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(submitBtn).toBeInTheDocument()
  })

  test('Al enviar con valores completos llama a login con email y password', () => {
    render(<LoginForm />)

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByRole('button', { name: /ingresar/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'secret' } })
    fireEvent.click(submitBtn)

    expect(mockLogin).toHaveBeenCalledTimes(1)
    const callArg = mockLogin.mock.calls[0][0]
    expect(callArg).toMatchObject({
      email: 'test@example.com',
      password: 'secret',
    })
    expect(typeof callArg.onSuccess).toBe('function')
  })

  test('Cuando login ejecuta onSuccess navega a /tareas', () => {
    mockLogin.mockImplementation(({ onSuccess }) => {
      if (onSuccess) onSuccess()
    })

    render(<LoginForm />)

    const emailInput = screen.getByRole('textbox', { name: /email/i })
    const passwordInput = screen.getByLabelText(/password/i)
    const submitBtn = screen.getByRole('button', { name: /ingresar/i })

    fireEvent.change(emailInput, { target: { value: 'a@a.com' } })
    fireEvent.change(passwordInput, { target: { value: 'p' } })
    fireEvent.click(submitBtn)

    expect(mockLogin).toHaveBeenCalled()
    expect(mockPush).toHaveBeenCalledWith('/tareas')
  })
})
