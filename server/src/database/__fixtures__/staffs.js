const mongojs = require('mongojs')

module.exports = [
  {
    _id: mongojs.ObjectId('000000000000000000000001'),
    email: 'manager@pupasoft.com',
    role: 'ADMIN',
  },
  {
    _id: mongojs.ObjectId('000000000000000000000002'),
    email: 'new@pupasoft.com',
    role: 'ADMIN',
  },
  {
    _id: mongojs.ObjectId('000000000000000000000003'),
    email: 'pawaret@pupasoft.com',
    role: 'ADMIN',
  },
]
