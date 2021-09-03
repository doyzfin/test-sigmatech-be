const connection = require('../../config/mysql')

module.exports = {
  getDataAll: () => {
    return new Promise((resolve, reject) => {
      connection.query('CALL show_transaction()', (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM transaction WHERE user_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  createBuy: (setData) => {
    return new Promise((resolve, reject) => {
      const query = connection.query(
        `
        CALL buy_movies2(${setData.is_membership}, ${setData.movies_id}, ${setData.transaction_amount}, ${setData.user_id});
        
       `,

        (error, result) => {
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
        }
      )
      console.log(query.sql)
    })
  },
  saveFilm: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO user_movies SET ?',
        setData,
        (error, result) => {
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
        }
      )
    })
  }
}
