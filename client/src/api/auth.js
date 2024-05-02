import axios from "axios"

export const createUser = async (userInfo) => {
  try {
    const { data } = await axios.post("/api/user/create", userInfo)
    return data
  } catch (error) {
    const { response } = error
    if (response?.data) return response.data

    return { error: error.message || error }
  }
}

export const signInUser = async (userInfo) => {
  try {
    const { data } = await axios.post("/api/user/sign-in", userInfo)
    return data
  } catch (error) {
    const { response } = error
    if (response?.data) return response.data

    return { error: error.message || error }
  }
}

export const getIsAuth = async (token) => {
  try {
    const { data } = await axios.get("/api/user/is-auth", {
      headers: {
        Authorization: "Bearer " + token,
        accept: "application/json"
      }
    })
    return data
  } catch (error) {
    const { response } = error
    if (response?.data) return response.data

    return { error: error.message || error }
  }
}
