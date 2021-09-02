const express = require('express')
const Route = express.Router()
// 1
// const { sayHello } = require('./movie_controller')
// 2
const movieController = require('./movie_controller')
const authMiddleware = require('../../middleware/auth')

Route.get('/', authMiddleware.authentication, movieController.getAllMovie)
Route.get('/:id', authMiddleware.authentication, movieController.getMovieById)

module.exports = Route
