const config = require('../conf/config')
const jwt = require('jsonwebtoken')
const jwtExpress = require('express-jwt')
const fs = require('fs')
const path = require('path')

const keyFile = config.isProd
  ? path.join(path.resolve(__dirname), '..', '..', 'keys', 'prod', 'app.key')
  : path.join(path.resolve(__dirname), '..', '..', 'keys', 'dev', 'app.key')

const publicKeyFile = config.isProd
  ? path.join(path.resolve(__dirname), '..', '..', 'keys', 'prod', 'app.key.pub')
  : path.join(path.resolve(__dirname), '..', '..', 'keys', 'dev', 'app.key.pub')

const cert = fs.readFileSync(keyFile)
const publicKey = fs.readFileSync(publicKeyFile)

exports.jwtMiddleware = jwtExpress({ secret: publicKey })

exports.createToken = (data, option = {}) => {
  return jwt.sign(data, option.secretKey || cert, {
    algorithm: option.algorithm || 'RS256',
  })
}

exports.validateToken = (token) => {
  return jwt.verify(token, publicKeyFile)
}
