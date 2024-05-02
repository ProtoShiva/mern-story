import React, { useState, useEffect } from "react"
// import { useNotification } from "../hooks/index.js"
import ModalContainer from "./ModalContainer.jsx"
import Stories from "react-insta-stories"
import { FaBookmark } from "react-icons/fa"
import { IoHeart } from "react-icons/io5"
import { TbLocationShare } from "react-icons/tb"
import { RxCross2 } from "react-icons/rx"
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri"
import style from "./StoryStatus.module.css"
import { useAuth, useNotification } from "../hooks/index.js"
import { createBookmark, deleteBookmark } from "../api/bookmark.js"
import axios from "axios"
import { catchError, getToken } from "../utils/helper.jsx"
export default function StoryStatus({ visible, onClose, initialState }) {
  const stories = initialState?.stories
  const { updateNotification } = useNotification()
  const [bookMarks, setBookMarks] = useState([])
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [bookmarkId, setBookmarkId] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const { authInfo } = useAuth()
  const { profile } = authInfo
  const [realLikes, setRealLikes] = useState(0)
  const userId = profile?.id
  console.log(userId)
  const trimData = (data) => {
    const { category, stories } = data
    return { category, stories }
  }
  const handleClose = (e) => {
    if (e.currentTarget.id === "modal-container") onClose && onClose()
    console.log("first")
  }
  const fetchStoryData = async () => {
    try {
      const { data } = await axios.get(
        `/api/story/prevLike/${initialState._id}`
      )
      setRealLikes(data.storyLikes.likes.length)
      setIsLiked(data.storyLikes.likes.includes(userId))
    } catch (error) {
      return catchError(error)
    }
  }
  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prevIndex) => {
        console.log("Previous index:", prevIndex)
        const nextIndex = prevIndex + 1
        console.log("Next index:", nextIndex)
        return nextIndex
      })
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => {
        console.log("Previous index:", prevIndex)
        const nextIndex = prevIndex - 1
        console.log("Next index:", nextIndex)
        return nextIndex
      })
    }
  }

  const handleClickLike = async (id) => {
    const token = getToken()
    try {
      const { data } = await axios.put(
        "/api/story/likes",
        {
          storyId: id
        },
        {
          headers: {
            authorization: "Bearer " + token,
            accept: "application/json"
          }
        }
      )
      setIsLiked(true)
      setRealLikes(data.storyLikes.likes.length)
    } catch (error) {
      return catchError(error)
    }
  }

  const handleClickUnLike = async (id) => {
    const token = getToken()
    try {
      const { data } = await axios.put(
        "/api/story/unlikes",
        {
          storyId: id
        },
        {
          headers: {
            authorization: "Bearer " + token,
            accept: "application/json"
          }
        }
      )
      setIsLiked(false)
      setRealLikes(data.storyLikes.likes.length)
    } catch (error) {
      return catchError(error)
    }
  }

  useEffect(() => {
    fetchStoryData()
  }, [initialState])

  const handleClick = async (data) => {
    const token = getToken()
    if (!isBookmarked) {
      // Create a bookmark
      const { error, story } = await createBookmark(trimData(data))
      if (error) return updateNotification("error", error)
      setIsBookmarked(true)
      setBookmarkId(story._id)
    } else {
      // Delete the bookmark
      const { error, story } = await deleteBookmark(bookmarkId)
      if (error) return updateNotification("error", error)
      setIsBookmarked(false)
      setBookmarkId(null)
    }
  }
  const storiesWithContent = stories?.map((story) => ({
    ...story,
    content: ({ action, isPaused, onNext, onPrevious }) => {
      return (
        <div
          className={style.mainStories}
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent), url(${story.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%"
          }}
        >
          <div className={style.change_btn}>
            {" "}
            <button onClick={handlePrev}>
              {" "}
              <RiArrowLeftSLine />
            </button>
            <button onClick={handleNext}>
              {" "}
              <RiArrowRightSLine />
            </button>
          </div>
          <div className={style.extraIcons}>
            <div>
              {" "}
              <RxCross2
                className={style.try}
                onClick={handleClose}
                id="modal-container"
              />
            </div>
            <div className={style.share}>
              {" "}
              <TbLocationShare />
            </div>
          </div>
          <h1>{story.heading}</h1>
          <p>{story.description}</p>
          <div className={style.storyIcons}>
            <div>
              <FaBookmark
                className={style.try}
                onClick={() => handleClick(initialState)}
                style={{ color: isBookmarked ? "blue" : "white" }}
              />
            </div>
            <div className={style.liked}>
              <div>
                <IoHeart
                  onClick={() =>
                    isLiked
                      ? handleClickUnLike(initialState._id)
                      : handleClickLike(initialState._id)
                  }
                  style={{ color: isLiked ? "red" : "white" }}
                />
              </div>
              <div className={style.likedCounter}>{realLikes}</div>
            </div>
          </div>
        </div>
      )
    }
  }))
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <Stories stories={storiesWithContent} currentIndex={currentIndex} />
    </ModalContainer>
  )
}
