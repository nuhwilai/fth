const config = require('../conf/config')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

const keyFile = config.runProd
  ? path.join(path.resolve(__dirname), '..', '..', 'keys', 'prod', 'app.key')
  : path.join(path.resolve(__dirname), '..', '..', 'keys', 'dev', 'app.key')

const cert = fs.readFileSync(keyFile)

exports.createToken = (data, customSecretKey) => {
  return jwt.sign(data, customSecretKey || keyFile, {
    algorithm: 'HS256'
  })
}

exports.validateToken = (token) => {
  return jwt.verify(token, publicKeyFile)
}
