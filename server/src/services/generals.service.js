const _ = require('lodash')
const config = require('../conf/config')
const { createToken } = require('./tokenManager.service')

exports.generateQrToken = async (user) => {
  return createToken(_.pick(user, ['nationalId']), config.secretKey)
}
