const express = require('express')
const Route = express.Router()
// 1
// const { sayHello } = require('./movie_controller')
// 2
const movieController = require('./movie_controller')
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')

Route.get('/', authMiddleware.authentication, movieController.getAllMovie)
Route.get('/:id', authMiddleware.authentication, movieController.getMovieById)
Route.post(
  '/',
  authMiddleware.authentication,
  uploadFile,
  movieController.postMovie
)

module.exports = Route
