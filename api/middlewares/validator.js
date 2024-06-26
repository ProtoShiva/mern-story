import { check, validationResult } from "express-validator"

export const userValidtor = [
  check("name").trim().not().isEmpty().withMessage("Name is missing!"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!")
]

export const validatePassword = [
  check("newPassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!")
]

export const signInValidator = [
  check("name").trim().not().isEmpty().withMessage("Name is missing!"),
  check("password").trim().not().isEmpty().withMessage("Password is missing!")
]

// export const storyInfoValidator = [
//   check("heading").trim().not().isEmpty().withMessage("heading is missing!"),
//   check("description")
//     .trim()
//     .not()
//     .isEmpty()
//     .withMessage("Description is a required field!"),
//   check("image")
//     .trim()
//     .not()
//     .isEmpty()
//     .withMessage("Image is a required field!"),
//   check("category")
//     .trim()
//     .not()
//     .isEmpty()
//     .withMessage("Category is a required field!")
// ]
export const storyInfoValidator = [
  check("stories.*.heading")
    .trim()
    .not()
    .isEmpty()
    .withMessage("heading is missing!"),
  check("stories.*.description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Description is a required field!"),
  check("stories.*.image")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Image is a required field!"),
  check("category")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Category is a required field!")
]

export const validate = (req, res, next) => {
  const error = validationResult(req).array()
  if (error.length) {
    return res.json({ error: error[0].msg })
  }

  next()
}
