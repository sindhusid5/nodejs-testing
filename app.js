const express = require('express')
const app = express()
const routes = require('./routes/user')
const middleware = require('./middleware/routingMiddleware')
const { authenticate } = require('./middleware/autenticate')
require('dotenv').config()

// Middleware
app.use(express.json())
app.use(middleware.routeLogger) // Use routeLogger middleware to log incoming requests

// Routes
app.post('/users/login', routes.loginUser)
app.use(authenticate) // Apply authentication middleware to all routes below this line
app.get('/users', routes.getAllUsers)
app.get('/users/:id', routes.getUserById)
app.post('/users', routes.addUser)

// Error handling middleware
app.use(middleware.errorHandler) // Use errorHandler middleware to handle errors

module.exports = app
