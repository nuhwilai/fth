export default {
  store: 'recieveTxn',
  storeConfig: { keyPath: 'id', autoIncrement: true },
  storeSchema: [
    { name: 'nationalId', keypath: 'nationalId', options: { unique: false } },
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
