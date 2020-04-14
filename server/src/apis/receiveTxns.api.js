const router = require('express').Router()
const mongojs = require('mongojs')
const { db } = require('../database')
const _ = require('lodash')
const config = require('../conf/config')
const { createFilterConditions } = require('../services/apiHandler.service')
const rootLogger = require('../conf/logger')

const logger = rootLogger.get('main')

router.get('/', async (req, res) => {
  try {
    let query = _.pick(req.query, ['nationalId_like', 'productId'])

    query = createFilterConditions(query)

    if (query.productId) {
      query.productId = mongojs.ObjectId(query.productId)
    }

    const limit = req.query.max ? Number(req.query.max) : null
    const skip = req.query.offset ? Number(req.query.offset) : 0
    const sort = req.query.sort ? req.query.sort : '_id'
    const order = req.query.order == 'asc' ? 1 : -1

    const receiveTxnQuery = db.receiveTxn.find(query)

    if (limit) {
      receiveTxnQuery.limit(limit)
    }

    await receiveTxnQuery
      .sort({ [sort]: order })
      .skip(skip)
      .toArray((err, result) => {
        if (err) {
          throw err
        }
        res.send({
          valid: true,
          data: {
            receiveTxns: result,
          },
        })
      })
  } catch (error) {
    logger.error(error)
    res.send({ valid: false, reason: error.message })
  }
})

module.exports = router
