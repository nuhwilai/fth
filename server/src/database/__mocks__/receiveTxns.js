const mongojs = require('mongojs')

module.exports = [
  {
    _id: mongojs.ObjectId('000000000000000000000002'),
    nationalId: '7021541772072',
    receivedDateTime: new Date('2020-04-11T12:15:52.254Z'),
    receivedDate: '2020-04-11',
    productId: mongojs.ObjectId('000000000000000000000001'),
    amount: 2,
  },
  {
    _id: mongojs.ObjectId('000000000000000000000003'),
    nationalId: '4201306818592',
    receivedDateTime: new Date('2020-04-11T12:15:52.254Z'),
    receivedDate: '2020-04-11',
    productId: mongojs.ObjectId('000000000000000000000002'),
    amount: 3,
  },
  {
    _id: mongojs.ObjectId('000000000000000000000004'),
    nationalId: '1281036360039',
    receivedDateTime: new Date('2020-04-11T12:15:52.254Z'),
    receivedDate: '2020-04-11',
    productId: mongojs.ObjectId('000000000000000000000001'),
    amount: 3,
  },
]
