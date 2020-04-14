const router = require('express').Router()
const mongojs = require('mongojs')
const { db } = require('../database')
const _ = require('lodash')
const config = require('../conf/config')
const rootLogger = require('../conf/logger')

const logger = rootLogger.get('main')

router.post('/', async (req, res) => {
  try {
    if (!req.body.email || !['STAFF', 'ADMIN'].includes(req.body.role)) {
      throw new Error('invalid_staff')
    }

    const countStaff = await db.staff.countAsync({ email: req.body.email })

    if (countStaff > 0) {
      throw new Error('duplicate_staff_email')
    }

    const staffCreateResult = await db.staff.insertAsync({
      email: req.body.email,
      role: req.body.role,
    })
    res.send({ valid: true, data: { _id: staffCreateResult._id } })
  } catch (error) {
    logger.error(error)
    res.send({ valid: false, reason: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    await db.staff.updateAsync(
      { _id: mongojs.ObjectId(req.params.id) },
      { $set: req.body },
    )
    res.send({ valid: true, data: { _id: req.params.id } })
  } catch (error) {
    logger.error(error)
    res.send({ valid: false, reason: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await db.staff.removeAsync({
      _id: mongojs.ObjectId(req.params.id),
    })
    res.send({ valid: true, data: { _id: req.params.id } })
  } catch (error) {
    logger.error(error)
    res.send({ valid: false, reason: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const query = _.pick(req.query, ['email', 'role'])

    const limit = req.query.max
      ? Number(req.query.max)
      : config.maxRecordsPerQuery
    const skip = req.query.offset ? Number(req.query.offset) : 0
    const sort = req.query.sort ? req.query.sort : '_id'
    const order = req.query.order == 'asc' ? 1 : -1

    await db.staff
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
            staffs: result,
          },
        })
      })
  } catch (error) {
    logger.error(error)
    res.send({ valid: false, reason: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const staffResults = await db.staff.findOneAsync({
      _id: mongojs.ObjectId(req.params.id),
    })
    res.send({
      valid: true,
      data: {
        staff: staffResults,
      },
    })
  } catch (error) {
    logger.error(error)
    res.send({ valid: false, reason: error.message })
  }
})

module.exports = router
