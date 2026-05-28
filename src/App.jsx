/*
 * KATA STUDIO â€” Landing Page
 * â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 * Positioning angle:  Design philosophy first. The only Pretoria
 *   architecture website that reads like a manifesto, not a brochure.
 *   Kata (to mould or shape) as both process and cultural ethos.
 *
 * Top trust signals:  SACAP registration; photorealistic render
 *   quality before any build begins; named design identity; material
 *   specificity in copy throughout.
 *
 * Primary CTA rationale:  "Begin a Conversation" â€” reflects the
 *   studio's philosophy that this is a creative relationship, not
 *   a transaction. No "Get a Quote" framing anywhere on the page.
 *
 * Font:  Google Sans Flex (variable font). Headings at weight 150
 *   create the same tension as the architecture: raw scale alongside
 *   fine detail. Body and UI at 500â€“600.
 *
 * Accent colour #C4805A (burnt sienna / rammed earth terracotta):
 *   Applied to section labels, CTA border, quote marks, hover
 *   states, hero rule line, FAQ +/- icon. Never as large fill.
 * â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
 */

import { useState, useEffect } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import './index.css'

// Resolves public/images paths correctly for any Vite base URL (local or GitHub Pages sub-path)
const img = (filename) => `${import.meta.env.BASE_URL}images/${filename}`

// â”€â”€â”€ Motion presets â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
}

function FadeUp({ children, delay = 0, className = '' }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

// â”€â”€â”€ SVG hatched texture â€” unique id per instance â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let _hatchId = 0
function HatchTexture({ className = '' }) {
  const id = `hatch-${++_hatchId}`
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none select-none absolute inset-0 w-full h-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={id} width="10" height="10" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#3D3A36" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} opacity="0.07" />
    </svg>
  )
}

// â”€â”€â”€ Section label (01, 02 â€¦) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function SectionLabel({ number, label }) {
  return (
    <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase text-[#C4805A] mb-8 select-none">
      <span>{number}</span>
      <span className="w-6 h-px bg-[#C4805A] inline-block" />
      {label}
    </p>
  )
}

// â”€â”€â”€ Real image wrapper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProjectImg({ src, alt, aspect = 'aspect-[4/3]', className = '' }) {
  return (
    <div className={`relative overflow-hidden ${aspect} ${className}`}>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  )
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// NAV
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const links = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-[#F7F5F2] border-b border-[#D4C9B8]/60 transition-shadow duration-300 ${
          scrolled ? 'shadow-sm' : ''
        }`}
      >
        <nav className="max-w-[1180px] mx-auto px-6 md:px-10 py-[10px] flex items-center justify-between">
          {/* Logo image */}
          <a href="#hero" aria-label="Kata Studio home" className="flex items-center">
            <img
              src={img("ks_logo.webp")}
              alt="Kata Studio"
              className="w-auto"
              style={{ height: '100px' }}
            />
          </a>

          {/* Desktop nav â€” collapses at xl (1280px) per brief spec */}
          <div className="hidden xl:flex items-center gap-8">
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#A8A29E] hover:text-[#C4805A] transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-2 text-[11px] font-bold tracking-[0.18em] uppercase px-5 py-2.5 border border-[#C4805A] text-[#C4805A] hover:bg-[#C4805A] hover:text-[#F7F5F2] transition-all duration-200 min-h-[44px] inline-flex items-center"
            >
              Begin a Conversation
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="xl:hidden flex flex-col gap-[5px] p-2 min-h-[44px] min-w-[44px] items-center justify-center"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-px bg-[#3D3A36] transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-6 h-px bg-[#3D3A36] transition-all duration-200 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-px bg-[#3D3A36] transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-40 bg-[#3D3A36] flex flex-col px-8 pt-28 pb-12"
          >
            <nav className="flex flex-col gap-7">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  initial={reduced ? false : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.38 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-[2.25rem] text-[#F7F5F2]/90 hover:text-[#C4805A] transition-colors tracking-wide min-h-[44px] flex items-center"
                  style={{ fontWeight: 300 }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto">
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center min-h-[44px] text-[11px] font-bold tracking-[0.22em] uppercase px-6 py-3 border border-[#C4805A] text-[#C4805A] hover:bg-[#C4805A] hover:text-[#F7F5F2] transition-all duration-200"
              >
                Begin a Conversation
              </a>
              <p className="mt-6 text-[11px] text-[#F7F5F2]/25 tracking-widest">
                Pretoria, Gauteng, South Africa
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// 01 HERO
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function Hero() {
  const reduced = useReducedMotion()
  return (
    <section
      id="hero"
      className="relative min-h-[calc(95vh-120px)] bg-[#F7F5F2] flex flex-col justify-end overflow-hidden"
      style={{ marginTop: '120px' }}
    >
      {/* Hatch texture â€” right half background layer */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none overflow-hidden">
        <HatchTexture />
      </div>

      {/* Floating project image â€” desktop, fills section from its top edge */}
      <div className="absolute top-0 right-0 w-[46%] h-full hidden lg:block">
        <img
          src={img("HH__Exterior Aerial 01.webp")}
          alt="Kata Studio â€” HH House aerial view, contemporary farmhouse architecture, Pretoria"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-[1180px] mx-auto w-full px-6 md:px-10 pb-20 pt-16 lg:pt-24">
        {/* Etymology label */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#C4805A] mb-8"
        >
          kata&nbsp;&nbsp;/&nbsp;&nbsp;
          <span className="text-[#A8A29E] font-medium normal-case tracking-normal">
            to mould or shape
          </span>
        </motion.p>

        {/* Headline â€” weight 150 */}
        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#3D3A36] leading-[0.92] mb-10 max-w-[700px]"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 8.5rem)', fontWeight: 150 }}
        >
          Architecture<br />
          <em style={{ fontStyle: 'italic', fontWeight: 150 }}>carefully</em><br />
          formed.
        </motion.h1>

        {/* Sienna rule */}
        <motion.div
          initial={reduced ? false : { scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.65, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="w-14 h-px bg-[#C4805A] mb-10 origin-left"
        />

        {/* Subheading */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="text-[#A8A29E] font-medium leading-[1.7] max-w-[360px] mb-12"
          style={{ fontSize: '1.0625rem' }}
        >
          Bespoke residential architecture in Pretoria, grounded in material craft and spatial intention.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.18 }}
          className="flex flex-wrap gap-5 items-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center min-h-[44px] text-[11px] font-bold tracking-[0.2em] uppercase px-7 py-3 border border-[#C4805A] text-[#C4805A] hover:bg-[#C4805A] hover:text-[#F7F5F2] transition-all duration-200"
          >
            Begin a Conversation
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2.5 min-h-[44px] text-[11px] font-semibold tracking-[0.18em] uppercase text-[#A8A29E] hover:text-[#3D3A36] transition-colors duration-200"
          >
            View Selected Work
            <span className="w-5 h-px bg-current" />
          </a>
        </motion.div>

        {/* Mobile hero image */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="mt-14 lg:hidden"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={img("HH__Exterior Aerial 01.webp")}
              alt="Kata Studio â€” HH House aerial view, contemporary farmhouse architecture, Pretoria"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4C9B8]" />
    </section>
  )
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// 02 PHILOSOPHY
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function Philosophy() {
  return (
    <section className="relative bg-[#F7F5F2] py-28 md:py-40">
      <div className="absolute top-0 left-0 right-0 h-px bg-[#D4C9B8]" />
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <FadeUp>
              <SectionLabel number="02" label="Philosophy" />
              <h2
                className="text-[#3D3A36] leading-[1.08]"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', fontWeight: 150 }}
              >
                Form follows<br />
                <em style={{ fontStyle: 'italic', fontWeight: 150 }}>feeling.</em>
              </h2>
            </FadeUp>
          </div>

          <div className="lg:col-span-8 lg:pt-14">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
              className="space-y-7"
            >
              {[
                'Every space we create begins not with a drawing, but with the question of what you want to feel when you walk through the door. Everything from the rafter angles to the clay on the walls is our answer.',
                'Great architecture is not assembled from a catalogue of finishes and floor plans. It is formed, slowly and deliberately, from a deep understanding of how you want to live. That is the meaning of Kata: to mould and shape with intention.',
                'This studio treats every project as an act of material storytelling. The rammed earth wall is not decoration. The exposed timber rafter is not aesthetic. They are the soul of the space, chosen because they carry the warmth of the person who will inhabit it.',
                'Where others lead with credentials, we lead with conviction. The result is not a house that looks beautiful in a photograph. It is a space that feels unmistakably yours, every day you wake up inside it.',
              ].map((para, i) => (
                <motion.p
                  key={i}
                  variants={fadeUp}
                  className="text-[#A8A29E] leading-[1.8] font-medium"
                  style={{ fontSize: '1.0625rem' }}
                >
                  {para}
                </motion.p>
              ))}
              <motion.p
                variants={fadeUp}
                className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#C4805A] pt-2"
              >
                SACAP Registered Architects&nbsp;&nbsp;&middot;&nbsp;&nbsp;Pretoria, Gauteng
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4C9B8]" />
    </section>
  )
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// 03 SELECTED WORK
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const projects = [
  {
    number: '001',
    name: 'HH House',
    location: 'Pretoria East',
    palette: 'Rammed earth, exposed steel, raw plaster',
    aspect: 'aspect-[16/10]',
    src: '/images/HH__Interior 06.webp',
    alt: 'Kata Studio â€” HH House interior, vaulted ceiling with rammed earth feature wall, Pretoria East',
    offsetRight: false,
  },
  {
    number: '002',
    name: 'HDW Residence',
    location: 'Magaliesberg, Gauteng',
    palette: 'Cast concrete, kiaat timber, textured clay plaster',
    aspect: 'aspect-[4/3]',
    src: '/images/HDW__External View 4.webp',
    alt: 'Kata Studio â€” HDW Residence exterior, contemporary architecture, Magaliesberg Gauteng',
    offsetRight: true,
  },
  {
    number: '003',
    name: 'HDW Interior',
    location: 'Magaliesberg, Gauteng',
    palette: 'Green fluted masonry, wood spindles, concrete screed',
    aspect: 'aspect-[4/3]',
    src: '/images/HDW__Internal View 13.webp',
    alt: 'Kata Studio â€” HDW Residence interior spatial design, Magaliesberg Gauteng',
    offsetRight: false,
  },
]

function SelectedWork() {
  return (
    <section id="work" className="relative bg-[#F7F5F2] py-28 md:py-40">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <FadeUp className="mb-16 md:mb-24">
          <SectionLabel number="03" label="Selected Work" />
          <h2
            className="text-[#3D3A36] leading-[1.08]"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', fontWeight: 150 }}
          >
            Each project, given<br />room to breathe.
          </h2>
        </FadeUp>

        <div className="space-y-28 md:space-y-40">
          {projects.map((p, i) => (
            <FadeUp key={p.number} delay={0.05}>
              <article className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Image */}
                <div className={p.offsetRight ? 'lg:col-span-7 lg:col-start-6' : 'lg:col-span-8'}>
                  <ProjectImg src={p.src} alt={p.alt} aspect={p.aspect} />
                </div>
                {/* Caption */}
                <div className={`lg:pt-10 ${p.offsetRight ? 'lg:col-span-4 lg:col-start-1 lg:row-start-1' : 'lg:col-span-4'}`}>
                  <p className="text-[11px] font-semibold tracking-[0.22em] text-[#C4805A] uppercase mb-4">{p.number}</p>
                  <h3
                    className="text-[#3D3A36] mb-2"
                    style={{ fontSize: '1.25rem', fontWeight: 500 }}
                  >
                    {p.name}
                  </h3>
                  <p className="text-sm text-[#A8A29E] tracking-wide mb-4">{p.location}</p>
                  <div className="w-8 h-px bg-[#D4C9B8] mb-4" />
                  <p className="text-sm text-[#A8A29E]/80 leading-relaxed font-medium">{p.palette}</p>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4C9B8]" />
    </section>
  )
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// 04 ABOUT
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function About() {
  return (
    <section id="about" className="relative bg-[#F7F5F2] py-28 md:py-40">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Founder image â€” 200px wide, pushed right to sit beside text column */}
          <FadeUp className="lg:col-span-5 flex justify-end">
            <img
              src={img("profile-pic.webp")}
              alt="Kata Studio founder, Pretoria"
              className="h-auto block"
              style={{ width: '200px', maxWidth: '100%' }}
            />
          </FadeUp>

          {/* Text */}
          <div className="lg:col-span-7">
            <FadeUp>
              <SectionLabel number="04" label="About" />
              <h2
                className="text-[#3D3A36] leading-[1.08] mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 150 }}
              >
                The practice<br />behind the work.
              </h2>
            </FadeUp>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
              className="space-y-6"
            >
              {[
                'Kata Studio is a boutique architectural practice based in Pretoria. The name comes from the Japanese: to mould or shape. It is not a metaphor. It describes exactly how we approach every commission.',
                'This is not a studio that will show you three options and ask which you prefer. It is a studio that will spend real time understanding how you move through space, what you notice in a room, and what kind of quiet a building needs to hold.',
                'The work draws on the material richness of the South African landscape: rammed earth, raw timber, cast concrete, and local stone. Not as a nostalgic gesture, but because these materials age honestly, wear beautifully, and carry a physical warmth that no imported finish can replicate.',
                'If you are building a home that you want to mean something in thirty years, this is where that conversation starts.',
              ].map((para, i) => (
                <motion.p
                  key={i}
                  variants={fadeUp}
                  className="text-[#A8A29E] leading-[1.8] font-medium"
                  style={{ fontSize: '1.0625rem' }}
                >
                  {para}
                </motion.p>
              ))}
              <motion.div variants={fadeUp} className="pt-2">
                <a
                  href="https://www.instagram.com/katastudio.za/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#A8A29E] hover:text-[#C4805A] transition-colors duration-200"
                >
                  <span>@katastudio.za</span>
                  <span className="w-8 h-px bg-current" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4C9B8]" />
    </section>
  )
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// 05 MATERIAL WORLD
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const materials = [
  {
    label: 'Rammed earth',
    caption: 'Warmth and geological weight. No two surfaces are alike.',
    src: '/images/HH__Interior 09.webp',
    alt: 'Rammed earth feature wall, Kata Studio project interior',
  },
  {
    label: 'Exposed timber',
    caption: 'Grain, knot, and honest structure. The rafter is the ceiling.',
    src: '/images/HDW__Internal View 14.webp',
    alt: 'Exposed timber rafter ceiling, Kata Studio HDW Residence',
  },
  {
    label: 'Cast concrete',
    caption: 'Precision and earned silence. The floor that grounds everything.',
    src: '/images/HDW__Internal View 15.webp',
    alt: 'Cast concrete floor and surfaces, Kata Studio HDW Residence interior',
  },
  {
    label: 'Raw steel',
    caption: 'Tension and restraint. Where structure is the detail.',
    src: '/images/HDW__External View 8.webp',
    alt: 'Raw steel architectural detail, Kata Studio HDW Residence exterior',
  },
  {
    label: 'Textured clay plaster',
    caption: 'Light moves across it. The wall becomes a surface to live with.',
    src: '/images/HH__Exterior Aerial 01.webp',
    alt: 'Textured plaster facade and landscape, Kata Studio HH House aerial view',
  },
  {
    label: 'Indigenous stone',
    caption: 'The landscape brought inside. Permanence made touchable.',
    src: '/images/HDW__External View 4.webp',
    alt: 'Natural stone and landscape integration, Kata Studio HDW Residence exterior',
  },
]

function MaterialWorld() {
  return (
    <section className="relative bg-[#F7F5F2] py-28 md:py-40">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <FadeUp className="mb-16">
          <SectionLabel number="05" label="Material World" />
          <h2
            className="text-[#3D3A36] leading-[1.08]"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', fontWeight: 150 }}
          >
            The materials that<br />make it real.
          </h2>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {materials.map((m, i) => (
            <FadeUp key={m.label} delay={i * 0.07}>
              <figure>
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={m.src}
                    alt={m.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-3 space-y-1">
                  <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#3D3A36]">{m.label}</p>
                  <p className="text-[13px] text-[#A8A29E] leading-relaxed font-medium">{m.caption}</p>
                </figcaption>
              </figure>
            </FadeUp>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4C9B8]" />
    </section>
  )
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// 06 PROCESS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const processSteps = [
  {
    number: '01',
    title: 'Understand',
    body: 'Before a single line is drawn, we listen. Not to your brief, but to the way you describe the spaces you love and the ones that have never felt quite right. This conversation shapes everything that follows.',
  },
  {
    number: '02',
    title: 'Shape',
    body: 'Concept develops through material studies, spatial drawings, and rendered forms. You see how light enters the space. You feel the material palette before it is built. Every decision is explained and deliberate.',
  },
  {
    number: '03',
    title: 'Build',
    body: 'Technical documentation, council submissions, and construction administration completed to the same standard as the design. The vision you agreed on is the building that gets built.',
  },
]

function Process() {
  return (
    <section id="process" className="relative bg-[#F7F5F2] py-28 md:py-40">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <FadeUp className="mb-16 md:mb-24">
          <SectionLabel number="06" label="Process" />
          <h2
            className="text-[#3D3A36] leading-[1.08]"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', fontWeight: 150 }}
          >
            Three stages.<br />One intent.
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-px bg-[#D4C9B8]">
          {processSteps.map((step, i) => (
            <FadeUp key={step.number} delay={i * 0.13}>
              <div className="bg-[#F7F5F2] p-8 md:p-10 lg:p-12 h-full">
                <p className="text-5xl text-[#D4C9B8] mb-6 select-none leading-none" style={{ fontWeight: 150 }}>
                  {step.number}
                </p>
                <h3 className="text-base font-bold tracking-wider text-[#3D3A36] uppercase mb-5">
                  {step.title}
                </h3>
                <p className="text-[#A8A29E] leading-[1.8] font-medium" style={{ fontSize: '1rem' }}>
                  {step.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4C9B8]" />
    </section>
  )
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// TESTIMONIALS
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const testimonials = [
  {
    quote: "They didn't just design a house. They listened until they understood how we actually wanted to live, and then they made that real.",
    author: 'Client, Private Residence, Pretoria East',
    note: 'Placeholder: to be replaced with a verified client quote.',
  },
  {
    quote: "Every material choice was explained and intentional. The rammed earth wall wasn't decoration. It was the soul of the space.",
    author: 'Client, Lifestyle Estate, Gauteng',
    note: 'Placeholder: to be replaced with a verified client quote.',
  },
  {
    quote: 'Other architects showed us mood boards. Kata Studio showed us why.',
    author: 'Client, Bespoke New Build, Pretoria',
    note: 'Placeholder: to be replaced with a verified client quote.',
  },
]

function Testimonials() {
  return (
    <section className="relative bg-[#F7F5F2] py-28 md:py-40">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <FadeUp className="mb-16">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#C4805A] mb-4">Client Voices</p>
          <h2
            className="text-[#3D3A36] leading-[1.08]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 150 }}
          >
            What it feels like<br />to be understood.
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <article className="border border-[#D4C9B8] p-8 flex flex-col gap-5 h-full">
                <span className="text-5xl text-[#C4805A] leading-none select-none" style={{ fontWeight: 150 }} aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote
                  className="text-[#3D3A36] leading-[1.75] flex-1 font-medium"
                  style={{ fontSize: '1.0625rem' }}
                >
                  {t.quote}
                </blockquote>
                <footer>
                  <p className="text-[12px] font-semibold text-[#A8A29E] tracking-wide">{t.author}</p>
                  <p className="text-[11px] text-[#A8A29E]/50 mt-1">{t.note}</p>
                </footer>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4C9B8]" />
    </section>
  )
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// 07 CONTACT / COMMISSION
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleEnquiry = (e) => {
    e.preventDefault()
    // TODO: connect to Formspree / Brevo / Mailchimp
    setSubmitted(true)
  }

  const inputClass =
    'w-full bg-transparent border border-[#D4C9B8] px-4 py-3 text-[#3D3A36] text-sm placeholder:text-[#A8A29E]/60 focus:outline-none focus:border-[#C4805A] transition-colors duration-200 min-h-[44px] font-medium'

  const labelClass =
    'block text-[11px] font-semibold tracking-[0.2em] uppercase text-[#A8A29E] mb-2'

  return (
    <section id="contact" className="relative bg-[#F7F5F2] py-28 md:py-40">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left: copy */}
          <div className="lg:col-span-5">
            <FadeUp>
              <SectionLabel number="07" label="Commission" />
              <h2
                className="text-[#3D3A36] leading-[1.08] mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 150 }}
              >
                Every space begins<br />with a conversation.
              </h2>
              <p
                className="text-[#A8A29E] leading-[1.8] mb-10 font-medium"
                style={{ fontSize: '1.0625rem' }}
              >
                If you are thinking about a new home, a significant renovation, or a place that you want to feel genuinely yours, share a little of what you have in mind. We will take it from there.
              </p>
              <address className="not-italic space-y-4 text-sm">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#3D3A36] mb-1">Location</p>
                  <p className="text-[#A8A29E] font-medium">Pretoria (Tshwane), Gauteng, South Africa</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#3D3A36] mb-1">Instagram</p>
                  <a
                    href="https://www.instagram.com/katastudio.za/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#A8A29E] font-medium hover:text-[#C4805A] transition-colors"
                  >
                    @katastudio.za
                  </a>
                </div>
              </address>
            </FadeUp>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-7">
            <FadeUp delay={0.1}>
              {submitted ? (
                <div className="border border-[#D4C9B8] p-12 text-center">
                  <div className="w-8 h-px bg-[#C4805A] mx-auto mb-6" />
                  <p className="font-semibold text-[#3D3A36] text-lg mb-3">Thank you.</p>
                  <p className="text-[#A8A29E] text-sm leading-relaxed max-w-xs mx-auto font-medium">
                    Your message has been received. We will be in touch to begin the conversation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquiry} className="space-y-6" noValidate>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={labelClass}>Your Name</label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className={inputClass}
                        placeholder="First and last name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>Email Address</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className={inputClass}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className={labelClass}>Tell Us About Your Project</label>
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className={`${inputClass} min-h-[unset] resize-none`}
                      placeholder="Where are you building? What does the space need to feel like?"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-6">
                    <button
                      type="submit"
                      className="inline-flex items-center min-h-[44px] text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-3 border border-[#C4805A] text-[#C4805A] hover:bg-[#C4805A] hover:text-[#F7F5F2] transition-all duration-200"
                    >
                      Begin a Conversation
                    </button>
                    <p className="text-[11px] text-[#A8A29E]/60 leading-relaxed">
                      Your information is used only to respond to your enquiry.
                    </p>
                  </div>
                </form>
              )}
            </FadeUp>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4C9B8]" />
    </section>
  )
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// FAQ
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const faqs = [
  {
    q: 'What does the architectural design process look like from first conversation to final build?',
    a: 'The process moves through three stages: Understand, Shape, and Build. It begins with a deep listening conversation about how you want to live in the space. Concept develops through material studies and spatial drawings before moving into technical documentation and construction. Throughout, the design intent drives every decision from structural form to material selection.',
  },
  {
    q: 'How do you prevent budget overruns, and who is responsible for cost control during the project?',
    a: 'Budget integrity starts with the brief. We work with you to define a realistic project budget before any design begins, and every material and spatial decision is made with that budget in mind. During construction, we issue detailed technical drawings and specifications so that your builder prices and builds exactly what was designed. We flag any deviations early. Our role is to protect the design and your investment simultaneously.',
  },
  {
    q: 'Do I appoint my own builder, or does Kata Studio manage the construction process?',
    a: 'You appoint your own registered builder. Our role during construction is as the principal agent: we issue drawings, review progress, certify payment claims, and ensure the build matches the approved design. We can recommend experienced contractors who have delivered projects to the standard this work demands, but the contract remains directly between you and your builder. This structure keeps you in control of the commercial relationship.',
  },
  {
    q: 'How much creative input do I have, and at what stage can I still change the design?',
    a: 'Your input is central from the very first conversation. The Understand phase is specifically designed to capture your vision, your lifestyle, and the spatial qualities that matter to you before any design decisions are made. Changes during the Understand and Shape phases are a natural part of the process. Once technical documentation has been produced and submitted for council approval, substantial changes become costly. We are transparent about those thresholds throughout.',
  },
  {
    q: 'What does the council submission and approval process involve, and how long does it take in Gauteng?',
    a: 'All building plans require submission to your local municipality for approval before construction can begin. In the Tshwane and Johannesburg Metro areas, approval timelines typically range from 6 to 16 weeks depending on project complexity, zoning, and municipal workload. We prepare and submit all required documentation, coordinate with structural and civil engineers where required, and manage the approval process on your behalf. Heritage overlays, estate guidelines, or special consent applications may add time, and we advise you of these upfront.',
  },
  {
    q: 'How do you approach materials selection, and how does this shape the design?',
    a: 'Materials are not chosen at the end of the design process. They are the design process. From the first conversation, we consider what the space should feel like to inhabit and work backward to find the materials that carry that feeling. Rammed earth for warmth and weight. Raw timber for grain and scale. Cast concrete for precision and silence. Every material earns its place, and every choice is explained so you understand exactly what you are agreeing to and why.',
  },
  {
    q: 'Do you work with clients outside of Pretoria, or on rural estate and lodge projects?',
    a: 'Yes. While based in Pretoria, Kata Studio works across Gauteng and takes on select rural estate, lifestyle property, and lodge projects across South Africa. Context-sensitive design is central to the practice. The landscape of each site is not a constraint to design around but a primary element to design with.',
  },
  {
    q: 'What is the typical timeline and investment range for a bespoke residential commission?',
    a: 'Bespoke residential projects typically span 12 to 24 months from initial conversation to construction completion, depending on project complexity, site conditions, and council approval timelines. Architectural fees for SACAP-registered services are typically calculated as a percentage of the construction cost, scaled by project scope and stage of involvement. We begin each commission with a structured conversation to understand your programme before discussing fees, so that we can give you a proposal that reflects your actual project rather than a generic estimate.',
  },
]

function FAQ() {
  const [open, setOpen] = useState(null)
  const reduced = useReducedMotion()

  return (
    <section className="relative bg-[#F7F5F2] py-28 md:py-40">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <FadeUp className="mb-14">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#C4805A] mb-4">
            Common Questions
          </p>
          <h2
            className="text-[#3D3A36] leading-[1.08]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 150 }}
          >
            What you might<br />want to know first.
          </h2>
        </FadeUp>

        <div className="divide-y divide-[#D4C9B8] max-w-3xl">
          {faqs.map((faq, i) => (
            <FadeUp key={i} delay={i * 0.04}>
              <div className="py-7">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-start justify-between gap-6 text-left min-h-[44px] group"
                  aria-expanded={open === i}
                >
                  <span
                    className="font-semibold text-[#3D3A36] leading-snug group-hover:text-[#C4805A] transition-colors duration-200"
                    style={{ fontSize: '1.0625rem' }}
                  >
                    {faq.q}
                  </span>
                  <span
                    className="text-[#C4805A] text-2xl leading-none flex-shrink-0 mt-0.5 select-none w-6 text-center"
                    aria-hidden="true"
                  >
                    {open === i ? 'âˆ’' : '+'}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="answer"
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p
                        className="pt-5 text-[#A8A29E] leading-[1.8] font-medium"
                        style={{ fontSize: '1rem' }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4C9B8]" />
    </section>
  )
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// FOOTER
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
function Footer() {
  return (
    <footer className="bg-[#3D3A36] text-[#F7F5F2]/75">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Brand with icon */}
          <div className="md:col-span-5">
            <img
              src={img("ks-logo-wh.webp")}
              alt="Kata Studio"
              className="w-auto mb-7"
              style={{ height: '100px' }}
            />
            <p className="text-sm text-[#F7F5F2]/55 leading-[1.75] max-w-xs mb-8 font-medium">
              Boutique architectural practice in Pretoria. Bespoke luxury residential architecture grounded in material craft and spatial intention.
            </p>
            <a
              href="https://www.instagram.com/katastudio.za/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#F7F5F2]/40 hover:text-[#C4805A] transition-colors"
            >
              Instagram: @katastudio.za
            </a>
          </div>

          {/* Address */}
          <div className="md:col-span-3">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#F7F5F2]/25 mb-5">Address</p>
            <address className="not-italic text-sm text-[#F7F5F2]/55 leading-[1.75] space-y-1 font-medium">
              <p>Pretoria (Tshwane)</p>
              <p>Gauteng, South Africa</p>
            </address>
          </div>

          {/* Nav */}
          <div className="md:col-span-2">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#F7F5F2]/25 mb-5">Navigate</p>
            <nav className="flex flex-col gap-3">
              {['Work', 'About', 'Process', 'Contact'].map(l => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className="text-sm text-[#F7F5F2]/55 hover:text-[#C4805A] transition-colors font-medium"
                >
                  {l}
                </a>
              ))}
            </nav>
          </div>

          {/* Registration */}
          <div className="md:col-span-2">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#F7F5F2]/25 mb-5">Registration</p>
            <p className="text-sm text-[#F7F5F2]/55 leading-relaxed font-medium">SACAP Registered Architects</p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#F7F5F2]/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[11px] text-[#F7F5F2]/25">
            &copy; {new Date().getFullYear()} Kata Studio. All rights reserved.
          </p>
          <p className="text-[11px] text-[#F7F5F2]/20">
            Bespoke architect Pretoria&nbsp;&middot;&nbsp;Luxury residential architect Gauteng
          </p>
        </div>
      </div>

      {/* Mandatory Flint and Fuel credit */}
      <div className="border-t border-[#F7F5F2]/10 py-4 text-center">
        <p className="text-[11px] text-[#F7F5F2]/22">
          Website design by{' '}
          <a
            href="https://flintandfuel.co.za"
            target="_blank"
            rel="noopener"
            className="underline hover:text-[#F7F5F2]/50 transition-colors"
          >
            Flint and Fuel Creative
          </a>
        </p>
      </div>
    </footer>
  )
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// ROOT
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
export default function App() {
  return (
    <div className="font-sans bg-[#F7F5F2] text-[#3D3A36] antialiased">
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <SelectedWork />
        <About />
        <MaterialWorld />
        <Process />
        <Testimonials />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

