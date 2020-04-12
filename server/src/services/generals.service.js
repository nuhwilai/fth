const _ = require('lodash')
const traverse = require('traverse')
const moment = require('moment')
const config = require('../conf/config')
const { createToken } = require('./tokenManager.service')

exports.parseDateStrToDate = (source) => {
  return traverse(source).map(function (item) {
    if (item && this.key) {
      if (this.key.endsWith('Date')) {
        this.update(moment(item).toDate(), true)
      } else if (this.key.endsWith('DateTime')) {
        this.update(moment(item).toDate(), true)
      }
    }
  })
}

exports.generateQrToken = async (user) => {
  return createToken(_.pick(user, ['nationalId']), config.secretKey)
}
