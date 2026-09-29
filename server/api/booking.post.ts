// Consultation booking request → email to the clinic (reply-to = visitor) + a short acknowledgement to the visitor.
// No database: if SMTP isn't configured the request fails loudly (503) rather than pretending to succeed.
import { isoToday, validateBooking } from '#shared/booking'

// Simple in-memory per-IP rate limit (single container, so this is enough to stop casual abuse).
const WINDOW_MS = 10 * 60_000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter(t => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every(t => now - t >= WINDOW_MS))
        hits.delete(k)
    }
  }
  return recent.length > MAX_PER_WINDOW
}

function formatDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`)
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown>>(event).catch(() => null)
  if (!body || typeof body !== 'object')
    throw createError({ statusCode: 400, statusMessage: 'Invalid request' })

  // Honeypot filled → a bot. Pretend success, send nothing.
  if (typeof body.website === 'string' && body.website.trim()) {
    console.warn('[booking] honeypot tripped, ignored')
    return { ok: true }
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  if (rateLimited(ip))
    throw createError({ statusCode: 429, statusMessage: 'Too many requests. Please try again in a few minutes.' })

  // One day of slack so a visitor ahead of UK time can still pick "today".
  const { values: v, errors } = validateBooking(body, isoToday(-1))
  if (Object.keys(errors).length) {
    setResponseStatus(event, 422)
    return { ok: false, errors }
  }

  if (!isMailConfigured()) {
    console.error('[booking] email not configured (NUXT_SMTP_HOST / NUXT_MAIL_FROM / NUXT_FORM_NOTIFY) — request NOT sent:', v.email)
    throw createError({ statusCode: 503, statusMessage: 'Booking requests are temporarily unavailable.' })
  }

  const rows: Array<[string, string]> = [
    ['Name', v.name],
    ['Email', v.email],
    ['Phone', v.phone || '-'],
    ['Treatment', v.treatment],
    ['Preferred date', formatDate(v.date)],
    ['Preferred time', v.time],
    ['Message', v.message || '-'],
  ]

  const clinic = emailLayout({
    heading: 'New consultation request',
    intro: [`${v.name} has asked for a consultation via the website. Reply to this email to answer them directly.`],
    rows,
  })
  const ack = emailLayout({
    heading: 'We have your request',
    intro: [
      `Thank you, ${v.name}. We have received your consultation request and will be in touch to confirm a time.`,
      'There is no obligation to treat on the day. Please do not reply with medical details; your clinician will ask about your health history at your consultation.',
    ],
    rows: rows.filter(([k]) => ['Treatment', 'Preferred date', 'Preferred time'].includes(k)),
  })

  try {
    await sendMail({ to: clinicRecipients(), subject: `Consultation request from ${v.name}`, replyTo: v.email, ...clinic })
  }
  catch (err) {
    console.error('[booking] clinic email failed:', err)
    throw createError({ statusCode: 502, statusMessage: 'Your request was not sent. Please try again.' })
  }
  // The acknowledgement is best-effort: the clinic already has the request.
  await sendMail({ to: v.email, subject: 'Your MediRefined consultation request', ...ack }).catch(err => console.error('[booking] acknowledgement failed:', err))

  return { ok: true }
})
