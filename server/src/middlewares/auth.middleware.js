const config = require('../conf/config')
const rootLogger = require('../conf/logger')
const { db } = require('../database')
const mongojs = require('mongojs')
const { jwtMiddleware } = require('../services/tokenManager.service')

const logger = rootLogger.get('main')

const authMiddleware = (req, res, next) => {
  if (
    config.disableAuth ||
    (req.path.startsWith('/login') && req.method == 'POST') ||
    req.path.startsWith('/app')
  ) {
    next()
    return
  }

  return jwtMiddleware(req, res, next)
}

// TODO: rewrite code.
const userPermission = async (req, res, next) => {
  try {
    // performance but risk
    if ((req.user && req.user.role === 'ADMIN') || config.disableAuth) {
      next()
      return
    }

    if (
      req.user &&
      req.user.role === 'STAFF' &&
      (req.path.startsWith('/productRounds') ||
        req.path.startsWith('/receiveTxnSyncUp') ||
        req.path.startsWith('/receiveTxns'))
    ) {
      next()
      return
    }

    // protected route
    if (
      !(
        req.path.startsWith('/productRounds') ||
        req.path.startsWith('/receiveTxnSyncUp') ||
        req.path.startsWith('/receiveTxns') ||
        req.path.startsWith('/staffs')
      )
    ) {
      next()
      return
    }
    res.send({ valid: false, reason: 'permission_denied' })
    return
  } catch (error) {
    logger.error(error)
    res.send({ valid: false, reason: error.messenger })
  }
}

module.exports = [authMiddleware, userPermission]
