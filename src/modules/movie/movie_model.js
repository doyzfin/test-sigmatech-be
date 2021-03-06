const connection = require('../../config/mysql')

module.exports = {
  getDataAll: (search, sort, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM movies WHERE movies_name LIKE '%${search}%' ORDER BY ${sort}  LIMIT ${limit} OFFSET ${offset} `,
        [search, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataCount: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT COUNT(*) AS total  FROM movies',
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM movies WHERE movies_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  createData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO movies SET ?', setData, (error, result) => {
        // !error ? resolve({id:result.insertId,...setData}) : reject(new Error(error))
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  }
}
