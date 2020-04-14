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

const userPermission = async (req, res, next) => {
  try {
    // performance but risk
    if ((req.user && req.user.role === 'ADMIN') || config.disableAuth) {
      next()
      return
    }

    // protected route
    if (
      !(
        req.path.startsWith('/receiveTxns') || 
        req.path.startsWith('/staffs') ||
        req.path.startsWith('/receiveTxnSyncUp') ||
        req.path.startsWith('/receiveTxns')
      )
    ) {
      next()
      return
    }
    res.send({ valid: false, reason: 'permission_denied' })
    return

    // secure but low performance
    // if (req.user) {
    //   const user = await db.user.findOneAsync({
    //     _id: mongojs.ObjectId(req.user._id),
    //   })
    //   if ((user && user.role === 'ADMIN') || config.disableAuth) {
    //     next()
    //     return
    //   }

    //   if (
    //     !(
    //       req.path.startsWith('/surveyEntries') || req.path.startsWith('/users')
    //     )
    //   ) {
    //     next()
    //     return
    //   }
    //   res.send({ valid: false, reason: 'permission_denied' })
    //   return
    // }
    // next()
  } catch (error) {
    logger.error(error)
    res.send({ valid: false, reason: error.messenger })
  }
}

module.exports = [authMiddleware, userPermission]
