const router = require('express').Router()
const mongojs = require('mongojs')
const { db } = require('../database')
const _ = require('lodash')
const config = require('../conf/config')
const { parseDateStrToDate } = require('../services/generals.service')

router.post('/', async (req, res) => {
  try {
    if (!req.body.roundDateTime || !req.body.productName) {
      throw new Error('invalid_product_round')
    }

    const productRoundCreateResult = await db.productRound.insertAsync({
      productName: req.body.productName,
      roundDateTime: new Date(req.body.roundDateTime),
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
      { $set: parseDateStrToDate(req.body) },
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
    const query = _.pick(req.query, [
      'roundDateTime',
      'roundDateTime_gt',
      'productName',
    ])

    const limit = req.query.max
      ? Number(req.query.max)
      : config.maxRecordsPerQuery
    const skip = req.query.offset ? Number(req.query.offset) : 0
    const sort = req.query.sort ? req.query.sort : 'roundDateTime'
    const order = req.query.order == 'asc' ? 1 : -1

    if (query.roundDateTime_gt) {
      query.roundDateTime = { $gt: new Date(query.roundDateTime_gt) }
      delete query.roundDateTime_gt
    }

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
