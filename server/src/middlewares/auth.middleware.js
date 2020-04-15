const config = require('../conf/config')
const rootLogger = require('../conf/logger')
const { jwtMiddleware } = require('../services/tokenManager.service')

const logger = rootLogger.get('main')

const whiteList = [
  { path: '/ping' },
  { path: '/login', method: 'POST' },
  { path: '/users/', method: 'GET' },
  { path: '/users', method: 'POST' },
  { path: '/requestQrToken' },
  { path: '/qrcode' },
]

const authMiddleware = (req, res, next) => {
  if (config.disableAuth || checkWhiteList(req, whiteList)) {
    next()
    return
  }
  return jwtMiddleware(req, res, next)
}

const allowPermissions = [
  { path: '/staffs', roles: ['ADMIN'] },
  { path: '/productRounds', roles: ['STAFF'] },
  { path: '/receiveTxnSyncUp', roles: ['STAFF'] },
  { path: '/receiveTxns', roles: ['STAFF'] },
]

const userPermission = async (req, res, next) => {
  try {
    req.user = {
      role: 'STAFF',
    }
    if (
      (req.user && req.user.role === 'ADMIN') ||
      checkWhiteList(req, whiteList) ||
      config.disableAuth
    ) {
      next()
      return
    }
    if (checkPermission(req, allowPermissions)) {
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

const checkWhiteList = (req, whiteList) => {
  const whiteItem = whiteList.find((w) => req.path.startsWith(w.path))
  if (whiteItem && typeof whiteItem.method === 'string') {
    return whiteItem.method === req.method
  } else {
    return typeof whiteItem !== 'undefined'
  }
}

const checkPermission = (req, allowPermissions) => {
  const allowPermission = allowPermissions.find(
    (p) =>
      req.path.startsWith(p.path) &&
      p.roles.includes(req.user ? req.user.role : null),
  )

  if (allowPermission.methods && allowPermission.methods.length > 0) {
    return allowPermission.methods.includes(req.method)
  } else {
    return typeof allowPermission !== 'undefined'
  }
}

module.exports = [authMiddleware, userPermission]
