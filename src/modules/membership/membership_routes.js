const express = require('express')
const Route = express.Router()

const membershipController = require('./membership_controller')
const authMiddleware = require('../../middleware/auth')

Route.get(
  '/',
  authMiddleware.authentication,
  membershipController.getAllMembership
)
Route.get(
  '/:id',
  authMiddleware.authentication,
  membershipController.getMembershipById
)

module.exports = Route
