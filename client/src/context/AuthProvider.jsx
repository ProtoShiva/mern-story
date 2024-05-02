import React, { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getIsAuth, signInUser } from "../api/auth"
import { useNotification } from "../hooks"
import { getStories } from "../api/story"

export const AuthContext = createContext()

const defaultAuthInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: ""
}
let currentPageNo = 0
export default function AuthProvider({ children }) {
  const [authInfo, setAuthInfo] = useState({ ...defaultAuthInfo })
  const { updateNotification } = useNotification()
  const [refresh, setRefresh] = useState(false)
  const [errors, setErrors] = useState("")
  const [status, setStatus] = useState([])
  const [limit, setLimit] = useState(1)
  // const navigate = useNavigate()

  const handleLogin = async (name, password) => {
    setAuthInfo({ ...authInfo, isPending: true })
    const { error, user } = await signInUser({ name, password })
    if (error) {
      setErrors(error)
      return setAuthInfo({ ...authInfo, isPending: false, error })
    }

    setAuthInfo({
      profile: { ...user },
      isPending: false,
      isLoggedIn: true,
      error: ""
    })
    setRefresh(!refresh)

    localStorage.setItem("auth-token", user.token)
  }

  const fetchStories = async (pageNo, limit) => {
    const { allStories, error } = await getStories(pageNo, limit)
    if (error) return updateNotification("error", error)

    if (!allStories.length) {
      currentPageNo = pageNo - 1
      return setReachedToEnd(true)
    }

    setStatus([...allStories])
  }

  useEffect(() => {
    fetchStories(currentPageNo, limit)
  }, [])

  const isAuth = async () => {
    const token = localStorage.getItem("auth-token")
    if (!token) return

    setAuthInfo({ ...authInfo, isPending: true })
    const { error, user } = await getIsAuth(token)
    if (error) {
      updateNotification("error", error)
      return setAuthInfo({ ...authInfo, isPending: false, error })
    }

    setAuthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: ""
    })
  }

  const handleLogout = () => {
    localStorage.removeItem("auth-token")
    setAuthInfo({ ...defaultAuthInfo })
  }

  useEffect(() => {
    isAuth()
  }, [refresh])

  //  handleLogout
  return (
    <AuthContext.Provider
      value={{
        authInfo,
        handleLogin,
        handleLogout,
        isAuth,
        errors,
        setErrors,
        status,
        setStatus,
        fetchStories,
        limit,
        setLimit
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
