const _ = require('lodash')
const traverse = require('traverse')

exports.createFilterConditions = (query) => {
  _.each(query, (value, key) => {
    if (_.startsWith(key, '__')) {
      return
    } else {
      const keys = _.split(key, '_')
      if (keys.length > 1) {
        const [field, filter] = keys
        if (filter === 'in') {
          query[field] = { $in: _.split(value, ',') }
        } else if (filter === 'like') {
          query[field] = { $regex: new RegExp(`.*${value}.*`, 'i') }
        }
        delete query[key]
      }
    }
  })
  return query
}
