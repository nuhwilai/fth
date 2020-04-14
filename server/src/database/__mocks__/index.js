const rootLogger = require('../../conf/logger')
const logger = rootLogger.get('main')

exports.loadMockData = (db) => {
  upsertCollection(db, 'user', require('./users'))
  upsertCollection(db, 'receiveTxn', require('./receiveTxns'))
  upsertCollection(db, 'productRound', require('./productRounds'))
}

function upsertCollection(db, store, items) {
  items.forEach((item) => {
    const _id = item._id
    delete item._id
    db.collection(store)
      .updateAsync({ _id }, { $set: item }, { upsert: true })
      .then((res) => {
        logger.debug(`loading mockup:${store}, ${_id}`)
      })
  })
}
