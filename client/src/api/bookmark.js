import { catchError, getToken } from "../utils/helper"
import axios from "axios"
export const createBookmark = async (formdata) => {
  const token = getToken()
  try {
    const { data } = await axios.post("/api/book/create", formdata, {
      headers: {
        authorization: "Bearer " + token,
        accept: "application/json"
      }
    })

    return data
  } catch (error) {
    return catchError(error)
  }
}

export const deleteBookmark = async (storyId) => {
  const token = getToken()
  try {
    const { data } = await axios.delete(
      `/api/book/delete/${storyId}`, // Replace this with your actual API endpoint
      {
        headers: {
          authorization: "Bearer " + token,
          accept: "application/json"
        }
      }
    )
    return data
  } catch (error) {
    return catchError(error)
  }
}

export const getBooks = async () => {
  const token = getToken()
  try {
    const { data } = await axios.get("/api/book/allBook", {
      headers: {
        authorization: "Bearer " + token,
        accept: "application/json"
      }
    })
    return data
  } catch (error) {
    return catchError(error)
  }
}
