require('dotenv').config()
const helper = require('../../helpers/wrapper')
const membershipModel = require('./membership_model')

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
  }
}
