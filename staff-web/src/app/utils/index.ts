import { KJUR } from 'jsrsasign'
import decoded from 'jwt-decode'
import { environment } from 'src/environments/environment'

export const verifyJWTToken = (jwttoken: string) => {
  try {
    const isValid = KJUR.jws.JWS.verifyJWT(jwttoken, 'bye-bye-covid19', {
      alg: ['HS256'],
    })
    if (isValid) {
      const decode = decoded(jwttoken)
      return decode
    } else {
      throw new Error('cannot valid JWT')
    }
  } catch (e) {
    console.log('e :', e)
  }
}
