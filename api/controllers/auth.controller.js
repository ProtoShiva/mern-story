import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import { sendError } from "../utils/helper.js"

export const create = async (req, res) => {
  const { name, password } = req.body

  const oldUser = await User.findOne({ name })

  if (oldUser) return sendError(res, "This username is already in use!")

  const newUser = new User({ name, password })
  await newUser.save()

  res.status(201).json({
    user: {
      id: newUser._id,
      name: newUser.name
    }
  })
}

export const signIn = async (req, res) => {
  const { name, password } = req.body

  const user = await User.findOne({ name })
  if (!user) return sendError(res, "Email/Password mismatch!")

  const matched = await user.comparePassword(password)
  if (!matched) return sendError(res, "Email/Password mismatch!")

  const { _id } = user

  const jwtToken = jwt.sign({ userId: _id }, process.env.JWT_SECRET)

  res.json({
    user: { id: _id, token: jwtToken }
  })
}
