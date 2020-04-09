export interface IRequestQrTokenBody {
  isUsePassport: boolean
  nationalId: string
  phoneNumber: string
}

export interface IRequestQrTokenSuccessData {
  _id: string // userId
  qrcodeToken: string
}
