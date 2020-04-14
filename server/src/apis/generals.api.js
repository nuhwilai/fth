const router = require('express').Router()
const mongojs = require('mongojs')
const { db } = require('../database')
const {
  generateQrToken,
  transformReceiveTxns,
} = require('../services/generals.service')
const { createToken } = require('../services/tokenManager.service')
const {
  validateUserPatternNationalId,
} = require('../services/validateUser.service')
const { verifyGoogleAccessToken } = require('../services/auth.service')
const _ = require('lodash')

//#region user section
router.post('/requestQrToken', async (req, res) => {
  try {
    const userInput = _.pick(req.body, [
      'isUsePassport',
      'nationalId',
      'phoneNumber',
    ])
    const validate = await validateUserPatternNationalId(userInput)
    if (!validate.valid) {
      throw new Error(validate.reason)
    }
    const userResult = await db.user.findOneAsync(userInput)

    if (!userResult) {
      throw new Error('not_match')
    }

    const qrcodeToken = await generateQrToken(userResult)
    res.send({
      valid: true,
      data: { _id: userResult._id, qrcodeToken },
    })
  } catch (error) {
    res.send({ valid: false, reason: error.message })
  }
})
//#endregion user section

//#region staff section
router.post('/login', async (req, res) => {
  try {
    const googleVerify = await verifyGoogleAccessToken(req.body.oauthToken)
    if (!googleVerify.valid) {
      throw new Error(googleVerify.reason)
    }

    console.log(googleVerify.data)

    const staffCount = await db.staff.countAsync({
      email: googleVerify.data.email,
    })
    if (!staffCount <= 0) {
      throw new Error('not_found_staff_email')
    }

    res.send({
      valid: true,
      data: { token: createToken({ email: googleVerify.data.email }) },
    })
  } catch (error) {
    res.send({ valid: false, reason: error.message })
  }
})

router.post('/receiveTxnSyncUp', async (req, res) => {
  try {
    if (!req.body.receiveTxns || req.body.receiveTxns.length <= 0) {
      throw new Error(
        'size receiveTxns=' + req.body.receiveTxns
          ? req.body.receiveTxns.length
          : req.body.receiveTxns,
      )
    }
    const receiveTxnResults = await db.receiveTxn.insertManyAsync(
      transformReceiveTxns(req.body.receiveTxns),
    )
    res.send({ valid: true, data: { _ids: _.map(receiveTxnResults, '_id') } })
  } catch (error) {
    res.send({ valid: false, reason: error.message })
  }
})
//#endregion staff section

module.exports = router
