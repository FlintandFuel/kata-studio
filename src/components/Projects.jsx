/*
 * Selected Work — case study cards
 * ─────────────────────────────────────────────
 * Three projects, opened into a full-screen case study
 * modal (see CaseStudyModal.jsx) via the onOpen callback.
 *
 * Heading reads "Case Studies" rather than "Selected Work"
 * to avoid duplicating the existing Selected Work section's
 * label — these are interactive case studies, that section
 * is an editorial showcase.
 */

import { motion, useReducedMotion } from 'framer-motion'

const img = (filename) => `${import.meta.env.BASE_URL}images/${filename}`

const projects = [
  {
    number: '01',
    title: 'Matlala Residence',
    location: 'Waterkloof, Pretoria',
    type: 'Luxury Residential',
    description:
      'A 480m² residence designed around a single central courtyard. Rammed earth walls, raw timber ceilings, a material language that ages into the landscape rather than against it.',
    teaser: 'A 480m² residence designed around a single central courtyard.',
    specs: ['Material: Rammed Earth + Timber', 'Size: 480m²', 'Status: Completed 2024'],
    images: [
      img('HH__Exterior Aerial 01.webp'),
      img('HH__Interior 06.webp'),
      img('HH__Interior 09.webp'),
    ],
    alt: 'Matlala Residence — Waterkloof, Pretoria, Kata Studio luxury residential architecture',
  },
  {
    number: '02',
    title: 'Linksfield Studio',
    location: 'Johannesburg North',
    type: 'Live-Work Residence',
    description:
      'A compact live-work home for a creative practitioner. North-facing studio volume, polished concrete floors, a 6m sliding door that dissolves the boundary between workspace and garden.',
    teaser: 'A compact live-work home for a creative practitioner.',
    specs: ['Material: Polished Concrete + Steel', 'Size: 210m²', 'Status: Completed 2023'],
    images: [
      img('HDW__External View 4.webp'),
      img('HDW__Internal View 13.webp'),
      img('HDW__Internal View 14.webp'),
    ],
    alt: 'Linksfield Studio — Johannesburg North, Kata Studio live-work residence',
  },
  {
    number: '03',
    title: 'Erasmus Farmhouse',
    location: 'Magaliesberg',
    type: 'Rural Retreat',
    description:
      'Off-grid retreat in the Magaliesberg. Passive cooling strategy, local stone plinth, corrugated steel roof. Every decision traceable to the climate and the site.',
    teaser: 'Off-grid retreat in the Magaliesberg, built for the climate and the site.',
    specs: ['Material: Stone + Corrugated Steel', 'Size: 320m²', 'Status: Completed 2022'],
    images: [
      img('HDW__External View 8.webp'),
      img('HDW__Internal View 15.webp'),
      img('HH__Exterior 01.webp'),
    ],
    alt: 'Erasmus Farmhouse — Magaliesberg, Kata Studio rural retreat architecture',
  },
]

export default function Projects({ onOpen }) {
  const reduced = useReducedMotion()

  return (
    <section id="projects" className="relative bg-[#F7F5F2] py-28 md:py-40">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24 max-w-2xl"
        >
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#C4805A] mb-4">
            Case Studies
          </p>
          <h2
            className="text-[#3D3A36] leading-[1.08] mb-6"
            style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3.5rem)', fontWeight: 150 }}
          >
            Where it begins<br />to take shape.
          </h2>
          <p
            className="text-[#57534E] leading-[1.8] font-light"
            style={{ fontSize: '1.0625rem' }}
          >
            Three projects. Each one a different brief. Each one beginning with the same question.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-x-10 gap-y-16 md:gap-x-12">
          {projects.map((p, i) => (
            <motion.article
              key={p.number}
              initial={reduced ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.72, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <button
                type="button"
                onClick={() => onOpen(p)}
                className="block w-full text-left focus:outline-none"
                aria-label={`View case study: ${p.title}`}
              >
                <div className="relative overflow-hidden aspect-[3/2]">
                  <img
                    src={p.images[0]}
                    alt={p.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>

                <div className="flex items-baseline gap-4 mt-7 mb-3">
                  <span
                    className="text-5xl text-[#D4C9B8] leading-none select-none"
                    style={{ fontWeight: 150 }}
                  >
                    {p.number}
                  </span>
                  <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#A8A29E]">
                    {p.type}
                  </span>
                </div>

                <h3 className="text-[#3D3A36] mb-2" style={{ fontSize: '1.5rem', fontWeight: 500 }}>
                  {p.title}
                </h3>
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#A8A29E]/70 mb-4">
                  {p.location}
                </p>
                <p className="text-sm text-[#A8A29E] leading-relaxed font-medium mb-5">
                  {p.teaser}
                </p>

                <span className="inline-flex items-center text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C4805A] underline decoration-transparent hover:decoration-[#C4805A] underline-offset-[6px] transition-all duration-200">
                  View project&nbsp;→
                </span>
              </button>
            </motion.article>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4C9B8]" />
    </section>
  )
}
