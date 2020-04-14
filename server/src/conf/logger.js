'use strict'
const winston = require('winston')
const myFormat = winston.format.printf(
  ({ level, message, label, timestamp }) => {
    return `${timestamp} ${level}: ${message}`
  },
)

const console_transport = {
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    // winston.format.splat(),
    winston.format.simple(),
    myFormat,
  ),
  transports: [new winston.transports.Console({})],
}

winston.loggers.add('main', console_transport)
winston.loggers.add('dev', console_transport)

module.exports = winston.loggers
