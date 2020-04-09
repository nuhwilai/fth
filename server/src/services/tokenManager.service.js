const config = require('../conf/config')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

const privateKeyFile = config.runProd
  ? path.join(path.resolve(__dirname), '..', '..', 'keys', 'prod', 'app.key')
  : path.join(path.resolve(__dirname), '..', '..', 'keys', 'dev', 'app.key')

const publicKeyFile = config.runProd
  ? path.join(path.resolve(__dirname), '..', '..', 'keys', 'prod', 'app.key')
  : path.join(path.resolve(__dirname), '..', '..', 'keys', 'dev', 'app.key')

const cert = fs.readFileSync(privateKeyFile)

exports.creatToken = (data) => {
  return jwt.sign(data, cert, {
    algorithm: 'RS256',
    expiresIn: '15d'
  })
}

exports.validateToken = (token) => {
  return jwt.verify(token, publicKeyFile)
}
