const express = require('express')
const Route = express.Router()

const transactionController = require('./transaction_controller')
const authMiddleware = require('../../middleware/auth')

Route.get(
  '/',
  authMiddleware.authentication,
  transactionController.getAllTransaction
)
Route.get(
  '/:id',
  authMiddleware.authentication,
  transactionController.getTransactionById
)
Route.post('/', authMiddleware.authentication, transactionController.buyMovies)

module.exports = Route
