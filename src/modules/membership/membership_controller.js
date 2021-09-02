require('dotenv').config()
const helper = require('../../helpers/wrapper')
const membershipModel = require('./membership_model')
const userModel = require('../users/users_model')

module.exports = {
  getAllMembership: async (req, res) => {
    try {
      const result = await membershipModel.getDataAll()
      if (result.length > 0) {
        return helper.response(res, 200, 'Succes Get Data Membership', result)
      } else {
        return helper.response(res, 404, 'Data Membership Not Found ', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getMembershipById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await membershipModel.getDataById(id)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `Succes Get Membership Data By Id = ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `Data Membership Not Found By Id = ${id}`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postMembership: async (req, res) => {
    try {
      const { isMembership, membershipId, transactionAmount, userId } = req.body
      const setData = {
        is_membership: isMembership,
        membership_id: membershipId,
        transaction_amount: transactionAmount,
        user_id: userId
      }

      const getData = await userModel.getDataById(userId)

      if (getData.length > 0) {
        const result = await membershipModel.createData(setData)
        const result2 = await membershipModel.updateUser(
          {
            membership_id: membershipId
          },
          userId
        )

        return helper.response(res, 200, 'Succes Post Membership', {
          membership: result,
          User: result2
        })
      } else {
        return helper.response(
          res,
          404,
          `Data Not Found By Id = ${userId}`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
