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

export interface IUserSchemaShort {
  firstname: string
  lastname: string
  phoneNumber: string
  homeNumber: string
  homeMoo?: string
  homeMooban?: string
  homePostalCode: string
  homeSubDistrict: string
  homeDistrict: string
  homeProvince: string
}
