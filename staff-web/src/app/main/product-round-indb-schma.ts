export default {
  store: 'productRound',
  storeConfig: { keyPath: 'id', autoIncrement: true },
  storeSchema: [
    { name: '_id', keypath: '_id', options: { unique: true } },
    { name: 'productName', keypath: 'productName', options: { unique: true } },
    {
      name: 'roundDateTime',
      keypath: 'roundDateTime',
      options: { unique: false },
    },
  ],
}
