export const sendError = (res, error, statusCode = 401) =>
  res.status(statusCode).json({ error })

export const handleNotFound = (req, res) => {
  this.sendError(res, "Not found", 404)
}
