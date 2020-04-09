import { KJUR, KEYUTIL } from 'jsrsasign'
import decoded from 'jwt-decode'
import { environment } from 'src/environments/environment'

export const verifyJWTToken = (jwttoken: string) => {
  try {
    const pubkey = KEYUTIL.getKey(environment.serverPubKey)
    console.log('pubkey :', pubkey);
    console.log('environment.serverPubKey :', environment.serverPubKey)
    const isValid = KJUR.jws.JWS.verifyJWT(jwttoken, pubkey, {
      alg: ['RS256'],
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
