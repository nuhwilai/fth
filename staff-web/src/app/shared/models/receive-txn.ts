import { IUserSchemaShort } from './user'

export interface IReceiveTxn {
  _id: string
  nationalId: string
  receivedDateTime: Date
  receivedDate: string // YYYY-MM-DD
  amount: number
  staffId: string
  productId: string
}

export interface IReceiveTxnQuerystring {
  offset?: number
  max?: number
  sort?: string // fieldName ex. roundDateTime
  order?: 'desc' | 'asc'
  // filter
  nationalId_like?: string
  productId?: string
  // embeded filter
  __withUserSchema?: 'short' //
}
export interface ICustomRecieveTxn extends IReceiveTxn {
  user?: IUserSchemaShort // show when __withUserSchema = 'short'
}
export interface IReceiveTxnSuccessData {
  receiveTxns: ICustomRecieveTxn[]
}
