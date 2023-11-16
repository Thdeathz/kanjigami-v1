export const randomString = (minLength: number, maxLength: number) => {
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength
  // const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const charset = 'abcdefghijklmnopqrstuvwxyz'
  let result = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    result += charset.charAt(randomIndex)
  }

  return result
}
