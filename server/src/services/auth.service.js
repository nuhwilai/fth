const Axios = require('axios')
const _ = require('lodash')
exports.verifyGoogleAccessToken = async (accessToken) => {
  try {
    const result = await Axios.get(
      `https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`,
    )
    if (result.data) {
      return {
        valid: true,
        data: result.data,
      }
    } else {
      return {
        valid: false,
        reason: 'invalid_ouath_token',
      }
    }
  } catch (error) {
    console.log('error', error.response.data.error)
    return {
      valid: false,
      reason: _.get(error, 'response.data.error'),
    }
  }
}
