import bcrypt from 'bcrypt'

const BCRYPT_SALT_ROUNDS = 12

export function hashPassword(password) {
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
}

export async function isValidPassword(user, password) {
  if (!user.password || !user.password.startsWith('$2')) {
    return false
  }

  return bcrypt.compare(password, user.password)
}