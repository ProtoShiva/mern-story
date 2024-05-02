import "express-async-errors"
import express from "express"
import { errorHandler } from "./middlewares/error.js"
import "dotenv/config"
import connectDB from "./db/db.js"
import cors from "cors"
import authRouter from "./routes/auth.route.js"
import storyRouter from "./routes/story.route.js"
import bookRouter from "./routes/bookmark.route.js"
import { handleNotFound } from "./utils/helper.js"
import path from "path"
const __dirname = path.resolve()
const app = express()
const port = 3000

app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173"
  })
)
app.use("/api/user", authRouter)
app.use("/api/story", storyRouter)
app.use("/api/book", bookRouter)

app.use(express.static(path.join(__dirname, "/client/dist")))

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
})
