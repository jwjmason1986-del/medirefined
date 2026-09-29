// Booking-form validation, shared by the client (inline errors before sending) and
// server/api/booking.post.ts (the authority). Pattern from the Uniplumb forms util, minus the database.
import { TIMES, TREATMENTS } from './site'

export interface BookingInput {
  name: string
  email: string
  phone: string
  treatment: string
  date: string // YYYY-MM-DD
  time: string
  message: string
  consent: boolean
  website?: string // honeypot — must stay empty
}

export type BookingField = Exclude<keyof BookingInput, 'website'>
export type BookingErrors = Partial<Record<BookingField, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[+\d][\d\s().-]{6,}$/
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const HTML_RE = /<\/?[a-z][\s\S]*>/i

export function emptyBooking(): BookingInput {
  return { name: '', email: '', phone: '', treatment: '', date: '', time: '', message: '', consent: false, website: '' }
}

// Today's date as YYYY-MM-DD. The server allows one day of slack for visitors in other time zones.
export function isoToday(offsetDays = 0): string {
  const d = new Date(Date.now() + offsetDays * 86_400_000)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function validateBooking(raw: Partial<Record<keyof BookingInput, unknown>>, minDate = isoToday()): { values: BookingInput, errors: BookingErrors } {
  const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
  const values: BookingInput = {
    name: str(raw.name, 200),
    email: str(raw.email, 254),
    phone: str(raw.phone, 40),
    treatment: str(raw.treatment, 40),
    date: str(raw.date, 10),
    time: str(raw.time, 40),
    message: str(raw.message, 4000),
    consent: raw.consent === true || raw.consent === 'on' || raw.consent === 'true',
  }
  const errors: BookingErrors = {}

  if (!values.name)
    errors.name = 'Please enter your name.'
  if (!values.email)
    errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(values.email))
    errors.email = 'Please enter a valid email address.'
  if (values.phone && !PHONE_RE.test(values.phone))
    errors.phone = 'Please enter a valid phone number, or leave it blank.'
  if (!(TREATMENTS as readonly string[]).includes(values.treatment))
    errors.treatment = 'Please choose a treatment.'
  if (!DATE_RE.test(values.date))
    errors.date = 'Please choose a preferred date.'
  else if (values.date < minDate)
    errors.date = 'Please choose a date from today onwards.'
  if (!(TIMES as readonly string[]).includes(values.time))
    errors.time = 'Please choose a preferred time.'
  if (!values.consent)
    errors.consent = 'Please agree to be contacted about this request.'

  for (const k of ['name', 'phone', 'message'] as const) {
    if (!errors[k] && HTML_RE.test(values[k]))
      errors[k] = 'Please remove any HTML from this field.'
  }
  return { values, errors }
}
