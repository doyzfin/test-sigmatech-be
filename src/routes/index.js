const express = require('express')
const Route = express.Router()

const movieRouter = require('../modules/movie/movie_routes')
const membershipRouter = require('../modules/membership/membership_routes')
const transactionRouter = require('../modules/transaction/transaction_routes')
const usersRouter = require('../modules/users/users_routes')
const authRouter = require('../modules/auth/auth_routes')

Route.use('/movie', movieRouter)
Route.use('/membership', membershipRouter)
Route.use('/transaction', transactionRouter)
Route.use('/users', usersRouter)
Route.use('/auth', authRouter)

module.exports = Route
