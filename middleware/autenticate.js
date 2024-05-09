const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' })
  }

  // Check token format
  const tokenPattern = /^Bearer\s(.+)$/
  const tokenMatch = token.match(tokenPattern)
  if (!tokenMatch) {
    return res.status(401).json({ error: 'Invalid token format' })
  }

  try {
    // Decode and verify token
    const decoded = jwt.verify(tokenMatch[1], process.env.JWT_SECRET)
    console.log('Decoded token:', decoded)
    req.auth = { id: decoded.id }
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

module.exports = { authenticate }
