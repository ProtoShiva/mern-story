import { catchError, getToken } from "../utils/helper"
import axios from "axios"
export const createStory = async (formdata) => {
  console.log(formdata)
  const token = getToken()
  try {
    const { data } = await axios.post("/api/story/create", formdata, {
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

export const getStories = async (pageNo, limit) => {
  try {
    const { data } = await axios.get(
      `/api/story/allStories?pageNo=${pageNo}&limit=${limit}`
    )
    return data
  } catch (error) {
    return catchError(error)
  }
}

export const getUserStories = async (pageNo, limit) => {
  const token = getToken()
  try {
    const { data } = await axios.get(
      `/api/story/userStories?pageNo=${pageNo}&limit=${limit}`,
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

export const showMoreStories = async (pageNo, limit, category) => {
  try {
    const { data } = await axios.get(
      `/api/story/cat?pageNo=${pageNo}&limit=${limit}&category=${category}`
    )
    return data
  } catch (error) {
    return catchError(error)
  }
}

export const filterStories = async (pageNo, limit, category) => {
  try {
    const { data } = await axios.get(
      `/api/story/cat?pageNo=${pageNo}&limit=${limit}&category=${category}`
    )
    return data
  } catch (error) {
    return catchError(error)
  }
}

export const updateStory = async (id, formData) => {
  const token = getToken()
  try {
    const { data } = await axios.put("/api/story/update/" + id, formData, {
      headers: {
        authorization: "Bearer " + token,
        "content-type": "application/json"
      }
    })
    return data
  } catch (error) {
    return catchError(error)
  }
}
