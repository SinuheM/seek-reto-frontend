import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useAuth = () => {
  const router = useRouter()
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') return null
    const stored = window.localStorage.getItem(USER_STORAGE_KEY)
    return stored ? JSON.parse(stored) : null
  })
  const isAuthenticated = Boolean(user)

  const saveToken = (token) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, token)
  }

  const saveUser = (user) => {
    setUser(user)
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
  }

  const login = ({ email, password, onSuccess, onError }) => {
    if (!email || !password) return

    fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        saveUser(data.userData)
        saveToken(data.token)
        onSuccess()
      })
      .catch((error) => {
        console.error(error)
        onError()
      })
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    localStorage.removeItem(USER_STORAGE_KEY)
    setUser(null)
    router.push('/')
  }

  const getAccessToken = () => {
    if (typeof window === 'undefined') return null

    const token = localStorage.getItem(TOKEN_STORAGE_KEY)

    if (!token) {
      return;
    }
    return localStorage.getItem(TOKEN_STORAGE_KEY)
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    getAccessToken
  }
};

export default useAuth