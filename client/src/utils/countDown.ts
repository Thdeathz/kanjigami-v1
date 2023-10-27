type getDateDifferenceType = (date1: Date, date2: Date) => RemainingTime

export const getDateDifference: getDateDifferenceType = (date1, date2) => {
  let delta = Math.abs(date1.getTime() - date2.getTime()) / 1000

  const days = Math.floor(delta / 86400)
  delta -= days * 86400

  const hours = Math.floor(delta / 3600) % 24
  delta -= hours * 3600

  const minutes = Math.floor(delta / 60) % 60
  delta -= minutes * 60

  const seconds = Math.floor(delta % 60)

  return { days, hours, minutes, seconds }
}
