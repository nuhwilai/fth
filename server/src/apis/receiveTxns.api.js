const router = require('express').Router()
const mongojs = require('mongojs')
const { db } = require('../database')
const _ = require('lodash')
const config = require('../conf/config')
const { userShortSchema } = require('../conf/schema')
const { createFilterConditions } = require('../services/apiHandler.service')
const rootLogger = require('../conf/logger')

const logger = rootLogger.get('main')

router.get('/', async (req, res) => {
  try {
    let query = _.pick(req.query, [
      'nationalId_like',
      'productId',
      'receivedDate',
      '__withUserSchema',
      '__withProductRoundSchema',
    ])

    const __withUserSchemaShort = query.__withUserSchema === 'short'
    delete query.__withUserSchema

    const __witthProductRoundSchemaFull =
      query.__withProductRoundSchema === 'full'
    delete query.__withProductRoundSchema

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

    const receiveTxnResults = await new Promise((resolve, reject) => {
      receiveTxnQuery
        .sort({ [sort]: order })
        .skip(skip)
        .toArray((err, result) => {
          if (err) {
            reject(err)
          }
          resolve(result)
        })
    })

    let users = []
    if (__withUserSchemaShort) {
      const nationalIds = _.map(receiveTxnResults, 'nationalId')
      users = await db.user.findAsync(
        {
          nationalId: { $in: nationalIds },
        },
        userShortSchema,
      )
    }

    let productRounds = []
    if (__witthProductRoundSchemaFull) {
      const productRoundIds = _.map(receiveTxnResults, 'productId')
      productRounds = await db.productRound.findAsync({
        _id: { $in: productRoundIds },
      })
    }

    const receiveTxns = []
    for (const receiveTxn of receiveTxnResults) {
      const user = _.find(users, { nationalId: receiveTxn.nationalId })
      const productRound = _.find(productRounds, { _id: receiveTxn.productId })
      receiveTxn.user = user
      receiveTxn.productRound = productRound
      receiveTxns.push(receiveTxn)
    }

    res.send({
      valid: true,
      data: {
        receiveTxns,
      },
    })
  } catch (error) {
    logger.error(error)
    res.send({ valid: false, reason: error.message })
  }
})

module.exports = router
