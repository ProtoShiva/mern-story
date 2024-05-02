import mongoose from "mongoose"
const { Schema } = mongoose

const storyDataSchema = new Schema({
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

const storySchema = new Schema(
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
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    stories: [storyDataSchema]
  },
  { timestamps: true }
)

storySchema.index({ name: "text" })

const Storymodel = mongoose.model("Story", storySchema)

export default Storymodel
