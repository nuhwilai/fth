export default {
  store: 'recieveTxn',
  storeConfig: { keyPath: 'id', autoIncrement: true },
  storeSchema: [
    // { name: '_id', keypath: '_id', options: { unique: true } },
    { name: 'nationalId', keypath: 'nationalId', options: { unique: true } },
    {
      name: 'receivedDateTime',
      keypath: 'receivedDateTime',
      options: { unique: false },
    },
    {
      name: 'amount',
      keypath: 'amount',
      options: { unique: false },
    },
    {
      name: 'staffId',
      keypath: 'staffId',
      options: { unique: false },
    },
    {
      name: 'productId',
      keypath: 'productId',
      options: { unique: false },
    },
  ],
}
