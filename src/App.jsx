import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import * as VantaNetModule from 'vanta/dist/vanta.net.min'

const NET = VantaNetModule?.default?.default || VantaNetModule?.default || VantaNetModule
import Projects from './components/Projects'
import CaseStudyModal from './components/CaseStudyModal'
import './index.css'

const img = (filename) => `${import.meta.env.BASE_URL}images/${filename}`

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

function SectionLabel({ number, label, dark = false }) {
  const tint = dark ? 'text-[#D99B79]' : 'text-[#C4805A]'
  return (
    <p className={`flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase ${tint} mb-8 select-none`}>
      <span>{number}</span>
      <span className={`w-6 h-px inline-block ${dark ? 'bg-[#D99B79]' : 'bg-[#C4805A]'}`} />
      {label}
    </p>
  )
}

// =====================================================================
// NAV
// =====================================================================
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
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
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
          <a href="#hero" aria-label="Kata Studio home" className="flex items-center">
            <img
              src={img("ks_logo.webp")}
              alt="Kata Studio"
              className="w-auto"
              style={{ height: '100px' }}
            />
          </a>

          <div className="hidden min-[1100px]:flex items-center gap-7">
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

          <button
            className="min-[1100px]:hidden flex flex-col gap-[5px] p-2 min-h-[44px] min-w-[44px] items-center justify-center"
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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[60] bg-[#3D3A36] flex flex-col px-8 pt-10 pb-12"
          >
            {/* Close button */}
            <div className="flex justify-end mb-12">
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex items-center justify-center w-11 h-11 min-h-[44px] min-w-[44px]"
              >
                <span className="block w-7 h-px bg-[#F7F5F2] rotate-45 absolute" />
                <span className="block w-7 h-px bg-[#F7F5F2] -rotate-45 absolute" />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  initial={reduced ? false : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.38 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-[2.5rem] text-[#F7F5F2]/90 hover:text-[#C4805A] transition-colors tracking-wide min-h-[44px] flex items-center"
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
                Based in Pretoria, working across South Africa
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// =====================================================================
// 01 HERO
// =====================================================================
function Hero() {
  const reduced = useReducedMotion()
  const vantaRef = useRef(null)
  const vantaEffect = useRef(null)

  useEffect(() => {
    if (reduced || !vantaRef.current || vantaEffect.current) return
    vantaEffect.current = NET({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: false,
      gyroControls: false,
      color: 0xd4c9b8,
      backgroundColor: 0xf7f5f2,
      maxDistance: 18.0,
      spacing: 20.0,
      points: 9,
    })
    return () => {
      vantaEffect.current?.destroy()
      vantaEffect.current = null
    }
  }, [reduced])

  return (
    <section id="hero" style={{ marginTop: '120px' }}>
      <div ref={vantaRef} className="relative bg-[#F7F5F2] overflow-hidden">
        <HatchTexture />
        <div className="relative z-10 max-w-[1180px] mx-auto px-6 md:px-10 py-20 md:py-28 text-center">

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#C4805A] mb-8"
          >
            kata&nbsp;&nbsp;/&nbsp;&nbsp;
            <span className="text-[#A8A29E] font-medium normal-case tracking-normal">
              to mould or shape
            </span>
          </motion.p>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#3D3A36] leading-[1.0] mb-8 mx-auto"
            style={{ fontSize: 'clamp(2.75rem, 6vw, 6rem)', fontWeight: 150, maxWidth: '20ch' }}
          >
            Pursuing simplicity.{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 150 }}>Beautiful</em>{' '}
            craftsmanship.
          </motion.h1>

          <motion.div
            initial={reduced ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.65, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-14 h-px bg-[#C4805A] mx-auto mb-8 origin-center"
          />

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-[#57534E] font-light leading-[1.7] mx-auto mb-12"
            style={{ fontSize: '1.0625rem', maxWidth: '46ch' }}
          >
            Architectural design rooted in material craft and spatial intention. Based in Pretoria, working across South Africa.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.12 }}
            className="flex flex-wrap gap-5 items-center justify-center"
          >
            <a
              href="#contact"
              className="inline-flex items-center min-h-[44px] text-[11px] font-bold tracking-[0.2em] uppercase px-7 py-3 border border-[#C4805A] text-[#C4805A] hover:bg-[#C4805A] hover:text-[#F7F5F2] transition-all duration-200"
            >
              Begin a Conversation
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 min-h-[44px] text-[11px] font-semibold tracking-[0.18em] uppercase text-[#A8A29E] hover:text-[#3D3A36] transition-colors duration-200"
            >
              View Featured Work
              <span className="w-5 h-px bg-current" />
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full aspect-[4/3] md:aspect-[16/7] overflow-hidden"
      >
        <img
          src={img("hero-sketch.webp")}
          alt="Kata Studio - architectural concept sketch"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
      </motion.div>

      <div className="h-px bg-[#D4C9B8]" />
    </section>
  )
}

// =====================================================================
// 02 PHILOSOPHY
// =====================================================================
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
                style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3.5rem)', fontWeight: 150 }}
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
                'Our practice is built on the core belief that architecture is an art form with the power to mould and shape the world we inhabit. We are passionate about creating spaces that not only captivate the senses but also reflect the unique aspirations and desires of our clients.',
                'We are committed to crafting extraordinary structures that harmonize seamlessly with their surroundings while pushing the boundaries of innovation. Every space we create reflects our unwavering commitment to the highest standards of quality and meticulous attention to detail.',
                'We celebrate the timeless beauty and authenticity of handcrafted design, always striving to seamlessly blend traditional craftsmanship techniques with innovative design concepts. Our approach is rooted in a profound respect for the interplay between form and function.',
                'We draw inspiration from materials, each offering a unique aesthetic language that can convey emotions, tell stories, and provoke thought. It is through this deep engagement with materials that we transform ideas into tangible creations that engage and resonate on a visceral level.',
              ].map((para, i) => (
                <motion.p
                  key={i}
                  variants={fadeUp}
                  className="text-[#57534E] leading-[1.8] font-light"
                  style={{ fontSize: '1.0625rem' }}
                >
                  {para}
                </motion.p>
              ))}
              <motion.p
                variants={fadeUp}
                className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#C4805A] pt-2"
              >
                SACAP Registered&nbsp;&nbsp;&middot;&nbsp;&nbsp;Senior Architectural Technologist&nbsp;&nbsp;&middot;&nbsp;&nbsp;Pretoria, Gauteng
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#D4C9B8]" />
    </section>
  )
}

// =====================================================================
// 03 ABOUT
// =====================================================================
function About() {
  return (
    <section id="about" className="relative bg-[#F7F5F2] py-28 md:py-40">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <FadeUp className="lg:col-span-5 flex justify-start lg:justify-end">
            <img
              src={img("profile-pic.webp")}
              alt="Arne Gunter, Kata Studio founder"
              className="h-auto block"
              style={{ width: '200px', maxWidth: '100%' }}
            />
          </FadeUp>

          <div className="lg:col-span-7">
            <FadeUp>
              <SectionLabel number="03" label="About" />
              <h2
                className="text-[#3D3A36] leading-[1.08] mb-8"
                style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3.5rem)', fontWeight: 150 }}
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
                'Kata Studio is a boutique architectural design practice based in Pretoria, founded by Arne Gunter. The name comes from the Japanese: to mould or shape. It describes exactly how we approach every commission.',
                'Originally from Richards Bay and a Tshwane University of Technology graduate, Arne has built up an impressive portfolio spanning over a decade at Earthworld Architects (2012 to 2023), working across institutional, commercial, recreational, industrial, and residential projects both locally and internationally.',
                'He has a deep appreciation for detail and craftsmanship, visible in his knowledge and use of materiality across every project. His passion for timber construction has led to the development of various timber building systems that incorporate a unique approach to modular and systemic thinking, positioning him at the forefront of the craft.',
                'While based in Pretoria, the practice works across Gauteng and takes on select projects throughout South Africa. Whether a private residence, a rural farmstead, a commercial facility, or a specialized timber structure, the same design philosophy applies: precision, craft, and intention.',
              ].map((para, i) => (
                <motion.p
                  key={i}
                  variants={fadeUp}
                  className="text-[#57534E] leading-[1.8] font-light"
                  style={{ fontSize: '1.0625rem' }}
                >
                  {para}
                </motion.p>
              ))}

              <motion.blockquote
                variants={fadeUp}
                className="border-l-2 border-[#C4805A] pl-6 py-2 mt-4"
              >
                <p className="text-[#57534E] leading-[1.8] font-light italic" style={{ fontSize: '1.0625rem' }}>
                  "The Japanese culture has always intrigued me - the simplicity in their ways, attention to detail and the precision in execution. Their culture portrays community and collaboration in every aspect of life, and this is what shapes our future."
                </p>
                <cite className="block mt-3 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#C4805A] not-italic">
                  Arne Gunter, Founder
                </cite>
              </motion.blockquote>

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

// =====================================================================
// 04 SERVICES
// =====================================================================
const services = [
  { title: 'Conceptual Design', body: 'From first conversation to spatial concept. We listen to how you want to live and translate that into architectural form, material language, and spatial intent.' },
  { title: 'Technical Design & Detail', body: 'Every junction, every threshold, every material connection drawn with precision. The design intent carries through to the smallest detail.' },
  { title: 'Council Submissions', body: 'Full preparation and management of council drawing submissions, coordinating with structural and civil engineers, and navigating the municipal approval process on your behalf.' },
  { title: 'Construction Documentation', body: 'Comprehensive construction drawings and specifications that ensure your builder prices and builds exactly what was designed. No ambiguity, no interpretation.' },
  { title: 'Site Management', body: 'On-site oversight throughout construction. We review progress, certify payment claims, and ensure the build matches the approved design at every stage.' },
  { title: 'Timber Design & Construction', body: 'Specialist consulting in timber building systems: modular design, technical detailing, assembly drawings, and site implementation planning. A unique approach to systemic timber construction.' },
]

function Services() {
  return (
    <section id="services" className="relative bg-[#F7F5F2] py-28 md:py-40">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10">
        <FadeUp className="mb-16 md:mb-24">
          <SectionLabel number="04" label="Services" />
          <h2
            className="text-[#3D3A36] leading-[1.08] mb-6"
            style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3.5rem)', fontWeight: 150 }}
          >
            What we deliver.
          </h2>
          <p
            className="text-[#57534E] leading-[1.8] font-light max-w-2xl"
            style={{ fontSize: '1.0625rem' }}
          >
            Each project we undertake is an opportunity to showcase our dedication to craftsmanship, delivering spaces that evoke emotions, inspire awe, and stand as testaments to our unwavering pursuit of excellence.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#D4C9B8]">
          {services.map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.07}>
              <div className="bg-[#F7F5F2] p-8 md:p-10 h-full">
                <h3 className="group relative inline-block text-sm font-bold tracking-wider text-[#3D3A36] uppercase mb-4">
                  {s.title}
                  <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-[#C4805A] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </h3>
                <p className="text-[#57534E] leading-[1.8] font-light" style={{ fontSize: '0.9375rem' }}>
                  {s.body}
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

// =====================================================================
// 05 PROCESS
// =====================================================================
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
          <SectionLabel number="05" label="Process" />
          <h2
            className="text-[#3D3A36] leading-[1.08]"
            style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3.5rem)', fontWeight: 150 }}
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
                <h3 className="group relative inline-block text-base font-bold tracking-wider text-[#3D3A36] uppercase mb-5">
                  {step.title}
                  <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-[#C4805A] transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </h3>
                <p className="text-[#57534E] leading-[1.8] font-light" style={{ fontSize: '1rem' }}>
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

// =====================================================================
// 06 CONTACT / COMMISSION
// =====================================================================
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleEnquiry = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClass =
    'w-full bg-transparent border border-[#F7F5F2]/20 px-4 py-3 text-[#F7F5F2] text-sm placeholder:text-[#F7F5F2]/35 focus:outline-none focus:border-[#C4805A] transition-colors duration-200 min-h-[44px] font-light'

  const labelClass =
    'block text-[11px] font-semibold tracking-[0.2em] uppercase text-[#F7F5F2]/50 mb-2'

  return (
    <section id="contact" className="relative bg-[#3D3A36] py-28 md:py-40" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 94%, 0 100%)' }}>
      <div className="max-w-[1180px] mx-auto px-6 md:px-10 pb-12">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <FadeUp>
              <SectionLabel number="06" label="Commission" dark />
              <h2
                className="text-[#F7F5F2] leading-[1.08] mb-8"
                style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3.5rem)', fontWeight: 150 }}
              >
                Every space begins<br />with a conversation.
              </h2>
              <p
                className="text-[#F7F5F2]/65 leading-[1.8] mb-10 font-light"
                style={{ fontSize: '1.0625rem' }}
              >
                Whether you are planning a new home, a significant renovation, a commercial project, or a specialized timber structure, share a little of what you have in mind. We will take it from there.
              </p>
              <address className="not-italic space-y-4 text-sm">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#F7F5F2] mb-1">Studio</p>
                  <p className="text-[#F7F5F2]/65 font-light">Based in Pretoria (Tshwane), Gauteng</p>
                  <p className="text-[#F7F5F2]/45 font-light text-xs mt-1">Working across South Africa</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#F7F5F2] mb-1">Instagram</p>
                  <a
                    href="https://www.instagram.com/katastudio.za/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F7F5F2]/65 font-light hover:text-[#C4805A] transition-colors"
                  >
                    @katastudio.za
                  </a>
                </div>
              </address>
            </FadeUp>
          </div>

          <div className="lg:col-span-7">
            <FadeUp delay={0.1}>
              {submitted ? (
                <div className="border border-[#F7F5F2]/20 p-12 text-center">
                  <div className="w-8 h-px bg-[#C4805A] mx-auto mb-6" />
                  <p className="font-semibold text-[#F7F5F2] text-lg mb-3">Thank you.</p>
                  <p className="text-[#F7F5F2]/65 text-sm leading-relaxed max-w-xs mx-auto font-light">
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
                      placeholder="What are you building? Where is the site? What should the space feel like?"
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-6">
                    <button
                      type="submit"
                      className="inline-flex items-center min-h-[44px] text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-3 border border-[#C4805A] text-[#C4805A] hover:bg-[#C4805A] hover:text-[#F7F5F2] transition-all duration-200"
                    >
                      Begin a Conversation
                    </button>
                    <p className="text-[11px] text-[#F7F5F2]/40 leading-relaxed">
                      Your information is used only to respond to your enquiry.
                    </p>
                  </div>
                </form>
              )}
            </FadeUp>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#F7F5F2]/10" />
    </section>
  )
}

// =====================================================================
// FAQ
// =====================================================================
const faqs = [
  {
    q: 'What does the design process look like from first conversation to final build?',
    a: 'The process moves through three stages: Understand, Shape, and Build. It begins with a deep listening conversation about how you want to live in and use the space. Concept develops through material studies and spatial drawings before moving into technical documentation and construction. Throughout, the design intent drives every decision from structural form to material selection.',
  },
  {
    q: 'How do you prevent budget overruns, and who is responsible for cost control during the project?',
    a: 'Budget integrity starts with the brief. We work with you to define a realistic project budget before any design begins, and every material and spatial decision is made with that budget in mind. During construction, we issue detailed technical drawings and specifications so that your builder prices and builds exactly what was designed. We flag any deviations early. Our role is to protect the design and your investment simultaneously.',
  },
  {
    q: 'Do I appoint my own builder, or does Kata Studio manage the construction process?',
    a: 'You appoint your own registered builder. Our role during construction is as the principal agent: we issue drawings, review progress, certify payment claims, and ensure the build matches the approved design. We can recommend experienced contractors who have delivered projects to the standard this work demands, but the contract remains directly between you and your builder.',
  },
  {
    q: 'How much creative input do I have, and at what stage can I still change the design?',
    a: 'Your input is central from the very first conversation. The Understand phase is specifically designed to capture your vision, your lifestyle, and the spatial qualities that matter to you before any design decisions are made. Changes during the Understand and Shape phases are a natural part of the process. Once technical documentation has been produced and submitted for council approval, substantial changes become costly. We are transparent about those thresholds throughout.',
  },
  {
    q: 'What does the council submission and approval process involve?',
    a: 'All building plans require submission to your local municipality for approval before construction can begin. In the Tshwane and Johannesburg Metro areas, approval timelines typically range from 6 to 16 weeks depending on project complexity, zoning, and municipal workload. We prepare and submit all required documentation, coordinate with structural and civil engineers where required, and manage the approval process on your behalf.',
  },
  {
    q: 'Do you work on projects outside of Pretoria?',
    a: 'Yes. While based in Pretoria, Kata Studio works across Gauteng and takes on select projects throughout South Africa. Our portfolio spans residential, commercial, institutional, and specialized timber projects. Context-sensitive design is central to the practice - the landscape and conditions of each site are not constraints to design around but primary elements to design with.',
  },
  {
    q: 'What types of projects does Kata Studio take on?',
    a: 'Our experience spans residential homes, rural farmsteads, commercial facilities, institutional buildings, and specialized timber construction. Whether it is a new build, an alteration and addition to an existing structure, or a modular timber project, we bring the same commitment to craft and spatial intention. The founder has contributed to projects ranging from university campuses and eco-offices to warehouses and sports facilities.',
  },
  {
    q: 'What is timber design and construction, and how does Kata Studio specialize in it?',
    a: 'Timber design and construction is a specialist discipline within architectural practice. We consult on timber building systems from conceptualization through to site execution, including modular design, technical detailing, and assembly drawings. This expertise allows us to deliver timber structures that are engineered with precision and assembled with craft - from small residential elements to full timber building systems.',
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
            style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3.5rem)', fontWeight: 150 }}
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
                    {open === i ? '-' : '+'}
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
                        className="pt-5 text-[#57534E] leading-[1.8] font-light"
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

// =====================================================================
// FOOTER
// =====================================================================
function Footer() {
  return (
    <footer className="bg-[#3D3A36] text-[#F7F5F2]/75">
      <div className="max-w-[1180px] mx-auto px-6 md:px-10 pt-20 md:pt-28 pb-6 md:pb-8">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-3">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#F7F5F2]/25 mb-5">Studio</p>
            <address className="not-italic text-sm text-[#F7F5F2]/55 leading-[1.75] space-y-1 font-medium">
              <p>Based in Pretoria (Tshwane)</p>
              <p>Gauteng, South Africa</p>
              <p className="text-[#F7F5F2]/35 text-xs pt-1">Working across South Africa</p>
            </address>
          </div>

          <div className="md:col-span-2">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#F7F5F2]/25 mb-5">Navigate</p>
            <nav className="flex flex-col gap-3">
              {['Projects', 'About', 'Services', 'Process', 'Contact'].map(l => (
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

          <div className="md:col-span-2">
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#F7F5F2]/25 mb-5">Registration</p>
            <p className="text-sm text-[#F7F5F2]/55 leading-relaxed font-medium">SACAP Registered</p>
            <p className="text-sm text-[#F7F5F2]/55 leading-relaxed font-medium">Senior Architectural Technologist</p>
            <p className="text-xs text-[#F7F5F2]/35 leading-relaxed font-medium mt-1">BT50879</p>
          </div>

          <div className="md:col-span-5 md:flex md:flex-col md:items-end md:text-right">
            <img
              src={img("ks-logo-wh.webp")}
              alt="Kata Studio"
              className="h-10 w-auto mb-7 select-none"
            />
            <p className="text-sm text-[#F7F5F2]/55 leading-[1.75] max-w-xs mb-8 font-medium">
              Boutique architectural design practice in Pretoria. Crafting extraordinary spaces grounded in material craft and spatial intention.
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
        </div>

        <div className="mt-16 pt-6 border-t border-[#F7F5F2]/10">
          <p className="text-[11px] text-[#F7F5F2]/25 leading-relaxed text-center md:text-left">
            &copy; {new Date().getFullYear()} Kata Studio. All rights reserved.
            <span className="mx-2 text-[#F7F5F2]/15">&middot;</span>
            Architectural design Pretoria&nbsp;&middot;&nbsp;Timber construction specialist&nbsp;&middot;&nbsp;Working across South Africa
            <span className="mx-2 text-[#F7F5F2]/15">&middot;</span>
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
      </div>
    </footer>
  )
}

// =====================================================================
// ROOT
// =====================================================================
export default function App() {
  const [activeProject, setActiveProject] = useState(null)

  return (
    <div className="font-sans bg-[#F7F5F2] text-[#3D3A36] antialiased">
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <Projects onOpen={setActiveProject} />
        <About />
        <Services />
        <Process />
        <Contact />
        <FAQ />
      </main>
      <Footer />
      <AnimatePresence>
        {activeProject && (
          <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
