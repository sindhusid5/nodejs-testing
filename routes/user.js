const { User } = require('../model/user')
const { Login } = require('../model/login')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateAuthToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '9h' })
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    return res.json(users)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

const getUserById = async (req, res) => {
  try {
    const requestedUserId = parseInt(req.params.id)
    const loggedInUserId = req.auth.id // Access the authenticated user's id

    console.log('requestedUserId:', requestedUserId)
    console.log('loggedInUserId:', loggedInUserId)

    // Check if the requested user ID matches the ID of the authenticated user
    if (requestedUserId !== loggedInUserId) {
      console.log('Unauthorized access detected.')
      return res.status(403).json({ error: 'Unauthorized ' })
    }

    const user = await User.findByPk(requestedUserId)
    if (!user) {
      return res
        .status(404)
        .json({ error: `User with id ${requestedUserId} not found` })
    }

    return res.json(user)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

const addUser = async (req, res) => {
  try {
    // Check if the user is authorized (user ID is 1)
    if (req.auth.id !== 1) {
      return res.status(403).json({ error: 'Unauthorized' })
    }

    const { name, username, email } = req.body // Remove 'id' from here

    if (!name || !email || !username) {
      return res.status(400).json({ error: 'All fields are needed' })
    }

    // Create a new user instance using the User model
    const newUser = await User.create({
      username,
      name,
      email
      // You don't need to include 'id' here as it's auto-incremented
    })

    return res.json(newUser) // Return the newly created user
  } catch (error) {
    // Handle Sequelize validation errors
    if (error.name === 'SequelizeValidationError') {
      return res
        .status(400)
        .json({ error: error.errors.map((err) => err.message) })
    }
    console.error(error)

    console.error(error.message)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body

    // Find the user by username
    const user = await Login.findOne({ where: { username } })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Validate password
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid password' })
    }

    // Generate authentication token
    const token = generateAuthToken(user.id)

    // Return token and user details
    return res.json({ token, username: user.username })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = { getAllUsers, getUserById, addUser, loginUser }
