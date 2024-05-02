import { useContext } from "react"
import { AuthContext } from "../context/AuthProvider"
// import { MovieContext } from "../context/MoviesProvider"
import { NotificationContext } from "../context/NotificationProvider"

export const useNotification = () => useContext(NotificationContext)
export const useAuth = () => useContext(AuthContext)
// export const useMovies = () => useContext(MovieContext)
