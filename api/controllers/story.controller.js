import { isValidObjectId } from "mongoose"
import Story from "../models/story.model.js"
import { sendError } from "../utils/helper.js"
import mongoose from "mongoose"

export const createStory = async (req, res) => {
  const { category, stories } = req.body
  const userId = req.user._id

  const newStory = new Story({
    owner: userId,
    category: category,
    likes: [],
    bookmarks: [],
    stories: stories
  })

  await newStory.save()
  res.status(201).json({ story: newStory })
}

export const updateStory = async (req, res) => {
  const newStoryData = req.body
  const { storyId } = req.params
  console.log(storyId)
  if (!isValidObjectId(storyId)) return sendError(res, "Invalid request!")

  const story = await Story.findById(storyId) // Use findById method

  if (!story) return sendError(res, "Invalid request, record not found!")

  story.set(newStoryData) // Update the story directly

  const updatedStory = await story.save()

  res.status(200).json({ stories: updatedStory })
}

export const getallCategories = async (req, res) => {
  const { pageNo = 0, limit = 10, category } = req.query
  let allStories = []

  if (!category) {
    return res.status(400).json({ error: "Category is required" })
  }
  const stories = await Story.find({ category })
    .sort({ createdAt: -1 })
    .skip(parseInt(pageNo) * parseInt(limit))
    .limit(parseInt(limit))

  allStories.push({ category, stories })

  res.json({ allStories })
}

export const getAllUserStories = async (req, res) => {
  const { pageNo = 0, limit = 10 } = req.query
  const userId = req.user._id
  const categories = await Story.distinct("category", { owner: userId })

  let userStories = []

  for (let category of categories) {
    const stories = await Story.find({ category, owner: userId })
      .sort({ createdAt: -1 })
      .skip(parseInt(pageNo) * parseInt(limit))
      .limit(parseInt(limit))

    userStories = [...userStories, ...stories]
  }

  res.json({ userStories })
}

export const getallStories = async (req, res) => {
  const { pageNo = 0, limit = 10 } = req.query

  const categories = await Story.distinct("category")

  let allStories = []

  for (let category of categories) {
    const stories = await Story.find({ category })
      .sort({ createdAt: -1 })
      .skip(parseInt(pageNo) * parseInt(limit))
      .limit(parseInt(limit))

    allStories.push({ category, stories })
  }

  res.json({ allStories })
}

export const getLikes = async (req, res) => {
  const userId = req.user._id
  const story = await Story.findById(req.body.storyId)
  if (!story.likes.includes(userId)) {
    const storyLikes = await Story.findByIdAndUpdate(
      req.body.storyId,
      {
        $push: { likes: userId }
      },
      { new: true }
    )
    res.status(200).json({
      storyLikes
    })
  } else {
    res.status(400).json({
      error: "User has already liked this story"
    })
  }
}

export const getUnLikes = async (req, res) => {
  const userId = req.user._id
  const storyLikes = await Story.findByIdAndUpdate(
    req.body.storyId,
    {
      $pull: { likes: userId }
    },
    { new: true }
  )
  res.status(200).json({
    storyLikes
  })
}

export const getPrevLikes = async (req, res) => {
  const storyLikes = await Story.findById(req.params.id)
  if (!storyLikes) {
    return res.status(404).json({ error: "Story not found" })
  }
  res.status(200).json({
    storyLikes
  })
}
