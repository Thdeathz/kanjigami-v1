// Convert UTC time to user's local time
export const convertToUserTimeZone = (utcTime: Date | string) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const userTime = new Date(utcTime).toLocaleString('en-US', { timeZone: userTimeZone })
  return new Date(userTime)
}
