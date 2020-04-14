const _ = require('lodash')
const { db } = require('../database')
const { parseDateStrToDate } = require('../services/generals.service')
const { createFilterConditions } = require('../services/apiHandler.service')
const config = require('../conf/config')
const moment = require('moment')
const mongojs = require('mongojs')
const router = require('express').Router()

router.post('/', async (req, res) => {
  try {
    if (!req.body.roundDateTime || !req.body.productName) {
      throw new Error('invalid_product_round')
    }

    const productRoundCreateResult = await db.productRound.insertAsync({
      productName: req.body.productName,
      roundDateTime: moment(req.body.roundDateTime).toDate(),
      roundDate: moment(req.body.roundDateTime).format('YYYY-MM-DD'),
    })
    res.send({ valid: true, data: { _id: productRoundCreateResult._id } })
  } catch (error) {
    res.send({ valid: false, reason: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    await db.productRound.updateAsync(
      { _id: mongojs.ObjectId(req.params.id) },
      { $set: parseDateStrToDate(req.body, ['roundDate']) },
    )
    res.send({ valid: true, data: { _id: req.params.id } })
  } catch (error) {
    res.send({ valid: false, reason: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await db.productRound.removeAsync({
      _id: mongojs.ObjectId(req.params.id),
    })
    res.send({ valid: true, data: { _id: req.params.id } })
  } catch (error) {
    res.send({ valid: false, reason: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    let query = _.pick(req.query, [
      'roundDateTime',
      'roundDateTime_gt',
      'productName',
      'roundDate',
      'productName_like',
    ])

    if (query.roundDateTime_gt) {
      query.roundDateTime = { $gt: new Date(query.roundDateTime_gt) }
      delete query.roundDateTime_gt
    }

    query = createFilterConditions(query)

    const limit = req.query.max
      ? Number(req.query.max)
      : config.maxRecordsPerQuery
    const skip = req.query.offset ? Number(req.query.offset) : 0
    const sort = req.query.sort ? req.query.sort : 'roundDateTime'
    const order = req.query.order == 'asc' ? 1 : -1
    const totalCount = await db.productRound.countAsync(query)

    await db.productRound
      .find(query)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(skip)
      .toArray((err, result) => {
        if (err) {
          throw err
        }
        res.send({
          valid: true,
          data: {
            totalCount,
            productRounds: result,
          },
        })
      })
  } catch (error) {
    res.send({ valid: false, reason: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const productRoundResults = await db.productRound.findOneAsync({
      _id: mongojs.ObjectId(req.params.id),
    })
    res.send({
      valid: true,
      data: {
        productRounds: productRoundResults,
      },
    })
  } catch (error) {
    res.send({ valid: false, reason: error.message })
  }
})

module.exports = router
