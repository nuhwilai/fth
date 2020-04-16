import * as _ from 'lodash'

export function createUserAddressStr(user: any) {
  if (!user) return '-'
  return `${_.get(user, 'homeNumber', '-')} หมู่ ${_.get(
    user,
    'homeMoo',
    '-',
  )} หมู่บ้าน ${_.get(user, 'homeMooban', '-')} ต. ${_.get(
    user,
    'homeSubDistrict',
    '-',
  )} อ. ${_.get(user, 'homeDistrict', '-')} จ. ${_.get(
    user,
    'homeProvince',
    '-',
  )} ${_.get(user, 'homePostalCode', '-')}
    `
}

export function createUserFullNameStr(user: any) {
  if (!user) return '-'
  return `${_.get(user, 'firstname', '')} ${_.get(user, 'lastname', '')}`
}
