const connection = require('../../config/mysql')

module.exports = {
  register: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO users SET ? ', setData, (error, result) => {
        !error
          ? resolve({ id: result.insertId, ...setData })
          : reject(new Error(error))
      })
    })
  },
  getDataCondition: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM users WHERE ?',
        setData,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
