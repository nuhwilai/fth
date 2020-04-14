const mongojs = require('mongojs')

module.exports = [
  {
    _id: mongojs.ObjectId('000000000000000000000002'),
    nationalId: '7021541772072',
    phoneNumber: '081111111',
    firstname: 'John',
    lastname: 'Doe',
    homeNumber: '32',
    homeMoo: '5',
    homeMooban: '-',
    homePostalCode: '80130',
    homeSubDistrict: 'สามตำบล',
    homeDistrict: 'จุฬาภรณ์',
    homeProvince: 'นครศรีธรรมราช',
  },
  {
    _id: mongojs.ObjectId('000000000000000000000003'),
    nationalId: '1281036360039',
    phoneNumber: '081111112',
    firstname: 'JJ',
    lastname: 'Doe',
    homeNumber: '11',
    homeMoo: '4',
    homeMooban: 'ทานตะวัน',
    homePostalCode: '90110',
    homeSubDistrict: 'คอหงส์',
    homeDistrict: 'หาดใหญ่',
    homeProvince: 'สงขลา',
  },
]
