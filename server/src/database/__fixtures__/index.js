const config = require('../../conf/config')
const rootLogger = require('../../conf/logger')
const logger = rootLogger.get('main')

exports.loadFixtureData = async (db) => {
  logger.info('loading fixtures...')
  upsertCollection(db, 'staff', require('./staffs'))
}

function upsertCollection(db, store, items) {
  items.forEach((item) => {
    const _id = item._id
    delete item._id
    db.collection(store)
      .updateAsync({ _id }, { $set: item }, { upsert: true })
      .then((res) => {
        logger.debug(`loading fixture:${store}, ${_id}`)
      })
  })
}
