import { isValidObjectId } from "mongoose"
import Bookmark from "../models/bookmark.model.js"
import { sendError } from "../utils/helper.js"
import mongoose from "mongoose"

export const createBookmark = async (req, res) => {
  const { category, stories } = req.body
  const userId = req.user._id

  const newStory = new Bookmark({
    owner: userId,
    category: category,
    stories: stories
  })

  await newStory.save()
  res.status(201).json({ story: newStory })
}

export const deleteBookmark = async (req, res) => {
  const bookmark = await Bookmark.findByIdAndDelete(req.params.id)

  if (!bookmark) {
    return res.status(404).json({ error: "Bookmark not found" })
  }
  res.status(200).json({ message: "Bookmark deleted successfully" })
}

export const getallBookmarks = async (req, res) => {
  const userId = req.user._id
  const stories = await Bookmark.find({ owner: userId })
  if (!stories) return sendError(res, "Story not found!")
  res.status(201).json({ bookmarks: stories })
}
