import HttpError from './httpError'
import schedule from 'node-schedule'

export const cronPatternGenerator = (startTime: Date) => {
  try {
    const start = new Date(startTime)

    const rule = new schedule.RecurrenceRule()
    rule.hour = start.getHours()
    rule.minute = start.getMinutes()
    rule.tz = 'Etc/UTC'

    return rule
  } catch (error) {
    throw new HttpError(500, 'Server error')
  }
}
