import Signup from "./Pages/Register/Signup"
import { Routes, Route } from "react-router-dom"
import Signin from "./Pages/SignIn/Signin"
import HomePage from "./Pages/HomePage/HomePage"
import BookMarks from "./components/BookMarks"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bookMarks" element={<BookMarks />} />
        {/* <Route path="/signIn" element={<Signin />} /> */}
      </Routes>
    </>
  )
}

export default App
