export interface IRequestQrTokenBody {
  isUsePassport: boolean
  nationalId: string
  phoneNumber: string
}

export interface IRequestQrTokenResponse {
  valid: boolean
  data?: {
    _id: string
    qrcodeToken: string
  }
  reason?: string
}

export interface IUser {
  firstname: string
  lastname: string
  isUsePassport: boolean
  nationalId: string
  phoneNumber: string
  homeNumber: string
  homeMoo?: string
  homeMooban?: string
  homePostalCode: string
  homeSubDistrict: string
  homeDistrict: string
  homeProvince: string
  allergies: string[]
  diseases: string[]
  members: {
    isUsePassport: string
    firstname: string
    lastname: string
    nationalId: string
    allergies: string[]
    diseases: string[]
  }[]
  remark?: string
}
export interface IUserSuccessData {
  valid: boolean
  data?: {
    user: IUser
  }
  reason?: string
}
