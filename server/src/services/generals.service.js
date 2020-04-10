const _ = require('lodash')
const { createToken: creatToken } = require('./tokenManager.service')

exports.generateQrToken = async (user) => {
  return creatToken(
    _.pick(user, [
      'nationalId',
    ]),
  )
}
