import express from "express"
import {
  createBookmark,
  deleteBookmark,
  getallBookmarks
} from "../controllers/bookmark.controller.js"
import { isAuth } from "../middlewares/auth.js"

import { validate, storyInfoValidator } from "../middlewares/validator.js"

const router = express.Router()

router.post("/create", isAuth, createBookmark)
router.delete("/delete/:id", isAuth, deleteBookmark)
router.get("/allBook", isAuth, getallBookmarks)
export default router
