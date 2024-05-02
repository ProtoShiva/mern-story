import React, { useEffect, useState } from "react"
import { getBooks } from "../api/bookmark"
import { useAuth, useNotification } from "../hooks"
import { TbEdit } from "react-icons/tb"
import style from "./Stories.module.css"
import StoryStatus from "./StoryStatus"
const BookMarks = () => {
  const [books, setBooks] = useState([])
  const { authInfo, status, setStatus, fetchStories, limit, setLimit } =
    useAuth()
  const { profile, isLoggedIn } = authInfo
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const { updateNotification } = useNotification()
  const fetchBookmarks = async () => {
    const { bookmarks, error } = await getBooks()
    if (error) return updateNotification("error", error)

    setBooks([...bookmarks])
  }

  const handleShowStoryClick = (statusId) => {
    setSelectedStatus(statusId)
    setShowStatusModal(true)
  }
  const hideStatusModal = () => {
    setShowStatusModal(false)
  }

  useEffect(() => {
    fetchBookmarks()
  }, [])
  return (
    <>
      <h1 className={style.heading}>Your BookMarks</h1>
      <div className={style.story_grids}>
        {books.map(
          (story) =>
            story.stories.length > 0 && (
              <div key={story._id} className={style.story_grid}>
                <div
                  className={style.img_container}
                  onClick={() => handleShowStoryClick(story)}
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent), url(${story.stories[0].image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px"
                  }}
                >
                  <h1>{story.stories[0].heading}</h1>
                  <p>{story.stories[0].description}</p>
                </div>
                {story.owner === profile?.id && (
                  <button
                    className={style.edit_btn}
                    onClick={() => handleOnEditClick(story)}
                  >
                    <TbEdit />
                    Edit
                  </button>
                )}
              </div>
            )
        )}
        <StoryStatus
          visible={showStatusModal}
          onClose={hideStatusModal}
          initialState={selectedStatus}
        />
      </div>
    </>
  )
}

export default BookMarks
