export interface IReceiveTxn {
  _id: string
  nationalId: string
  receivedDateTime: Date
  receivedDate: string // YYYY-MM-DD
  amount: number
  staffId: string
  productId: string
}
