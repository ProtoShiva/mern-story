import express from "express"
import {
  createStory,
  updateStory,
  getallStories,
  getallCategories,
  getAllUserStories,
  getLikes,
  getUnLikes,
  getPrevLikes
} from "../controllers/story.controller.js"
import { isAuth } from "../middlewares/auth.js"

import { validate, storyInfoValidator } from "../middlewares/validator.js"

const router = express.Router()

router.post("/create", isAuth, storyInfoValidator, validate, createStory)

router.put(
  "/update/:storyId",
  isAuth,
  storyInfoValidator,
  validate,
  updateStory
)

router.get("/cat", getallCategories)
router.get("/userStories", isAuth, getAllUserStories)
router.get("/allStories", getallStories)
router.put("/likes", isAuth, getLikes)
router.put("/unlikes", isAuth, getUnLikes)
router.get("/prevLike/:id", getPrevLikes)
export default router
