<script setup lang="ts">
import { booking, TIMES, TREATMENTS } from '#shared/site'
import { emptyBooking, isoToday, validateBooking } from '#shared/booking'
import type { BookingErrors, BookingField } from '#shared/booking'

// Consultation request → POST /api/booking (emails the clinic). Validated here for instant inline errors,
// and again on the server.
const form = reactive(emptyBooking())
const errors = ref<BookingErrors>({})
const state = ref<'idle' | 'sending' | 'ok' | 'error'>('idle')
const statusText = ref('')
const minDate = ref('') // set on mount so SSR and the visitor's clock can't disagree
// Submit stays disabled until hydrated: a pre-hydration native submit would bypass the API call.
const ready = ref(false)

onMounted(() => {
  minDate.value = isoToday()
  ready.value = true
})

const formEl = useTemplateRef<HTMLFormElement>('formEl')

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
      state.value = 'ok'
      statusText.value = booking.success
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
</script>

<template>
  <section id="book" class="section cta">
    <div class="wrap cta__grid">
      <div>
        <h2>{{ booking.title }}</h2>
        <p>{{ booking.intro }}</p>
        <p class="cta__note">{{ booking.note }}</p>
      </div>

      <!-- method="post": even a native (pre-hydration) submit must never put personal data in the URL. -->
      <form ref="formEl" class="book-form" method="post" novalidate @submit.prevent="submit">
        <div class="fields">
          <div class="field">
            <label for="f-name">Full name</label>
            <input id="f-name" v-model="form.name" name="name" type="text" autocomplete="name" required :aria-invalid="!!errors.name" :aria-describedby="errors.name ? 'e-name' : undefined" @input="clearError('name')">
            <span v-if="errors.name" id="e-name" class="field__error">{{ errors.name }}</span>
          </div>
          <div class="field">
            <label for="f-email">Email</label>
            <input id="f-email" v-model="form.email" name="email" type="email" autocomplete="email" inputmode="email" required :aria-invalid="!!errors.email" :aria-describedby="errors.email ? 'e-email' : undefined" @input="clearError('email')">
            <span v-if="errors.email" id="e-email" class="field__error">{{ errors.email }}</span>
          </div>
          <div class="field">
            <label for="f-phone">Phone (optional)</label>
            <input id="f-phone" v-model="form.phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" :aria-invalid="!!errors.phone" :aria-describedby="errors.phone ? 'e-phone' : undefined" @input="clearError('phone')">
            <span v-if="errors.phone" id="e-phone" class="field__error">{{ errors.phone }}</span>
          </div>
          <div class="field">
            <label for="f-treat">Treatment</label>
            <select id="f-treat" v-model="form.treatment" name="treatment" required :aria-invalid="!!errors.treatment" :aria-describedby="errors.treatment ? 'e-treat' : undefined" @change="clearError('treatment')">
              <option value="">Choose a treatment</option>
              <option v-for="t in TREATMENTS" :key="t">{{ t }}</option>
            </select>
            <span v-if="errors.treatment" id="e-treat" class="field__error">{{ errors.treatment }}</span>
          </div>
          <div class="field">
            <label for="f-date">Preferred date</label>
            <input id="f-date" v-model="form.date" name="date" type="date" :min="minDate || undefined" required :aria-invalid="!!errors.date" :aria-describedby="errors.date ? 'e-date' : undefined" @change="clearError('date')">
            <span v-if="errors.date" id="e-date" class="field__error">{{ errors.date }}</span>
          </div>
          <div class="field">
            <label for="f-time">Preferred time</label>
            <select id="f-time" v-model="form.time" name="time" required :aria-invalid="!!errors.time" :aria-describedby="errors.time ? 'e-time' : undefined" @change="clearError('time')">
              <option value="">Choose a time</option>
              <option v-for="t in TIMES" :key="t">{{ t }}</option>
            </select>
            <span v-if="errors.time" id="e-time" class="field__error">{{ errors.time }}</span>
          </div>
          <div class="field field--full">
            <label for="f-msg">Anything you would like us to know (optional)</label>
            <textarea id="f-msg" v-model="form.message" name="message" maxlength="4000" :aria-invalid="!!errors.message" :aria-describedby="errors.message ? 'e-msg' : undefined" @input="clearError('message')" />
            <span v-if="errors.message" id="e-msg" class="field__error">{{ errors.message }}</span>
          </div>
          <!-- Honeypot: hidden from people, bots fill it in. -->
          <div class="hp" aria-hidden="true">
            <label for="f-website">Website</label>
            <input id="f-website" v-model="form.website" name="website" type="text" tabindex="-1" autocomplete="off">
          </div>
        </div>

        <label class="check">
          <input v-model="form.consent" type="checkbox" name="consent" required :aria-invalid="!!errors.consent" :aria-describedby="errors.consent ? 'e-consent' : undefined" @change="clearError('consent')">
          <span>I agree to be contacted about this request.</span>
        </label>
        <span v-if="errors.consent" id="e-consent" class="field__error check__error">{{ errors.consent }}</span>

        <button class="btn book-form__submit" type="submit" :disabled="!ready || state === 'sending'">
          {{ state === 'sending' ? 'Sending…' : 'Request consultation' }}
        </button>
        <p class="status" :class="{ 'status--ok': state === 'ok', 'status--err': state === 'error' }" role="status" aria-live="polite">{{ statusText }}</p>
      </form>
    </div>
  </section>
</template>

<style scoped>
.cta {
  background: var(--color-ink);
  color: #e6e4f2;
}

.cta h2 {
  color: #fff;
}

.cta__grid {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 56px;
  align-items: start;
}

.cta__grid p {
  margin-bottom: 18px;
}

.cta__note {
  font-size: 0.92rem;
  color: var(--color-on-ink-muted);
}

.book-form {
  background: #fff;
  color: var(--color-text);
  padding: 32px;
  border-radius: 16px;
}

.fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-bottom: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.field--full {
  grid-column: 1 / -1;
}

label {
  font-weight: 600;
  color: var(--color-ink);
  font-size: 0.95rem;
}

input:not([type="checkbox"]),
select,
textarea {
  width: 100%;
  min-width: 0;
  min-height: 48px;
  font: inherit;
  font-size: 1rem; /* ≥16px: stops iOS zooming on focus */
  color: var(--color-text);
  background: var(--color-paper);
  border: 1.5px solid var(--color-line);
  border-radius: 10px;
  padding: 11px 14px;
  transition: border-color 0.2s;
}

select {
  appearance: none;
  padding-right: 40px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231B1863' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 18px;
}

input[type="date"] {
  appearance: none;
  -webkit-appearance: none;
  display: block;
}

textarea {
  min-height: 110px;
  resize: vertical;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: var(--color-ink);
  box-shadow: 0 0 0 3px rgba(27, 24, 99, 0.12);
}

[aria-invalid="true"] {
  border-color: #a3283a !important;
}

.field__error {
  font-size: 0.85rem;
  color: #a3283a;
  font-weight: 500;
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
  gap: 12px;
  align-items: flex-start;
  font-size: 0.95rem;
  font-weight: 400;
  color: var(--color-text);
  margin-bottom: 22px;
  cursor: pointer;
}

.check input {
  flex: none;
  width: 20px;
  height: 20px;
  margin-top: 2px;
  accent-color: var(--color-ink);
}

.check__error {
  display: block;
  margin: -14px 0 18px;
}

.book-form__submit {
  min-width: 220px;
}

.status {
  margin: 14px 0 0;
  font-weight: 500;
  min-height: 1.6em;
  max-width: none;
}

.status--ok {
  color: #1d6b4a;
}

.status--err {
  color: #a3283a;
}

@media (max-width: 899px) {
  .cta__grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}

@media (max-width: 559px) {
  .fields {
    grid-template-columns: 1fr;
  }

  .book-form {
    padding: 24px 20px;
    border-radius: 14px;
  }

  .book-form__submit {
    width: 100%;
  }
}
</style>
