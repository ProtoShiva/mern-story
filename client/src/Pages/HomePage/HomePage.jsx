import React, { useEffect, useRef, useState } from "react"
import { PiListFill } from "react-icons/pi"
import { useAuth } from "../../hooks"
import categories from "../../utils/categories"
import style from "./HomePage.module.css"
import { Link, useNavigate } from "react-router-dom"
import StoryUpload from "../../components/StoryUpload"
import Stories from "../../components/Stories"
import Signin from "../SignIn/Signin"
import { RxBookmarkFilled } from "react-icons/rx"
import Signup from "../Register/Signup"
import pic from "../../assets/Calm and confident.png"
import { filterStories } from "../../api/story"

let currentPageNo = 0
const limit = 2
const HomePage = () => {
  const { authInfo, handleLogout, setStatus, fetchStories } = useAuth()
  const [showActorUploadModal, setShowActorUploadModal] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [showloginModal, setShowloginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("")
  const { isLoggedIn, profile } = authInfo
  const navigate = useNavigate()
  const node = useRef()
  const dropdownRef = useRef()
  const handleClickOutside = (e) => {
    if (
      node.current?.contains(e.target) ||
      dropdownRef.current?.contains(e.target)
    ) {
      return
    }
    setShowPopup(false)
  }
  const hideActorUploadModal = () => {
    setShowActorUploadModal(false)
  }
  const hideloginModal = () => {
    setShowloginModal(false)
  }

  const handleStories = (cat) => {
    if (cat === "All") {
      fetchStories(currentPageNo, limit)
      setSelectedCategory("")
    }
    fetchfilteredStories(currentPageNo, limit, cat)
    setSelectedCategory(cat)
  }
  const hideRegisterModal = () => {
    setShowRegisterModal(false)
  }
  const fetchfilteredStories = async (pageNo, limit, category) => {
    const { allStories, error } = await filterStories(pageNo, limit, category)
    if (error) return updateNotification("error", error)

    if (!allStories.length) {
      currentPageNo = pageNo - 1
      return setReachedToEnd(true)
    }

    setStatus([...allStories])
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  console.log(authInfo)

  return (
    <div className={style.container}>
      <header className={style.header}>
        <h1 onClick={() => navigate("/")}>SwipTory</h1>
        {isLoggedIn ? (
          <div className={style.loggenIn}>
            <button
              className={style.btn1}
              onClick={() => navigate("/bookMarks")}
            >
              bookMarks
            </button>
            <button
              className={style.btn2}
              onClick={() => setShowActorUploadModal(true)}
            >
              Add a Story
            </button>
            <div className={style.profile_photo}>
              <img
                src={pic}
                alt="photo"
                style={{ borderRadius: "50%", cursor: "pointer" }}
              />
            </div>
            <div
              ref={node}
              onClick={() => setShowPopup(!showPopup)}
              style={{ userSelect: "none" }}
              className={style.hamburger}
            >
              {" "}
              <PiListFill />
            </div>
            {showPopup && (
              <div className={style.popup_inner} ref={dropdownRef}>
                <div className={style.info_div}>
                  {" "}
                  <img
                    src={pic}
                    alt="photo"
                    style={{
                      borderRadius: "50%",
                      cursor: "pointer",
                      height: "30px"
                    }}
                  />
                  <p>{profile && profile.name}</p>
                  <p
                    className={style.cross}
                    style={{
                      fontSize: "1rem",
                      marginLeft: "0.6rem"
                    }}
                    onClick={() => setShowPopup(!showPopup)}
                  >
                    X
                  </p>
                </div>
                <button className={`${style.btn1} ${style.logoutbtn}`}>
                  Your Story
                </button>
                <button
                  className={`${style.btn1} ${style.logoutbtn}`}
                  onClick={() => {
                    setShowActorUploadModal(true)
                    setShowPopup(!showPopup)
                  }}
                >
                  Add Story
                </button>
                <div className={`${style.btn1} ${style.logoutbtn}`}>
                  <RxBookmarkFilled style={{ fontSize: "1.4rem" }} />
                  <button>Bookmarks</button>
                </div>

                <button
                  className={`${style.btn1} ${style.logoutbtn} ${style.logout}`}
                  onClick={handleLogout}
                >
                  logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={style.notloggenIn}>
            <button
              onClick={() => setShowRegisterModal(true)}
              className={style.btn1}
            >
              Register Now
            </button>
            <button
              onClick={() => setShowloginModal(true)}
              className={style.btn2}
            >
              Sign In
            </button>
            <div
              ref={node}
              onClick={() => setShowPopup(!showPopup)}
              style={{ userSelect: "none", marginLeft: "auto" }}
              className={style.hamburger2}
            >
              {" "}
              <PiListFill />
            </div>
            {showPopup && (
              <div className={style.popup_inner} ref={dropdownRef}>
                <p
                  onClick={() => setShowPopup(!showPopup)}
                  style={{ marginLeft: "auto", marginBottom: "4rem" }}
                >
                  x
                </p>
                <button
                  onClick={() => {
                    setShowRegisterModal(true)
                    setShowPopup(!showPopup)
                  }}
                  className={`${style.btn1} ${style.logoutbtn}`}
                >
                  Register Now
                </button>
                <button
                  onClick={() => {
                    setShowloginModal(true)
                    setShowPopup(!showPopup)
                  }}
                  className={`${style.btn1} ${style.logoutbtn}`}
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        )}
      </header>
      <div className={style.titles}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`${style.image_box} ${
              selectedCategory === category.name ? style.selected : ""
            }`}
            onClick={() => handleStories(category.name)}
          >
            <img
              src={category.image}
              alt={category.name}
              style={{ filter: "brightness(50%)" }}
            />
            <p>{category.name}</p>
          </div>
        ))}
      </div>
      <StoryUpload
        visible={showActorUploadModal}
        onClose={hideActorUploadModal}
      />
      <Stories />
      <Signin visible={showloginModal} onClose={hideloginModal} />
      <Signup visible={showRegisterModal} onClose={hideRegisterModal} />
    </div>
  )
}

export default HomePage
