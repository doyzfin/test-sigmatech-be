const connection = require('../../config/mysql')

module.exports = {
  getDataAll: () => {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM users', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM users WHERE user_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataFilm: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM user_movies JOIN movies ON user_movies.movies_id = movies.movies_id WHERE user_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
