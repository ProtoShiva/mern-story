import express from "express"
import { isAuth } from "../middlewares/auth.js"
import { create, signIn } from "../controllers/auth.controller.js"

import {
  userValidtor,
  validate,
  signInValidator
} from "../middlewares/validator.js"

const router = express.Router()

router.post("/create", userValidtor, validate, create)
router.post("/sign-in", signInValidator, validate, signIn)
router.get("/is-auth", isAuth, (req, res) => {
  const { user } = req
  res.json({
    user: {
      id: user._id,
      name: user.name
    }
  })
})

export default router
