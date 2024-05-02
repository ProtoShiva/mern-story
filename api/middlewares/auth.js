import jwt from "jsonwebtoken"
import { sendError } from "../utils/helper.js"
import User from "../models/user.model.js"

export const isAuth = async (req, res, next) => {
  const token = req.headers?.authorization

  if (!token) return sendError(res, "Invalid token!")
  const jwtToken = token.split("Bearer ")[1]

  if (!jwtToken) return sendError(res, "Invalid token!")
  const decode = jwt.verify(jwtToken, process.env.JWT_SECRET)
  const { userId } = decode

  const user = await User.findById(userId)
  if (!user) return sendError(res, "unauthorized access!")

  req.user = user

  next()
}
