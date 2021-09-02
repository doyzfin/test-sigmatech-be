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
  },
  buyMovies: async (req, res) => {
    try {
      const { userId, moviesId, price, isMembership } = req.body
      const setData = {
        user_id: userId,
        movies_id: moviesId,
        transaction_amount: price,
        is_membership: isMembership
      }

      const setData2 = {
        user_id: userId,
        movies_id: moviesId
      }
      const result = await transactionModel.createBuy(setData)
      const result2 = await transactionModel.saveFilm(setData2)
      return helper.response(res, 200, 'Success Buy Movies', {
        buy: result,
        save: result2
      })
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
