interface IResponseSuccess {
  valid: boolean // true
  data: any // see I<SomeThing>SuccessData
}

interface IResponseFail {
  valid: boolean // false
  reason: string
}

interface IProductRound {
  _id: string
  roundDateTime: string
  roundDate: string // YYYY-MM-DD
  productName: string
}

// POST /productRounds
interface ICreateProductRoundSuccessData {
  _id: string
}

// PUT /productRounds:id
interface IUpdateProductRoundSuccessData {
  _id: string
}

// DELETE /productRounds:id
interface IDeleteProductRoundSuccessData {
  _id: string
}

// GET /productRounds
interface IProductRoundSuccessData {
  productRounds: IProductRound[]
  totalCount: number
}

// GET /productRounds/:id
interface IListProductRoundSuccessData {
  productRound: IProductRound
}
