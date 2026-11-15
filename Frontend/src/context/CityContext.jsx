import { createContext, useContext, useState } from 'react'

const CityContext = createContext(null)

export function CityProvider({ children }) {
  const [city, setCityState] = useState(() => {
    try {
      return localStorage.getItem('city') || 'Delhi'
    } catch {
      return 'Delhi'
    }
  })

  const setCity = (value) => {
    setCityState(value)
    try {
      localStorage.setItem('city', value)
    } catch {
      return
    }
  }

  return <CityContext.Provider value={{ city, setCity }}>{children}</CityContext.Provider>
}

export const useCity = () => useContext(CityContext)
