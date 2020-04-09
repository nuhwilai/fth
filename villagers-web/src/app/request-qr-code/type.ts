export interface IRequestQrTokenBody {
  isUsePassport: boolean
  nationalId: string
  phoneNumber: string
}

export interface IRequestQrTokenSuccessData {
  valid: boolean
  data?: {
    _id: string
    qrcodeToken: string
  }
  reason?: string
}
