import React, { useState } from "react"
import { GiCancel } from "react-icons/gi"
import style from "../Register/Sign.module.css"
import { createUser } from "../../api/auth"
import ModalContainer from "../../components/ModalContainer"
import { useNotification } from "../../hooks"
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

const Signup = ({ visible, onClose }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState("")
  const { updateNotification } = useNotification()
  const handleChange = (e) => {
    const { value, name } = e.target
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { ok, error } = validateUserInfo(userInfo)

    if (!ok) return setErrors(error)

    const response = await createUser(userInfo)
    if (response.error) return setErrors(response.error)
    setUserInfo({ name: "", password: "" })
    updateNotification("success", "User Registered Successfully")
    onClose()
  }
  const handleClick = (e) => {
    if (e.currentTarget.id === "modal-container") onClose && onClose()
    console.log("first")
  }

  const { name, password } = userInfo

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <div className={style.main_container}>
        <form onSubmit={handleSubmit} className={style.form_container}>
          <div
            className={style.close_icon}
            onClick={handleClick}
            id="modal-container"
          >
            <GiCancel style={{ cursor: "pointer" }} />
          </div>

          <div className={style.heading}>
            {" "}
            <h2>Register to SwipTory</h2>
          </div>
          <div className={style.fields}>
            {" "}
            <div className={style.inputfields}>
              <label htmlFor="userName">Username</label>
              <div className={style.passField}>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={style.inputfields}>
              <label htmlFor="password">Password</label>
              <div className={style.passField}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
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
              <input type="submit" value="Register" />
            </div>
          </div>
        </form>
      </div>
    </ModalContainer>
  )
}

export default Signup
