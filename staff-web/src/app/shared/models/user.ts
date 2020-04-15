export interface IUser {
  firstname: string
  lastname: string
  isUsePassport: boolean
  nationalId: string
  phoneNumber: string
  homeNumber: string
  homeMoo?: string
  homeMooban?: string
  homeSubDistrict: string
  homeDistrict: string
  homeProvince: string
  homePostalCode: string
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

// GET `/users`
export interface IUserSchemaShort {
  firstname: string
  lastname: string
  phoneNumber: string
  homeNumber: string
  homeMoo?: string
  homeMooban?: string
  homeSubDistrict: string
  homeDistrict: string
  homeProvince: string
  homePostalCode: string
}

export interface IUserQuerystring {
  offset?: number
  max?: number
  sort?: string // fieldName ex. roundDateTime
  order?: 'desc' | 'asc'
  // filter
  firstname_like?: string
  lastname_like?: string
  nationalId_like?: string
  phoneNumber_like?: string
}

export interface IUserSuccessData {
  users: IUser[]
  totalCount: number
}
