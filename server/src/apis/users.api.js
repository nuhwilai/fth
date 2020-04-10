const { db } = require('../database')
const { generateQrToken } = require('../services/generals.service')
const {
  validateUser,
  getNationalIdInfoes,
} = require('../services/validateUser.service')
const mongojs = require('mongojs')
const router = require('express').Router()
const _ = require('lodash')

router.post('/', async (req, res) => {
  try {
    const userCreateInput = req.body
    const validate = await validateUser(userCreateInput)
    if (!validate.valid) {
      throw new Error(validate.reason)
    }
    const userCreateResult = await db.user.insertAsync(req.body)
    const qrcodeToken = await generateQrToken(userCreateResult)

    const nationalIdInfoes = getNationalIdInfoes(req.body)
    db.nationalIdInfo.insertAsync(nationalIdInfoes)

    res.send({
      valid: true,
      data: { _id: userCreateResult._id, qrcodeToken },
    })
  } catch (error) {
    res.send({ valid: false, reason: error.message })
  }
})

router.put('/:nationalId', async (req, res) => {
  try {
    // TODO: handle nationalId change or add
    const userUpdateInput = req.body
    const validate = await validateUserPatternNationalId(userUpdateInput)
    if (!validate.valid) {
      throw new Error(validate.reason)
    }
    await db.user.updateAsync(
      { nationalId: req.params.nationalId },
      { $set: _.omit(userUpdateInput, ['_id']) },
    )

    res.send({
      valid: true,
      data: {
        _id: userUpdateInput._id,
      },
    })
  } catch (error) {
    res.send({ valid: false, reason: error.message })
  }
})

router.get('/:nationalId', async (req, res) => {
  try {
    if (!req.params.nationalId) {
      throw new Error('not_found_national_id')
    }
    const userResult = await db.user.findOneAsync({
      nationalId: req.params.nationalId,
    })
    res.send({ valid: true, data: { user: userResult } })
  } catch (error) {
    res.send({ valid: false, reason: error.message })
  }
})

module.exports = router
