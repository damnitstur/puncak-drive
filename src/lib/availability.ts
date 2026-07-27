import availabilityData from "@/data/availability.json"
import { addDays, isSameDay, startOfDay } from "date-fns"

export interface BookedRange {
  startDate: Date
  endDate: Date
  reason: string
}

export interface CarAvailabilitySchedule {
  carId: string
  carName: string
  bookedRanges: BookedRange[]
}

/**
 * Calculates dynamically generated real Date objects from simulated offset days in availability.json
 */
export function getAvailabilitySchedules(): CarAvailabilitySchedule[] {
  const today = startOfDay(new Date())

  return availabilityData.bookedSchedules.map((schedule) => ({
    carId: schedule.carId,
    carName: schedule.carName,
    bookedRanges: schedule.bookedRanges.map((range) => {
      const startDate = addDays(today, range.offsetDaysFromTodayStart)
      const endDate = addDays(startDate, range.durationDays - 1)
      return {
        startDate,
        endDate,
        reason: range.reason,
      }
    }),
  }))
}

/**
 * Checks if a specific date is booked for a given car (or for any car if carId is omitted)
 */
export function isDateBooked(date: Date, carId?: string): boolean {
  const schedules = getAvailabilitySchedules()
  const targetDay = startOfDay(date)

  const relevantSchedules = carId
    ? schedules.filter((s) => s.carId.toLowerCase() === carId.toLowerCase())
    : schedules

  return relevantSchedules.some((schedule) =>
    schedule.bookedRanges.some(
      (range) => targetDay >= range.startDate && targetDay <= range.endDate
    )
  )
}

/**
 * Returns list of all booked dates as Date objects for calendar matcher / disabled prop
 */
export function getBookedDates(carId?: string): Date[] {
  const schedules = getAvailabilitySchedules()
  const dates: Date[] = []

  const relevantSchedules = carId
    ? schedules.filter((s) => s.carId.toLowerCase() === carId.toLowerCase())
    : schedules

  relevantSchedules.forEach((schedule) => {
    schedule.bookedRanges.forEach((range) => {
      let current = new Date(range.startDate)
      while (current <= range.endDate) {
        if (!dates.some((d) => isSameDay(d, current))) {
          dates.push(new Date(current))
        }
        current = addDays(current, 1)
      }
    })
  })

  return dates
}

/**
 * Returns availability status for a car on a target date
 */
export function getCarAvailabilityStatus(
  carId: string,
  date: Date = new Date()
): { isAvailable: boolean; reason?: string } {
  const schedules = getAvailabilitySchedules()
  const targetDay = startOfDay(date)

  const schedule = schedules.find(
    (s) => s.carId.toLowerCase() === carId.toLowerCase()
  )

  if (!schedule) return { isAvailable: true }

  const match = schedule.bookedRanges.find(
    (range) => targetDay >= range.startDate && targetDay <= range.endDate
  )

  if (match) {
    return { isAvailable: false, reason: match.reason }
  }

  return { isAvailable: true }
}
