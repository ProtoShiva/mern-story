import React from "react"
import AuthProvider from "./AuthProvider.jsx"
// import MoviesProvider from "./MoviesProvider"
import NotificationProvider from "./NotificationProvider.jsx"

export default function ContextProviders({ children }) {
  return (
    <NotificationProvider>
      <AuthProvider>{children}</AuthProvider>
    </NotificationProvider>
  )
}
