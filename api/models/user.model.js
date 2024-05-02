import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }

  next()
})

userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password)
  return result
}

const Usermodel = mongoose.model("User", userSchema)

export default Usermodel
