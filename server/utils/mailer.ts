// Outgoing email over SMTP (nodemailer) for booking requests. Configured by runtime env:
//   NUXT_SMTP_HOST, NUXT_SMTP_PORT (587), NUXT_SMTP_SECURE (true only for 465), NUXT_SMTP_IGNORE_TLS,
//   NUXT_SMTP_USER, NUXT_SMTP_PASS, NUXT_MAIL_FROM, NUXT_FORM_NOTIFY (clinic, comma-separated).
// Locally all of this points at Mailpit (docker-compose.yml). Ported from the Uniplumb website.
import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'

let transporter: Transporter | null = null
let transporterKey = ''

const SENDER_NAME = 'MediRefined'
function withSenderName(from: string): string {
  return !from || from.includes('<') ? from : `${SENDER_NAME} <${from}>`
}

function smtpConfig() {
  const c = useRuntimeConfig()
  return {
    host: String(c.smtpHost || ''),
    port: Number(c.smtpPort) || 587,
    secure: String(c.smtpSecure) === 'true',
    ignoreTls: String(c.smtpIgnoreTls) === 'true',
    user: String(c.smtpUser || ''),
    pass: String(c.smtpPass || ''),
    from: withSenderName(String(c.mailFrom || '').trim()),
  }
}

export function clinicRecipients(): string[] {
  return String(useRuntimeConfig().formNotify || '').split(',').map(s => s.trim()).filter(Boolean)
}

export function isMailConfigured(): boolean {
  const s = smtpConfig()
  return !!(s.host && s.from && clinicRecipients().length)
}

function getTransporter(): Transporter {
  const s = smtpConfig()
  const key = `${s.host}:${s.port}:${s.secure}:${s.ignoreTls}:${s.user}`
  if (!transporter || key !== transporterKey) {
    transporter = nodemailer.createTransport({
      host: s.host,
      port: s.port,
      secure: s.secure,
      ignoreTLS: s.ignoreTls,
      connectionTimeout: 15_000,
      greetingTimeout: 15_000,
      socketTimeout: 30_000,
      ...(s.user ? { auth: { user: s.user, pass: s.pass } } : {}),
    })
    transporterKey = key
  }
  return transporter
}

export interface MailInput {
  to: string | string[]
  subject: string
  html: string
  text: string
  replyTo?: string
}

export async function sendMail(m: MailInput): Promise<void> {
  await getTransporter().sendMail({ from: smtpConfig().from, to: m.to, subject: m.subject, html: m.html, text: m.text, replyTo: m.replyTo })
  console.info('[mail] sent:', m.subject)
}

export function esc(v: string | null | undefined): string {
  return String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// Branded email shell: ink masthead with a gold rule, heading, intro paragraphs, label/value table.
export function emailLayout(o: { heading: string, intro?: string[], rows?: Array<[string, string | null | undefined]>, footer?: string }) {
  const rows = (o.rows || []).filter(([, v]) => v != null && String(v).trim() !== '')
  const footer = o.footer || 'MediRefined · Botox and dermal filler consultations'
  const table = rows.length
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:8px 0 20px">${rows.map(([k, v]) =>
      `<tr><td style="padding:9px 12px 9px 0;border-top:1px solid #e2d9c8;vertical-align:top;width:150px;color:#8a7550;font:600 13px Arial,sans-serif">${esc(k)}</td>`
      + `<td style="padding:9px 0;border-top:1px solid #e2d9c8;vertical-align:top;color:#3a3952;font:14px/1.55 Arial,sans-serif">${esc(v).replace(/\n/g, '<br>')}</td></tr>`).join('')}</table>`
    : ''
  const html = `<!doctype html><html><body style="margin:0;background:#f9f7f1">`
    + `<div style="max-width:640px;margin:0 auto;background:#ffffff">`
    + `<div style="background:#1b1863;padding:20px 24px;border-bottom:3px solid #b9a487;font:400 26px Georgia,serif;color:#ffffff">MediRefined</div>`
    + `<div style="padding:24px">`
    + `<h1 style="margin:0 0 14px;font:400 24px Georgia,serif;color:#1b1863">${esc(o.heading)}</h1>`
    + (o.intro || []).map(p => `<p style="margin:0 0 14px;font:15px/1.6 Arial,sans-serif;color:#3a3952">${esc(p)}</p>`).join('')
    + table
    + `</div>`
    + `<div style="padding:14px 24px;border-top:1px solid #e2d9c8;font:12px Arial,sans-serif;color:#8a7550">${esc(footer)}</div>`
    + `</div></body></html>`
  const text = [o.heading, '', ...(o.intro || []).flatMap(p => [p, '']), ...rows.map(([k, v]) => `${k}: ${String(v)}`), '', footer].join('\n')
  return { html, text }
}
