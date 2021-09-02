const express = require('express')
const Route = express.Router()

const UsersController = require('./users_controller')
const authMiddleware = require('../../middleware/auth')

Route.get('/', authMiddleware.authentication, UsersController.getAllUsers)
Route.get('/:id', authMiddleware.authentication, UsersController.getUsersById)

module.exports = Route
