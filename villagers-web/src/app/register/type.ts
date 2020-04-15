export class ICreateUseRequestData {
  firstname: string
  lastname: string
  isUsePassport?: boolean
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
    phoneNumber?: string
    nationalId: string
    allergies: string[]
    diseases: string[]
  }[]
  remark?: string
}

export interface ICreateUserResponse {
  valid: boolean
  data?: {
    _id?: string
    qrcodeToken?: string
  }
  reason?: string
}
