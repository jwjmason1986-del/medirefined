// ALL MediRefined copy + business data. Components only render what is here, so edits happen in one place.
// Text is ported verbatim from ../design-source/index.html. "[Add …]" values are placeholders the client still
// has to supply (tracked in docs/BUILD-LOG.md) — keep them visible rather than inventing details.

export const site = {
  name: 'MediRefined',
  url: 'https://medirefined.example', // placeholder until the production domain is known (NUXT_SITE_URL overrides)
  title: 'MediRefined | Botox and dermal fillers',
  description: 'Clear, honest information about Botox and dermal fillers: what they do, how they differ, and what to expect at your consultation.',
  tagline: 'Botox and dermal filler consultations.',
}

export const nav = [
  { label: 'Botox vs fillers', href: '#compare' },
  { label: 'Treatment areas', href: '#areas' },
  { label: 'What to expect', href: '#process' },
  { label: 'Qualifications', href: '#qualifications' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export const hero = {
  title: 'Subtle refinement, explained plainly.',
  lead: 'Botox and dermal fillers do different jobs. Learn what each one treats, how long results last, and what happens at your appointment before you decide anything.',
}

export const compare = {
  title: 'Two treatments, two different jobs',
  intro: 'Both are minimally invasive injectables. The difference is what they change: Botox softens movement, fillers restore volume.',
  items: [
    {
      name: 'Botox',
      summary: 'A purified protein (botulinum toxin type A) that temporarily relaxes the small muscles that create expression lines.',
      facts: [
        ['Best for', 'Frown lines, forehead lines and crow\'s feet.'],
        ['When you see results', 'Usually within 3 to 7 days, settling fully at about 2 weeks.'],
        ['How long it lasts', 'Typically 3 to 4 months, then muscle movement gradually returns.'],
      ],
    },
    {
      name: 'Dermal fillers',
      summary: 'Soft gels, most often hyaluronic acid, placed under the skin to add volume, smooth folds and shape features.',
      facts: [
        ['Best for', 'Cheeks, lips, smile lines, chin and jawline.'],
        ['When you see results', 'Immediately, with any swelling settling over a few days.'],
        ['How long it lasts', 'Roughly 6 to 18 months, depending on the product and area. Hyaluronic acid fillers can be dissolved if needed.'],
      ],
    },
  ] as const,
}

// x/y = star centre in the 300×300 face-photo coordinate space (public/images/face.jpg is square).
export const zones = {
  title: 'Where each treatment is used',
  intro: 'Select an area to see what is usually treated there and with what.',
  items: [
    { name: 'Forehead and frown lines', tag: 'Botox', x: 150, y: 92, text: 'Botox relaxes the muscles that crease the forehead and the space between the brows, softening lines that show when you frown or raise your eyebrows.' },
    { name: 'Crow\'s feet', tag: 'Botox', x: 198, y: 140, text: 'Small doses around the outer corners of the eyes soften the lines that appear when you smile or squint.' },
    { name: 'Cheeks', tag: 'Filler', x: 108, y: 167, text: 'Filler can restore lost volume and lift the mid-face, which also softens the look of deeper folds below.' },
    { name: 'Lips', tag: 'Filler', x: 150, y: 200, text: 'Small amounts of filler add definition, hydration and shape. Natural-looking results come from restraint, not size.' },
    { name: 'Chin and jawline', tag: 'Filler', x: 170, y: 220, text: 'Filler can refine proportions and add structure to the chin and jawline without surgery.' },
  ],
}

export const process = {
  title: 'What to expect',
  intro: 'A typical visit is short, and nothing happens on the day unless you are comfortable with the plan.',
  steps: [
    { title: 'Consultation', text: 'Your clinician reviews your health history, listens to your goals and explains the options and risks.' },
    { title: 'Plan', text: 'Together you agree on what to treat, and what to leave alone. Botox is a prescription treatment, so this step is required.' },
    { title: 'Treatment', text: 'Small injections, usually 15 to 30 minutes. Numbing cream or built-in anaesthetic keeps fillers comfortable.' },
    { title: 'Aftercare', text: 'Most people return to normal activity straight away. Mild swelling or bruising is common and short-lived.' },
  ],
}

export const qualifications = {
  title: 'Qualifications and safety',
  intro: 'Rules on who can inject in England are still evolving. These are the standards to look for in any practitioner.',
  items: [
    { title: 'A prescriber assesses you first', text: 'Botox is a prescription-only medicine. It must be prescribed by a registered doctor, dentist, or nurse or pharmacist independent prescriber (registered with the GMC, GDC, NMC or GPhC) after assessing you.' },
    { title: 'Specialist injector training', text: 'A Level 7 (postgraduate-level) qualification in botulinum toxin and dermal fillers is the widely recognised benchmark. Ask which body awarded it and when.' },
    { title: 'Professional registration', text: 'Check your practitioner on the relevant professional register, and whether they belong to a voluntary register such as JCCP or Save Face.' },
    { title: 'Insurance and emergency readiness', text: 'Ask about professional indemnity insurance and training in managing complications, including having hyaluronidase available for filler treatments.' },
    { title: 'Fillers need extra care in choosing', text: 'Dermal fillers are medical devices, not prescription medicines, and at the time of writing the law does not restrict who may inject them. Checking training matters even more.' },
    { title: 'Adults only', text: 'In England it is illegal to give Botox or cosmetic fillers to anyone under 18 for cosmetic purposes.' },
  ],
  practitioner: {
    title: 'Your practitioner at MediRefined',
    rows: [
      ['Name', '[Add name]'],
      ['Profession and registration number', '[Add details]'],
      ['Qualifications', '[Add qualifications]'],
    ] as const,
  },
  note: 'This is general information, not legal advice. Requirements may change, so please check current rules.',
}

export const reviews = {
  title: 'Kind words',
  intro: 'What it feels like to be looked after at MediRefined.',
  // sample: true → shows the "replace with a real client review" note. Remove once real reviews are in.
  items: [
    { quote: 'I felt listened to from the first minute. The plan was clear, and the result looks like me, only rested.', name: 'Client name', treatment: 'Botox', sample: true },
    { quote: 'Everything was explained honestly, including what I did not need. I left feeling confident, not pressured.', name: 'Client name', treatment: 'Dermal fillers', sample: true },
    { quote: 'Calm, professional and discreet. I would happily recommend a consultation to anyone unsure where to start.', name: 'Client name', treatment: 'Consultation', sample: true },
  ],
}

export const faqs = {
  title: 'Common questions',
  items: [
    { q: 'Will I look frozen or overfilled?', a: 'Not if the treatment is planned conservatively. The aim is a rested, natural version of you, and a good clinician will adjust doses and amounts to keep movement and proportions natural.' },
    { q: 'Does it hurt?', a: 'Most people describe brief pinching. Fillers often contain a local anaesthetic, and numbing cream can be used for more sensitive areas like the lips.' },
    { q: 'What are the side effects?', a: 'Common ones are redness, swelling, tenderness and bruising, which usually fade within days. Serious complications are rare, which is why treatment should always be carried out by a properly qualified, insured practitioner.' },
    { q: 'Can I have both at once?', a: 'Yes. Many people combine them, using Botox to soften lines and filler to restore volume. Your clinician will advise what suits your face.' },
    { q: 'Who should not have these treatments?', a: 'Treatment is generally avoided during pregnancy and breastfeeding, and if you have an active skin infection or certain neuromuscular conditions. Tell your clinician about your full medical history and any medication you take.' },
  ],
}

export const TREATMENTS = ['Botox', 'Dermal fillers', 'Both', 'Not sure yet'] as const
export const TIMES = ['Morning', 'Afternoon', 'Evening', 'No preference'] as const

export const booking = {
  title: 'Book a consultation',
  intro: 'Tell us what you are interested in and when suits you. We will get back to you to confirm a time. There is no obligation to treat on the day.',
  note: 'Please do not include medical details in this form. Your clinician will ask about your health history at your consultation.',
  success: 'Request sent. We will be in touch to confirm your appointment.',
  error: 'Your request was not sent. Check your connection and try again.',
}

export const contact = {
  phone: '[Add phone number]',
  email: '[Add email address]',
  address: '[Add clinic address]',
  hours: [
    ['Monday to Friday', '[Add hours]'],
    ['Saturday', '[Add hours]'],
    ['Sunday', '[Add hours]'],
  ] as const,
  social: [
    ['Instagram', '[Add handle]'],
    ['Facebook', '[Add page]'],
  ] as const,
  disclaimer: 'This page is general information and not medical advice. Results vary between individuals. Always consult a qualified clinician before starting any treatment.',
}
