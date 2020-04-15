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
const rootLogger = require('../conf/logger')

const logger = rootLogger.get('main')

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

//#region auth section
router.post('/login', async (req, res) => {
  try {
    const googleVerify = await verifyGoogleAccessToken(req.body.oauthToken)
    if (!googleVerify.valid) {
      throw new Error(googleVerify.reason)
    }

    const staff = await db.staff.findOneAsync({
      email: googleVerify.data.email,
    })
    if (!staff) {
      throw new Error('not_found_user_email')
    }

    res.send({
      valid: true,
      data: { token: createToken(_.pick(staff, ['_id', 'email', 'role'])) },
    })
  } catch (error) {
    logger.error(error)
    res.send({ valid: false, reason: error.message })
  }
})
//#endregion auth section
//#region staff section

router.post('/receiveTxnSyncUp', async (req, res) => {
  try {
    if (!req.body.receiveTxns || req.body.receiveTxns.length <= 0) {
      throw new Error(
        'size receiveTxns=' + req.body.receiveTxns
          ? req.body.receiveTxns.length
          : req.body.receiveTxns,
      )
    }

    const localIds = _.map(req.body.receiveTxns, 'localId')

    const receiveTxnResults = await db.receiveTxn.insertManyAsync(
      transformReceiveTxns(req.body.receiveTxns),
    )
    res.send({
      valid: true,
      data: {
        _ids: _.map(receiveTxnResults, '_id'),
        localIds,
      },
    })
  } catch (error) {
    res.send({ valid: false, reason: error.message })
  }
})
//#endregion staff section

module.exports = router
