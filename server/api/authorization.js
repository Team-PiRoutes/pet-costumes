const adminOnly = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(401)
    throw new Error(`Unauthorized attempt to access ${req.originalUrl} by non admin.`)
  }
}

const usersOnly = (req, res, next) => {
  if (!req.user || !req.user.id) {
    res.status(401)
    throw new Error(`Unauthorized attempt to access ${req.originalUrl} by non user`)
  }
}

module.exports = {
  adminOnly,
  usersOnly
}
