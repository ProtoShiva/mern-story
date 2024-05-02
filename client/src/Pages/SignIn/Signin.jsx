import React, { useState } from "react"
import style from "../Register/Sign.module.css"
import { useAuth, useNotification } from "../../hooks"
import ModalContainer from "../../components/ModalContainer"
import { GiCancel } from "react-icons/gi"
import { MdOutlineRemoveRedEye } from "react-icons/md"
import { FiEyeOff } from "react-icons/fi"
const validateUserInfo = ({ name, password }) => {
  const isValidName = /^[a-z A-Z]+$/

  if (!name.trim()) return { ok: false, error: "Name is missing!" }
  if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" }

  if (!password.trim()) return { ok: false, error: "Password is missing!" }
  if (password.length < 8)
    return { ok: false, error: "Password must be 8 characters long!" }

  return { ok: true }
}

const Signin = ({ visible, onClose }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const { updateNotification } = useNotification()
  const { handleLogin, authInfo, errors, setErrors } = useAuth()
  const { isPending, isLoggedIn } = authInfo

  const handleChange = (e) => {
    const { value, name } = e.target
    setUserInfo({ ...userInfo, [name]: value })
    setErrors(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { ok, error } = validateUserInfo(userInfo)

    if (!ok) return setErrors(error)
    handleLogin(userInfo.name, userInfo.password)
    setUserInfo({ name: "", password: "" })
    updateNotification("success", "User LoggedIn Successfully")
    onClose()
  }

  const handleClick = (e) => {
    if (e.currentTarget.id === "modal-container") onClose && onClose()
    console.log("third")
  }

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <div className={style.main_container}>
        <form onSubmit={handleSubmit} className={style.form_container}>
          <div
            className={style.close_icon}
            onClick={handleClick}
            id="modal-container"
          >
            <GiCancel />
          </div>

          <div className={style.heading}>
            {" "}
            <h2>Login to SwipTory</h2>
          </div>
          <div className={style.fields}>
            {" "}
            <div className={style.inputfields}>
              <label htmlFor="userName">Username</label>
              <div className={style.passField}>
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={style.inputfields}>
              <label htmlFor="password">Password</label>
              <div className={style.passField}>
                <input
                  className={style.passInput}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userInfo.password}
                  onChange={handleChange}
                />
                {showPassword ? (
                  <MdOutlineRemoveRedEye
                    onClick={() => setShowPassword(!showPassword)}
                    className={style.passIcons}
                  />
                ) : (
                  <FiEyeOff
                    onClick={() => setShowPassword(!showPassword)}
                    className={style.passIcons}
                  />
                )}
              </div>
            </div>
            {errors && <div className={style.error}>{errors}</div>}
            <div className={style.register_btn}>
              {" "}
              <input type="submit" value="Login" />
            </div>
          </div>
        </form>
      </div>
    </ModalContainer>
  )
}

export default Signin
