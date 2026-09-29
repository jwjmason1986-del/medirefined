<script setup lang="ts">
import { booking, TIMES, TREATMENTS, whatsapp } from '#shared/site'
import { emptyBooking, isoToday, validateBooking } from '#shared/booking'
import type { BookingErrors, BookingField } from '#shared/booking'

// Consultation request → POST /api/booking (emails the clinic). Validated here for instant inline errors,
// and again on the server. On success the form is replaced by the "Request received." state (handoff §9).
const form = reactive(emptyBooking())
const errors = ref<BookingErrors>({})
const state = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
const statusText = ref('')
const minDate = ref('') // set on mount so SSR and the visitor's clock can't disagree
// Submit stays disabled until hydrated: a pre-hydration native submit would bypass the API call.
const ready = ref(false)

onMounted(() => {
  minDate.value = isoToday()
  ready.value = true
})

const formEl = useTemplateRef<HTMLFormElement>('formEl')
const doneEl = useTemplateRef<HTMLElement>('doneEl')

function focusFirstError() {
  nextTick(() => formEl.value?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus())
}

function clearError(field: BookingField) {
  if (errors.value[field])
    errors.value = { ...errors.value, [field]: undefined }
}

async function submit() {
  if (state.value === 'sending')
    return
  const { errors: e } = validateBooking(form, minDate.value || isoToday())
  errors.value = e
  if (Object.keys(e).length) {
    focusFirstError()
    return
  }
  // Static build (GitHub Pages): no API to post to, so hand the request to WhatsApp, pre-filled.
  if (useRuntimeConfig().public.staticSite) {
    const lines = [
      `Hi MediRefined, I would like to request a consultation.`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : '',
      `Treatment: ${form.treatment}`,
      `Preferred date: ${form.date} (${form.time})`,
      form.message ? `Note: ${form.message}` : '',
    ].filter(Boolean)
    window.open(`https://wa.me/${whatsapp.number}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener')
    statusText.value = booking.whatsappHandoff
    return
  }
  state.value = 'sending'
  statusText.value = ''
  try {
    // ignoreResponseError: 4xx/5xx bodies come back as data (422 carries per-field errors).
    const res = await $fetch<{ ok?: boolean, errors?: BookingErrors, statusMessage?: string }>('/api/booking', {
      method: 'POST',
      body: { ...form },
      ignoreResponseError: true,
    })
    if (res?.ok) {
      Object.assign(form, emptyBooking())
      state.value = 'sent'
      nextTick(() => doneEl.value?.focus())
    }
    else if (res?.errors) {
      errors.value = res.errors
      state.value = 'idle'
      focusFirstError()
    }
    else {
      state.value = 'error'
      statusText.value = res?.statusMessage || booking.error
    }
  }
  catch {
    state.value = 'error'
    statusText.value = booking.error
  }
}

function again() {
  errors.value = {}
  statusText.value = ''
  state.value = 'idle'
  nextTick(() => formEl.value?.querySelector<HTMLElement>('input')?.focus())
}

const ids = { name: 'f-name', email: 'f-email', phone: 'f-phone', treatment: 'f-treat', date: 'f-date', time: 'f-time', message: 'f-msg', consent: 'f-consent' } as const
const err = (f: BookingField) => (errors.value[f] ? `${ids[f]}-err` : undefined)
</script>

<template>
  <section id="book" class="section book">
    <div class="wrap book__grid">
      <div>
        <h2 class="title">{{ booking.title }}</h2>
        <div class="rule" />
        <p class="book__intro">{{ booking.intro }}</p>
        <p class="book__note">{{ booking.note }}</p>
      </div>

      <div class="book__card">
        <div v-if="state === 'sent'" ref="doneEl" class="book__done" tabindex="-1" role="status">
          <div class="book__tick" aria-hidden="true">&#10003;</div>
          <h3>{{ booking.successTitle }}</h3>
          <p>{{ booking.successBody }}</p>
          <button type="button" class="book__again" @click="again">{{ booking.again }}</button>
        </div>

        <!-- method="post": even a native (pre-hydration) submit must never put personal data in the URL. -->
        <form v-else ref="formEl" class="book__form" method="post" novalidate @submit.prevent="submit">
          <div class="field">
            <label :for="ids.name">Full name</label>
            <input :id="ids.name" v-model="form.name" name="name" type="text" autocomplete="name" required :aria-invalid="!!errors.name" :aria-describedby="err('name')" @input="clearError('name')">
            <span v-if="errors.name" :id="err('name')" class="field__error">{{ errors.name }}</span>
          </div>
          <div class="field">
            <label :for="ids.email">Email</label>
            <input :id="ids.email" v-model="form.email" name="email" type="email" autocomplete="email" inputmode="email" required :aria-invalid="!!errors.email" :aria-describedby="err('email')" @input="clearError('email')">
            <span v-if="errors.email" :id="err('email')" class="field__error">{{ errors.email }}</span>
          </div>
          <div class="field">
            <label :for="ids.phone">Phone (optional)</label>
            <input :id="ids.phone" v-model="form.phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" :aria-invalid="!!errors.phone" :aria-describedby="err('phone')" @input="clearError('phone')">
            <span v-if="errors.phone" :id="err('phone')" class="field__error">{{ errors.phone }}</span>
          </div>
          <div class="field">
            <label :for="ids.treatment">Treatment</label>
            <select :id="ids.treatment" v-model="form.treatment" name="treatment" required :aria-invalid="!!errors.treatment" :aria-describedby="err('treatment')" @change="clearError('treatment')">
              <option value="">Choose a treatment</option>
              <option v-for="t in TREATMENTS" :key="t">{{ t }}</option>
            </select>
            <span v-if="errors.treatment" :id="err('treatment')" class="field__error">{{ errors.treatment }}</span>
          </div>
          <div class="field">
            <label :for="ids.date">Preferred date</label>
            <input :id="ids.date" v-model="form.date" name="date" type="date" :min="minDate || undefined" required :aria-invalid="!!errors.date" :aria-describedby="err('date')" @change="clearError('date')">
            <span v-if="errors.date" :id="err('date')" class="field__error">{{ errors.date }}</span>
          </div>
          <div class="field">
            <label :for="ids.time">Preferred time</label>
            <select :id="ids.time" v-model="form.time" name="time" required :aria-invalid="!!errors.time" :aria-describedby="err('time')" @change="clearError('time')">
              <option value="">Choose a time</option>
              <option v-for="t in TIMES" :key="t">{{ t }}</option>
            </select>
            <span v-if="errors.time" :id="err('time')" class="field__error">{{ errors.time }}</span>
          </div>
          <div class="field field--full">
            <label :for="ids.message">Anything you would like us to know (optional)</label>
            <textarea :id="ids.message" v-model="form.message" name="message" rows="4" maxlength="4000" :aria-invalid="!!errors.message" :aria-describedby="err('message')" @input="clearError('message')" />
            <span v-if="errors.message" :id="err('message')" class="field__error">{{ errors.message }}</span>
          </div>
          <!-- Honeypot: hidden from people, bots fill it in. -->
          <div class="hp" aria-hidden="true">
            <label for="f-website">Website</label>
            <input id="f-website" v-model="form.website" name="website" type="text" tabindex="-1" autocomplete="off">
          </div>
          <div class="field field--full">
            <label class="check">
              <input :id="ids.consent" v-model="form.consent" type="checkbox" name="consent" required :aria-invalid="!!errors.consent" :aria-describedby="err('consent')" @change="clearError('consent')">
              <span>I agree to be contacted about this request.</span>
            </label>
            <span v-if="errors.consent" :id="err('consent')" class="field__error">{{ errors.consent }}</span>
          </div>
          <button class="book__submit" type="submit" :disabled="!ready || state === 'sending'">
            {{ state === 'sending' ? 'Sending…' : 'Request consultation' }}
          </button>
          <p v-if="statusText" class="book__status" :class="{ 'is-info': state !== 'error' }" role="alert">{{ statusText }}</p>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.book {
  background: var(--color-navy);
  color: #fff;
}

.book__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
  gap: 56px;
  align-items: start;
}

.book__intro {
  margin-top: 24px;
  font-size: clamp(18px, 2vw, 21px);
  line-height: 1.4;
  color: var(--color-on-navy-soft);
}

.book__note {
  margin-top: 20px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-on-navy-faint);
}

.book__card {
  background: #fff;
  color: var(--color-ink);
  border-radius: 28px;
  box-shadow: 0 40px 80px -40px rgba(0, 0, 0, 0.5);
  padding: clamp(28px, 4vw, 44px);
}

/* Fields: auto-fit 200px columns (1 column in the desktop card, 2–3 on tablet, 1 on phones). */
.book__form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
  gap: 14px;
}

.field {
  display: grid;
  gap: 6px;
  align-content: start;
  min-width: 0;
}

.field--full,
.book__submit,
.book__status {
  grid-column: 1 / -1;
}

label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-secondary);
}

input:not([type="checkbox"]),
select,
textarea {
  width: 100%;
  min-width: 0;
  height: 48px;
  padding: 0 14px;
  border: 1px solid var(--color-line);
  border-radius: 12px;
  background: var(--color-cream);
  color: var(--color-ink);
  font: 400 17px/1.3 var(--font-sans);
  transition: border-color 0.2s, box-shadow 0.2s;
}

select {
  appearance: none;
  padding: 0 40px 0 12px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23231d6f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 16px;
}

input[type="date"] {
  appearance: none;
  -webkit-appearance: none;
  display: flex;
  align-items: center;
}

input[type="date"]::-webkit-date-and-time-value {
  text-align: left;
}

textarea {
  height: auto;
  padding: 12px 14px;
  resize: vertical;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--color-navy);
  box-shadow: 0 0 0 3px rgba(35, 29, 111, 0.12);
}

[aria-invalid="true"] {
  border-color: #a3283a !important;
}

.field__error,
.book__status {
  font-size: 13px;
  font-weight: 500;
  color: #a3283a;
}

.book__status.is-info {
  color: var(--color-navy);
}

.hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.check {
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: var(--color-secondary);
  cursor: pointer;
  min-height: 32px;
}

.check input {
  flex: none;
  width: 18px;
  height: 18px;
  margin: 0;
  accent-color: var(--color-navy);
}

.book__submit {
  margin-top: 8px;
  height: 52px;
  border: 0;
  border-radius: 980px;
  background: var(--color-navy);
  color: #fff;
  font: 500 17px/1 var(--font-sans);
  transition: background-color 0.2s;
}

.book__submit:hover:not(:disabled) {
  background: var(--color-navy-hover);
}

.book__submit:disabled {
  opacity: 0.7;
  cursor: progress;
}

/* Success state. */
.book__done {
  padding: 48px 0;
  text-align: center;
  outline: none;
}

.book__tick {
  width: 56px;
  height: 56px;
  margin: 0 auto;
  border-radius: 50%;
  background: var(--color-navy);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
}

.book__done h3 {
  margin-top: 20px;
  font-family: var(--font-serif);
  font-size: 32px;
  font-weight: 500;
}

.book__done p {
  margin-top: 10px;
  font-size: 17px;
  color: var(--color-muted);
}

.book__again {
  margin-top: 24px;
  min-height: 44px;
  padding: 0 12px;
  border: 0;
  background: none;
  color: var(--color-navy);
  font: 400 15px var(--font-sans);
}

.book__again:hover {
  text-decoration: underline;
}

@media (max-width: 479px) {
  .book__card {
    border-radius: 22px;
    padding: 24px 20px;
  }
}
</style>
