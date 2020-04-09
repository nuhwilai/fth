// example case "111-111" --> pattern_incorrect
// example case "111111" --> duplicate_national_id

exports.validateUser = async (user) => {
  const validators = [
    this.validateUserPatternNationalId,
    this.validateUserDuplicateNationalId,
  ]

  for (const validatorFn of validators) {
    const result = await validatorFn(user)
    if (!result.valid) {
      console.log(result)
      return result
    }
  }

  return {
    valid: true,
  }
}

exports.validateUserPatternNationalId = (user) => {
  // TODO: check validate user with national id and passport
  if (user.isUsePassport) {
    return { valid: true, reason: 'pattern_incorrect' }
  }

  if (!user.isUsePassport) {
    // thai nationalId
    if (user.nationalId.length === 13) {
      if (checkSumNationalId(user.nationalId)) {
        return {
          valid: true,
        }
      }
    } else {
      return { valid: false, reason: 'wrong_length' }
    }
  }

  return { valid: false, reason: 'pattern_incorrect' }
}

exports.validateUserDuplicateNationalId = (user) => {
  // TODO: check duplicate national id from radis
  if (user.nationalId === '111111') {
    return {
      valid: false,
      reason: 'duplicate_national_id',
    }
  }
  return {
    valid: true,
  }
}

const checkSumNationalId = (value) => {
  // thai nationalId
  const digit1 = Number(value[0])
  const digit2 = Number(value[1])
  const digit3 = Number(value[2])
  const digit4 = Number(value[3])
  const digit5 = Number(value[4])
  const digit6 = Number(value[5])
  const digit7 = Number(value[6])
  const digit8 = Number(value[7])
  const digit9 = Number(value[8])
  const digit10 = Number(value[9])
  const digit11 = Number(value[10])
  const digit12 = Number(value[11])
  const digit13 = Number(value[12])
  let sum =
    digit1 * 13 +
    digit2 * 12 +
    digit3 * 11 +
    digit4 * 10 +
    digit5 * 9 +
    digit6 * 8 +
    digit7 * 7 +
    digit8 * 6 +
    digit9 * 5 +
    digit10 * 4 +
    digit11 * 3 +
    digit12 * 2
  sum = (11 - (sum % 11)) % 10
  if (sum === digit13) {
    return true
  }
  return false
}
