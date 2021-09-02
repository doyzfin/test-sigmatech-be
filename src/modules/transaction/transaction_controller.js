require('dotenv').config()
const helper = require('../../helpers/wrapper')
const transactionModel = require('./transaction_model')

module.exports = {
  getAllTransaction: async (req, res) => {
    try {
      const result = await transactionModel.getDataAll()
      if (result.length > 0) {
        return helper.response(res, 200, 'Succes Get Data transaction', result)
      } else {
        return helper.response(res, 404, 'Data transaction Not Found ', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getTransactionById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await transactionModel.getDataById(id)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `Succes Get transaction Data By Id = ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `Data transaction Not Found By Id = ${id}`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
