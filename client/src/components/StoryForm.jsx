import React, { useEffect, useState } from "react"
import { ImSpinner3 } from "react-icons/im"
import { useNotification } from "../hooks/index.js"
import { GiCancel } from "react-icons/gi"
import style from "./StoryForm.module.css"
import Selector from "../components/Selector.jsx"
const genderOptions = [
  { title: "Movies", value: "Movies" },
  { title: "Health", value: "Health" },
  { title: "Fruits", value: "Fruits" },
  { title: "Cricket", value: "Cricket" }
]

const defaultStoryInfo = {
  heading: "",
  description: "",
  image: ""
}
const validateStory = (data) => {
  if (typeof data.category !== "string" || data.category.trim() === "") {
    return { isValid: false, error: "Category is missing or empty!" }
  }

  if (!Array.isArray(data.stories)) {
    return { isValid: false, error: "Stories should be an array!" }
  }

  for (let i = 0; i < data.stories.length; i++) {
    const story = data.stories[i]

    if (typeof story.heading !== "string" || story.heading.trim() === "") {
      return {
        isValid: false,
        error: `Heading of story ${i + 1} is missing or empty!`
      }
    }
    if (
      typeof story.description !== "string" ||
      story.description.trim() === ""
    ) {
      return {
        isValid: false,
        error: `Description of story ${i + 1} is missing or empty!`
      }
    }
    if (typeof story.image !== "string" || story.image.trim() === "") {
      return {
        isValid: false,
        error: `Image of story ${i + 1} is missing or empty!`
      }
    }
  }

  return { isValid: true, error: null }
}

const StoryForm = ({
  initialState,
  btnTitle,
  btnTitle1,
  btnTitle2,
  busy,
  onSubmit,
  onClose
}) => {
  const [story, setStory] = useState(
    initialState || {
      category: "",
      stories: Array(3)
        .fill()
        .map(() => ({ ...defaultStoryInfo }))
    }
  )
  const [activeSlide, setActiveSlide] = useState(0)
  const [errors, setErrors] = useState("")

  const handleClick = (e) => {
    if (e.currentTarget.id === "modal-container") onClose && onClose()
    console.log("second")
  }

  const handleStoryChange = (e, index) => {
    const { name, value } = e.target
    const stories = [...story.stories]
    stories[index][name] = value
    setStory({ ...story, stories })
  }

  const handleCategoryChange = (e) => {
    setStory({ ...story, category: e.target.value })
  }

  const handleAddStory = () => {
    if (story.stories.length < 6) {
      setStory(
        (prevState) => {
          const newStories = [...prevState.stories, { ...defaultStoryInfo }]
          return { ...prevState, stories: newStories }
        },
        () => {
          setActiveSlide(story.stories.length - 1)
        }
      )
    }
  }

  const handleDeleteStory = (index) => {
    if (story.stories.length > 3) {
      const stories = [...story.stories]
      stories.splice(index, 1)
      setStory({ ...story, stories })
      setActiveSlide(0) // Reset to the first slide
    }
  }

  const handleNextSlide = () => {
    if (activeSlide < story.stories.length - 1) {
      setActiveSlide(activeSlide + 1)
    }
  }

  const handlePreviousSlide = () => {
    if (activeSlide > 0) {
      setActiveSlide(activeSlide - 1)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { error } = validateStory(story)
    if (error) return setErrors(error)
    onSubmit(story)
    // setStory({
    //   category: "",
    //   stories: [defaultStoryInfo]
    // })
  }

  // useEffect(() => {
  //   if (initialState) {
  //     setSlidesData([...initialState.stories])
  //   }
  //   console.log(initialState)
  // }, [initialState])

  return (
    <>
      <form className={style.form_container} onSubmit={handleSubmit}>
        <div className={style.caution}>Add upto 6 slides</div>
        <div className={style.slides_container}>
          {story.stories.map((_, index) => (
            <div className={style.slide} key={index}>
              <button
                className={style.slide_btn}
                type="button"
                style={{
                  borderColor:
                    activeSlide === index ? "#73ABFF" : "transparent",
                  border: activeSlide === index ? "2px solid #73ABFF" : "none"
                }}
                onClick={() => setActiveSlide(index)}
              >
                Slide {index + 1}
              </button>
              {index !== 2 && index === story.stories.length - 1 && (
                <button
                  className={style.close_btn}
                  type="button"
                  onClick={() => handleDeleteStory(index)}
                >
                  <GiCancel />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddStory}
            className={style.slide_btn}
          >
            Add +
          </button>
        </div>
        {story.stories.map((storyInfo, index) => (
          <div
            className={style.inputfield}
            key={index}
            style={{ display: activeSlide === index ? "block" : "none" }}
          >
            <div className={style.inputdivs}>
              {" "}
              <label htmlFor="heading">Heading:</label>
              <input
                name="heading"
                id="heading"
                value={storyInfo.heading}
                onChange={(e) => handleStoryChange(e, index)}
                placeholder="Heading"
              />
            </div>
            <div className={style.inputdivs}>
              {" "}
              <label htmlFor="description">Description:</label>
              <input
                name="description"
                id="description"
                value={storyInfo.description}
                onChange={(e) => handleStoryChange(e, index)}
                placeholder="Description"
              />
            </div>
            <div className={style.inputdivs}>
              {" "}
              <label htmlFor="image">Image:</label>
              <input
                name="image"
                id="image"
                value={storyInfo.image}
                onChange={(e) => handleStoryChange(e, index)}
                placeholder="Image"
              />
            </div>
          </div>
        ))}
        <div className={style.inputfield}>
          <div className={style.inputdivs}>
            {" "}
            <label htmlFor="category">Category:</label>
            <Selector
              options={genderOptions}
              label="Category"
              value={story.category}
              onChange={handleCategoryChange}
              name="category"
            />
          </div>
        </div>
        {errors && <div className={style.error}>{errors}</div>}
        <div className={style.buttons}>
          <div className={style.navButtons}>
            <button
              className={style.btn1}
              type="button"
              onClick={handlePreviousSlide}
            >
              {btnTitle1}
            </button>
            <button
              className={style.btn2}
              type="button"
              onClick={handleNextSlide}
            >
              {btnTitle2}
            </button>
          </div>

          <button className={style.btn3} type="submit">
            {busy ? <ImSpinner3 className="animate-spin" /> : btnTitle}
          </button>
        </div>

        <div
          className={style.close_icon}
          onClick={handleClick}
          id="modal-container"
        >
          <GiCancel />
        </div>
      </form>
      {/* for mobile view  */}
      <div className={style.story_container}>
        <div
          className={style.close_icon}
          onClick={handleClick}
          id="modal-container"
        >
          <GiCancel />
        </div>
        <p>Add story to feed</p>

        <div className={style.pro_container}>
          <div className={style.slides_container}>
            {story.stories.map((_, index) => (
              <div className={style.slide} key={index}>
                <button
                  className={style.slide_btn}
                  type="button"
                  style={{
                    borderColor:
                      activeSlide === index ? "#73ABFF" : "transparent",
                    border: activeSlide === index ? "2px solid #73ABFF" : "none"
                  }}
                  onClick={() => setActiveSlide(index)}
                >
                  Slide {index + 1}
                </button>
                {index !== 2 && index === story.stories.length - 1 && (
                  <button
                    className={style.close_btn}
                    type="button"
                    onClick={() => handleDeleteStory(index)}
                  >
                    <GiCancel />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddStory}
              className={style.slide_btn}
            >
              Add +
            </button>
          </div>
          <div className={style.input_details}>
            <div>
              {story.stories.map((storyInfo, index) => (
                <div
                  className={style.inputfield}
                  key={index}
                  style={{ display: activeSlide === index ? "block" : "none" }}
                >
                  <div className={style.inputdivs}>
                    {" "}
                    <label htmlFor="heading">Heading:</label>
                    <input
                      name="heading"
                      id="heading"
                      value={storyInfo.heading}
                      onChange={(e) => handleStoryChange(e, index)}
                      placeholder="Heading"
                    />
                  </div>
                  <div className={style.inputdivs}>
                    {" "}
                    <label htmlFor="description">Description:</label>
                    <input
                      name="description"
                      id="description"
                      value={storyInfo.description}
                      onChange={(e) => handleStoryChange(e, index)}
                      placeholder="Description"
                    />
                  </div>
                  <div className={style.inputdivs}>
                    {" "}
                    <label htmlFor="image">Image:</label>
                    <input
                      name="image"
                      id="image"
                      value={storyInfo.image}
                      onChange={(e) => handleStoryChange(e, index)}
                      placeholder="Image"
                    />
                  </div>
                </div>
              ))}
              <div className={style.inputfield}>
                <div className={style.inputdivs}>
                  {" "}
                  <label htmlFor="category">Category:</label>
                  <Selector
                    options={genderOptions}
                    label="Category"
                    value={story.category}
                    onChange={handleCategoryChange}
                    name="category"
                  />
                </div>
              </div>
            </div>
            {errors && <div className={style.error}>{errors}</div>}
            <div className={style.buttons}>
              <button
                className={style.btn3}
                type="submit"
                onClick={handleSubmit}
              >
                {busy ? <ImSpinner3 className="animate-spin" /> : btnTitle}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StoryForm
