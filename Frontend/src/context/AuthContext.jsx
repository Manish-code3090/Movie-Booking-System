import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import * as authApi from '../api/auth.api.js'
import { setAccessToken, setAuthFailureHandler } from '../api/axios.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  const clear = useCallback(() => {
    setAccessToken(null)
    setUser(null)
  }, [])

  useEffect(() => {
    setAuthFailureHandler(clear)
    authApi
      .refresh()
      .then((data) => {
        if (data) {
          setAccessToken(data.accessToken)
          setUser(data.user)
        }
      })
      .catch(() => clear())
      .finally(() => setReady(true))
  }, [clear])

  const signIn = async (credentials) => {
    const data = await authApi.login(credentials)
    setAccessToken(data.accessToken)
    setUser(data.user)
    return data.user
  }

  const signUp = async (details) => {
    const data = await authApi.register(details)
    setAccessToken(data.accessToken)
    setUser(data.user)
    return data.user
  }

  const signOut = async () => {
    try {
      await authApi.logout()
    } finally {
      clear()
    }
  }

  return <AuthContext.Provider value={{ user, ready, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
