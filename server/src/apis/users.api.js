const { db } = require('../database')
const { generateQrToken } = require('../services/generals.service')
const {
  validateUser,
  getNationalIdInfoes,
} = require('../services/validateUser.service')
const mongojs = require('mongojs')
const router = require('express').Router()
const _ = require('lodash')
const { parseDateStrToDate } = require('../services/generals.service')

router.post('/', async (req, res) => {
  try {
    const userCreateInput = req.body
    const validate = await validateUser(userCreateInput)
    if (!validate.valid) {
      throw new Error(validate.reason)
    }
    const userCreateResult = await db.user.insertAsync(
      parseDateStrToDate(req.body),
    )
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
    const userUpdateInput = parseDateStrToDate(_.omit(req.body, ['_id']))
    const validate = await validateUserPatternNationalId(userUpdateInput)
    if (!validate.valid) {
      throw new Error(validate.reason)
    }
    await db.user.updateAsync(
      { nationalId: req.params.nationalId },
      { $set: userUpdateInput },
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

    let projection = {}

    if (req.query._schema === 'short') {
      projection = {
        _id: 0,
        nationalId: 1,
        firstname: 1,
        lastname: 1,
        phoneNumber: 1,
        homeNumber: 1,
        homeMoo: 1,
        homeMooban: 1,
        homePostalCode: 1,
        homeSubDistrict: 1,
        homeDistrict: 1,
        homeProvince: 1,
      }
    }

    const userResult = await db.user.findOneAsync(
      {
        nationalId: req.params.nationalId,
      },
      projection,
    )
    res.send({ valid: true, data: { user: userResult } })
  } catch (error) {
    res.send({ valid: false, reason: error.message })
  }
})

module.exports = router
