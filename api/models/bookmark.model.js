import mongoose from "mongoose"
const { Schema } = mongoose

const bookMarkSchema = new Schema({
  heading: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
})

const bookmarkSchema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    category: {
      type: String,
      required: true
    },
    stories: [bookMarkSchema]
  },
  { timestamps: true }
)

const Bookmarkmodel = mongoose.model("Bookmark", bookmarkSchema)

export default Bookmarkmodel
