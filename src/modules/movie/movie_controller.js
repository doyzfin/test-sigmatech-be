require('dotenv').config()
const helper = require('../../helpers/wrapper')
const movieModel = require('./movie_model')

module.exports = {
  getAllMovie: async (req, res) => {
    try {
      let { search, page, limit, sort } = req.query
      if (page === undefined) {
        page = '1'
      } else if (page === '') {
        page = '1'
      }
      if (limit === undefined) {
        limit = '18'
      } else if (limit === '') {
        limit = '18'
      }
      if (sort === undefined) {
        sort = 'movies_id ASC'
      } else if (sort === '') {
        sort = 'movies_id ASC'
      }
      if (search === undefined) {
        search = ''
      } else if (search === '') {
        search = ''
      }
      page = parseInt(page)
      limit = parseInt(limit)

      const totalData = await movieModel.getDataCount()
      const totalPage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData
      }
      const result = await movieModel.getDataAll(search, sort, limit, offset)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `Succes Get Data, Search Data, and Sort by ${sort}`,
          result,
          pageInfo
        )
      } else {
        return helper.response(res, 404, 'Data Not Found ', null, pageInfo)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getMovieById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await movieModel.getDataById(id)
      if (result.length > 0) {
        return helper.response(
          res,
          200,
          `Succes Get Data By Id = ${id}`,
          result
        )
      } else {
        return helper.response(res, 404, `Data Not Found By Id = ${id}`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postMovie: async (req, res) => {
    try {
      console.log(req.body)
      const { title, detail, thumbnailPotrait, movieId } = req.body
      const setData = {
        movies_name: title,
        movies_category: detail.genre,
        movies_release: detail.release,
        movies_duration: detail.duration,
        movie_image: thumbnailPotrait,
        movies_description: detail.description,
        movies_price: movieId,
        movies_created_at: new Date(Date.now()),
        movies_updated_at: new Date(Date.now())
      }
      console.log(setData)
      const result = await movieModel.createData(setData)

      return helper.response(res, 200, 'Succes Post Movie', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
