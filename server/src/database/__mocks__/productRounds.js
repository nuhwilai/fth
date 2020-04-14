const mongojs = require('mongojs')

module.exports = [
  {
    _id: mongojs.ObjectId('000000000000000000000001'),
    roundDateTime: new Date('2020-04-11'),
    roundDate: '2020-04-11',
    productName: 'แจกอาหารตามสั่ง',
  },
  {
    _id: mongojs.ObjectId('000000000000000000000002'),
    roundDateTime: new Date('2020-04-10'),
    roundDate: '2020-04-10',
    productName: 'Pizza',
  },
]
