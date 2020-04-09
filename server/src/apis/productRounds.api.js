const router = require('express').Router()
const mongojs = require('mongojs')
const { db } = require('../database')
const _ = require('lodash')

router.post('/', async (req, res) => {
  try {
    if (!req.body.roundDateTime || !req.body.productName) {
      throw new Error('invalid product round.')
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
      { $set: req.body },
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

    if (query.roundDateTime_gt) {
      query.roundDateTime = { $gt: new Date(query.roundDateTime_gt) }
      delete query.roundDateTime_gt
    }

    const productRoundResults = await db.productRound.findAsync(query)
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
