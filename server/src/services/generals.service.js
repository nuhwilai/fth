const _ = require('lodash')
const { createToken } = require('./tokenManager.service')
const config = require('../conf/config')
const moment = require('moment')
const mongojs = require('mongojs')
const traverse = require('traverse')

exports.parseDateStrToDate = (source, excludes = []) => {
  return traverse(source).map(function (item) {
    if (item && this.key && !excludes.includes(this.key)) {
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

exports.transformReceiveTxns = (receiveTxns, user) => {
  return _.map(receiveTxns, (receiveTxn) =>
    this.transformReceiveTxn(receiveTxn, user),
  )
}

exports.transformReceiveTxn = (receiveTxn, user) => {
  receiveTxn = this.parseDateStrToDate(receiveTxn, ['receivedDate'])

  if (user && user._id) {
    receiveTxn.staffId = mongojs.ObjectId(user._id)
  }

  if (receiveTxn.productId) {
    receiveTxn.productId = mongojs.ObjectId(receiveTxn.productId)
  }

  if (_.isNumber(receiveTxn.amount)) {
    receiveTxn.amount = Number(receiveTxn.amount)
  }

  return receiveTxn
}
