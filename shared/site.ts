// ALL MediRefined copy + business data. Components only render what is here, so edits happen in one place.
// Copy follows the design handoff (../design_handoff_medirefined_home, renderVals()). "[Add …]" values and the
// sample reviews are placeholders the client still has to supply (docs/BUILD-LOG.md) — never invent them.
// The FAQ answers were written for the prototype and need clinical review before launch.

export const site = {
  name: 'MediRefined',
  url: 'https://medirefined.example', // placeholder until the production domain is known (NUXT_SITE_URL overrides)
  title: 'MediRefined | Botox and dermal fillers',
  description: 'Clear, honest information about Botox and dermal fillers: what they do, how they differ, and what to expect at your consultation.',
  tagline: 'Botox and dermal filler consultations.',
}

export const nav = [
  { label: 'Treatments', href: '#treatments' },
  { label: 'Areas', href: '#areas' },
  { label: 'What to expect', href: '#expect' },
  { label: 'Safety', href: '#safety' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
]

export const hero = {
  eyebrow: 'Botox and dermal fillers',
  title: 'Subtle refinement,',
  titleAccent: 'explained plainly.',
  lead: 'Botox and dermal fillers do different jobs. Learn what each one treats, how long results last, and what happens at your appointment before you decide anything.',
}

export const treatments = {
  title: 'Two treatments.',
  titleAccent: 'Two different jobs.',
  intro: 'Both are minimally invasive injectables. The difference is what they change: Botox softens movement, fillers restore volume.',
  items: [
    {
      tag: 'Softens movement',
      name: 'Botox',
      desc: 'A purified protein (botulinum toxin type A) that temporarily relaxes the small muscles that create expression lines.',
      facts: [
        ['Best for', 'Frown lines, forehead lines and crow\'s feet.'],
        ['When you see results', 'Usually within 3 to 7 days, settling fully at about 2 weeks.'],
        ['How long it lasts', 'Typically 3 to 4 months, then muscle movement gradually returns.'],
      ],
    },
    {
      tag: 'Restores volume',
      name: 'Dermal fillers',
      desc: 'Soft gels, most often hyaluronic acid, placed under the skin to add volume, smooth folds and shape features.',
      facts: [
        ['Best for', 'Cheeks, lips, smile lines, chin and jawline.'],
        ['When you see results', 'Immediately, with any swelling settling over a few days.'],
        ['How long it lasts', 'Roughly 6 to 18 months, depending on the product and area. Hyaluronic acid fillers can be dissolved if needed.'],
      ],
    },
  ] as const,
}

// x/y = marker centre as % of the square portrait (public/images/face.jpg). The handoff's coordinates were for a
// portrait not yet supplied; these are tuned to face.jpg. Re-tune if the photo changes.
// desc = the detail card's paragraphs, kept to similar lengths so every card reads the same. The second paragraphs
// and the Results / Lasts facts were written for the site and need clinical review before launch, like the FAQs.
export const areas = {
  title: 'Where each treatment is used.',
  intro: 'Select an area to see what is usually treated there, and with what.',
  image: '/images/face.jpg',
  imageAlt: 'Front-facing portrait with the common treatment areas marked',
  items: [
    {
      label: 'Forehead and frown lines', treatment: 'Botox', x: 50, y: 31,
      desc: [
        'Botox relaxes the muscles that crease the forehead and the space between the brows, softening frown and forehead lines.',
        'Doses are kept conservative, so you can still raise your brows and look expressive, just less tired. It pairs well with crow\'s feet.',
      ],
      facts: [['Results', '3 to 7 days, settling at 2 weeks'], ['Lasts', 'Typically 3 to 4 months']],
    },
    {
      label: 'Crow\'s feet', treatment: 'Botox', x: 66, y: 46,
      desc: [
        'Small amounts of Botox at the outer corners of the eyes soften the fine lines that appear when you smile, laugh or squint.',
        'The aim is a smoother, more rested look while your smile stays warm and natural. This area is often treated alongside frown lines.',
      ],
      facts: [['Results', '3 to 7 days, settling at 2 weeks'], ['Lasts', 'Typically 3 to 4 months']],
    },
    {
      label: 'Cheeks', treatment: 'Dermal fillers', x: 36, y: 56,
      desc: [
        'Hyaluronic acid filler restores volume in the mid-face, lifting and supporting the cheeks for a fresher, natural shape.',
        'Support here can also soften the folds beside the nose and mouth, so a little volume in the cheeks can refresh the whole face.',
      ],
      facts: [['Results', 'Immediately, settling over a few days'], ['Lasts', 'Often 12 months or more']],
    },
    {
      label: 'Lips', treatment: 'Dermal fillers', x: 50, y: 67,
      desc: [
        'Filler can add subtle volume, define the lip border and improve symmetry. The aim is a natural balance, never extra size.',
        'Small amounts are placed carefully and built up gradually. Lips may look swollen for a few days, and filler can be dissolved if needed.',
      ],
      facts: [['Results', 'Immediately, settling over a few days'], ['Lasts', 'Around 6 to 12 months']],
    },
    {
      label: 'Chin and jawline', treatment: 'Dermal fillers', x: 57, y: 76,
      desc: [
        'Filler along the chin and jaw gently adds structure and definition, improving the profile and the line from ear to chin.',
        'It can bring the lower face into better proportion without surgery, balancing a softer chin or a less defined jawline.',
      ],
      facts: [['Results', 'Immediately, settling over a few days'], ['Lasts', 'Often 12 months or more']],
    },
  ],
}

export const expect = {
  title: 'What to expect.',
  intro: 'A typical visit is short, and nothing happens on the day unless you are comfortable with the plan.',
  steps: [
    { n: '01', title: 'Consultation', body: 'Your clinician reviews your health history, listens to your goals and explains the options and risks.' },
    { n: '02', title: 'Plan', body: 'Together you agree on what to treat, and what to leave alone. Botox is a prescription treatment, so this step is required.' },
    { n: '03', title: 'Treatment', body: 'Small injections, usually 15 to 30 minutes. Numbing cream or built-in anaesthetic keeps fillers comfortable.' },
    { n: '04', title: 'Aftercare', body: 'Most people return to normal activity straight away. Mild swelling or bruising is common and short-lived.' },
  ],
}

export const safety = {
  title: 'Qualifications and safety.',
  intro: 'Rules on who can inject in England are still evolving. These are the standards to look for in any practitioner.',
  items: [
    { title: 'A prescriber assesses you first', body: 'Botox is a prescription-only medicine. It must be prescribed by a registered doctor, dentist, nurse or pharmacist independent prescriber (registered with the GMC, GDC, NMC or GPhC) after assessing you.' },
    { title: 'Specialist injector training', body: 'A Level 7 (postgraduate-level) qualification in botulinum toxin and dermal fillers is the widely recognised benchmark. Ask which body awarded it and when.' },
    { title: 'Professional registration', body: 'Check your practitioner on the relevant professional register, and whether they belong to a voluntary register such as JCCP or Save Face.' },
    { title: 'Insurance and emergency readiness', body: 'Ask about professional indemnity insurance and training in managing complications, including having hyaluronidase available for filler treatments.' },
    { title: 'Fillers need extra care in choosing', body: 'Dermal fillers are medical devices, not prescription medicines, and at the time of writing the law does not restrict who may inject them. Choosing training matters even more.' },
    { title: 'Adults only', body: 'In England it is illegal to give Botox or cosmetic fillers to anyone under 18 for cosmetic purposes.' },
  ],
  practitioner: {
    title: 'Your practitioner at MediRefined',
    fields: [
      ['Name', '[Add name]'],
      ['Profession and registration', '[Add details]'],
      ['Qualifications', '[Add qualifications]'],
    ] as const,
  },
  note: 'This is general information, not legal advice. Requirements may change, so please check current rules.',
}

export const reviews = {
  title: 'Kind words',
  intro: 'What it feels like to be looked after at MediRefined.',
  // sample: true → shows the "replace with real client reviews" note. Remove once real reviews are in.
  items: [
    { quote: 'I felt listened to from the first minute. The plan was clear, and the results look like me, only rested.', who: 'Client name, Botox', sample: true },
    { quote: 'Everything was explained honestly, including what I did not need. I left feeling confident, not pressured.', who: 'Client name, Dermal fillers', sample: true },
    { quote: 'Calm, professional and discreet. I would happily recommend a consultation to anyone unsure where to start.', who: 'Client name, Consultation', sample: true },
  ],
}

export const faqs = {
  title: 'Questions? Answers.',
  items: [
    { q: 'Will I look frozen or overfilled?', a: 'Not with a careful, conservative approach. Doses are planned to soften rather than stop movement, and filler is added gradually. It is always possible to add more at a review; it is harder to take away.' },
    { q: 'Does it hurt?', a: 'Most people describe a brief pinch. Botox needles are very fine, and most fillers contain a local anaesthetic. Numbing cream can be used if you prefer.' },
    { q: 'What are the side effects?', a: 'The most common are mild redness, swelling, tenderness or bruising at the injection sites, usually settling within days. Rarer risks will be explained in full at your consultation.' },
    { q: 'Can I have both at once?', a: 'Often, yes. Botox and fillers treat different concerns and can be combined in one appointment if that suits your plan. Your clinician will advise.' },
    { q: 'Who should not have these treatments?', a: 'Treatment is not suitable during pregnancy or breastfeeding, for anyone under 18, or with certain medical conditions, medicines or active skin infections. These are checked at consultation.' },
  ],
}

export const TREATMENTS = ['Botox', 'Dermal fillers', 'Not sure yet'] as const
export const TIMES = ['Morning', 'Afternoon', 'Evening'] as const

export const booking = {
  title: 'Book a consultation.',
  intro: 'Tell us what you are interested in and when suits you. We will get back to you to confirm a time. There is no obligation to treat on the day.',
  note: 'Please do not include medical details in this form. Your clinician will ask about your health history at your consultation.',
  successTitle: 'Request received.',
  successBody: 'We will be in touch to confirm your time.',
  again: 'Send another request',
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
