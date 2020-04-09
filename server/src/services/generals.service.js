const _ = require('lodash')
const { creatToken } = require('./tokenManager.service')

exports.generateQrToken = async (user) => {
  return creatToken(
    _.pick(user, [
      'firstname',
      'lastname',
      'nationalId',
      'amount',
      'phoneNumber',
    ]),
  )
}
