const mongojs = require('mongojs')

const mock = require('./__mocks__')
const mainConf = require('../conf/config')
const Promise = require('bluebird')

Promise.promisifyAll([
  require('mongojs/lib/collection'),
  require('mongojs/lib/database'),
  require('mongojs/lib/cursor'),
])

var database = mongojs(mainConf.dbUrl, [
  'user',
  'staff',
  'roundProduct',
  'receiveTxn',
  'nationalIdInfo'
])

exports.initializeDatabase = () => {
  console.info('initialize database...')

  if (mainConf.isLoadMockData) {
    mock.loadMockData(database)
  }

  database.on('error', (error) => {
    console.error(error)
  })

  database.on('connect', function () {
    console.log('database connected!')
  })
}

exports.db = database
