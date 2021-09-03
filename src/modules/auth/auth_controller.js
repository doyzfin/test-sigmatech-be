const helper = require('../../helpers/wrapper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authModel = require('./auth_model')

require('dotenv').config()

module.exports = {
  register: async (req, res) => {
    try {
      const { userEmail, userPassword, userName, userPhone } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)
      const checkEmailUser = await authModel.getDataCondition({
        user_email: userEmail
      })
      if (checkEmailUser.length > 0) {
        return helper.response(
          res,
          401,
          'Email is ON',
          checkEmailUser[0].user_email
        )
      } else {
        const setData = {
          user_name: userName,
          user_email: userEmail,
          user_password: encryptPassword,
          user_phone: userPhone,
          user_image: '../../uploads/default.png'
        }
        const result = await authModel.register(setData)
        delete result.user_password
        return helper.response(res, 200, 'Success Register', result)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  login: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body
      const checkEmailUser = await authModel.getDataCondition({
        user_email: userEmail
      })
      if (checkEmailUser.length > 0) {
        const checkPassword = bcrypt.compareSync(
          userPassword,
          checkEmailUser[0].user_password
        )
        if (checkPassword) {
          const payload = checkEmailUser[0]
          delete payload.user_password
          const token = jwt.sign({ ...payload }, 'RAHASIA', {
            expiresIn: '3600s'
          })
          const result = { ...payload, token }
          return helper.response(res, 200, 'Success Login', result)
        } else {
          return helper.response(res, 400, 'Wrong Password')
        }
      } else {
        return helper.response(res, 404, 'Email Not Registered')
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
