import React, { useEffect, useState } from "react"
import { getUserStories } from "../api/story"
import { useAuth, useNotification } from "../hooks"
import UpdateStory from "./UpdateStory"
import style from "./Stories.module.css"
import StoryStatus from "./StoryStatus"
import { TbEdit } from "react-icons/tb"
let currentPageNo = 0

const Stories = () => {
  const [setReachedToEnd] = useState(false)

  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [showUserStory, setShowUserStory] = useState([])

  const { authInfo, status, setStatus, fetchStories, limit, setLimit } =
    useAuth()
  const { profile, isLoggedIn } = authInfo
  const { updateNotification } = useNotification()

  const fetchUserStories = async (pageNo, limit) => {
    const { userStories, error } = await getUserStories(pageNo, limit)
    if (error) return updateNotification("error", error)

    if (!userStories.length) {
      currentPageNo = pageNo - 1
      return setReachedToEnd(true)
    }

    setShowUserStory([...userStories])
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserStories(currentPageNo, limit)
    }
  }, [isLoggedIn])

  const handleOnEditClick = (sId) => {
    setShowUpdateModal(true)
    setSelectedProfile(sId)
  }

  const hideUpdateModal = () => {
    setShowUpdateModal(false)
  }
  const hideStatusModal = () => {
    setShowStatusModal(false)
  }

  const handleOnActorUpdate = (profile) => {
    const updatedStories = status.map((story) => {
      if (profile.id === story.id) {
        return profile
      }

      return story
    })

    setStatus([...updatedStories])
  }
  const handleShowStoryClick = (statusId) => {
    console.log(statusId)
    setSelectedStatus(statusId)
    setShowStatusModal(true)
  }

  const handleOnClick = () => {
    const newLimit = limit + 1
    setLimit(newLimit)
    fetchStories(currentPageNo, newLimit)
  }

  return (
    <>
      <div className={style.container}>
        {isLoggedIn && (
          <>
            <h1 className={style.heading}>Your stories</h1>
            {showUserStory.length > 0 ? (
              <div className={style.story_grids}>
                {showUserStory.map(
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
              </div>
            ) : (
              <div>No story to display</div>
            )}

            {showUserStory.length > 0 && (
              <div
                className={style.showmore_btn}
                onClick={() => handleOnClick()}
              >
                Show more
              </div>
            )}
          </>
        )}

        {status.map((categoryData, index) => (
          <div key={index} style={{ marginTop: "2rem" }}>
            <h2 className={style.heading}>
              Top Stories about {categoryData.category}
            </h2>
            <div className={style.story_grids}>
              {categoryData.stories.map((storyDocument, storyIndex) => (
                <div className={style.story_grid} key={storyIndex}>
                  {storyDocument.stories?.length > 0 && (
                    <div
                      className={style.img_container}
                      onClick={() => handleShowStoryClick(storyDocument)}
                      style={{
                        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent), url(${storyDocument.stories[0]?.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100%",
                        height: "100%",
                        borderRadius: "20px"
                      }}
                    >
                      <h1>{storyDocument.stories[0]?.heading}</h1>
                      <p>{storyDocument.stories[0]?.description}</p>
                    </div>
                  )}
                  {storyDocument.owner === profile?.id && (
                    <button
                      className={style.edit_btn}
                      onClick={() => handleOnEditClick(storyDocument)}
                    >
                      <TbEdit />
                      Edit
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className={style.showmore_btn} onClick={() => handleOnClick()}>
              Show more
            </div>
          </div>
        ))}
        <UpdateStory
          visible={showUpdateModal}
          onClose={hideUpdateModal}
          initialState={selectedProfile}
          onSuccess={handleOnActorUpdate}
        />
        <StoryStatus
          visible={showStatusModal}
          onClose={hideStatusModal}
          initialState={selectedStatus}
        />
      </div>
    </>
  )
}

export default Stories
