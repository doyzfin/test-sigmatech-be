require('dotenv').config()
const helper = require('../../helpers/wrapper')
const usersModel = require('./users_model')

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const result = await usersModel.getDataAll()
      if (result.length > 0) {
        return helper.response(res, 200, 'Succes Get Data Users', result)
      } else {
        return helper.response(res, 404, 'Data Users Not Found ', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getUsersById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await usersModel.getDataById(id)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `Succes Get Users Data By Id = ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `Data Users Not Found By Id = ${id}`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getUsersFilm: async (req, res) => {
    try {
      const { id } = req.params
      const result = await usersModel.getDataFilm(id)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `Succes Get Users Data By Id = ${id}`,
          result
        )
      } else {
        return helper.response(
          res,
          404,
          `Data Users Not Found By Id = ${id}`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
