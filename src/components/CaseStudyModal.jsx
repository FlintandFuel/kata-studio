/*
 * Case Study Modal — full-screen project detail overlay
 * ─────────────────────────────────────────────
 * Mounted permanently in App.jsx inside <AnimatePresence>; this
 * component itself decides whether to render based on `project`,
 * which is what lets AnimatePresence play the exit transition.
 */

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'

export default function CaseStudyModal({ project, onClose }) {
  const reduced = useReducedMotion()
  const scrollRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, startScroll: 0 })
  const [dragging, setDragging] = useState(false)

  // Lock body scroll while open, restore on close; close on Escape
  useEffect(() => {
    if (!project) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [project, onClose])

  if (!project) return null

  const handleMouseDown = (e) => {
    if (!scrollRef.current) return
    drag.current = {
      active: true,
      startX: e.pageX - scrollRef.current.offsetLeft,
      startScroll: scrollRef.current.scrollLeft,
    }
    setDragging(true)
  }
  const stopDrag = () => {
    drag.current.active = false
    setDragging(false)
  }
  const handleMouseMove = (e) => {
    if (!drag.current.active || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    scrollRef.current.scrollLeft = drag.current.startScroll - (x - drag.current.startX)
  }

  const strip = project.images.length >= 3 ? project.images : [...project.images, ...project.images]

  return (
    <motion.div
      key="case-study-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      className="fixed inset-0 z-[9999] bg-zinc-950/[0.96] backdrop-blur-md overflow-y-auto"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close case study"
        className="fixed top-4 right-4 md:top-6 md:right-6 z-10 flex items-center justify-center w-11 h-11 text-[#F7F5F2] hover:text-[#C4805A] transition-colors duration-200"
      >
        <X size={26} strokeWidth={1.5} />
      </button>

      <div
        className="relative max-w-[1180px] mx-auto px-6 md:px-10 pt-24 pb-20 md:pt-32 md:pb-28"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#C4805A] mb-6">
          {project.number} — {project.type}
        </p>
        <h2
          className="text-[#F7F5F2] leading-[1.05] mb-3"
          style={{ fontSize: 'clamp(3rem, 6vw, 4rem)', fontWeight: 150 }}
        >
          {project.title}
        </h2>
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#F7F5F2]/40 mb-14">
          {project.location}
        </p>

        {/* Directional hint — invites the horizontal drag/scroll interaction */}
        <div
          aria-hidden="true"
          className="flex items-center justify-end gap-2 mb-3 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#F7F5F2]/35"
        >
          <span>Scroll to explore</span>
          <motion.span
            className="flex"
            animate={reduced ? {} : { x: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowRight size={14} strokeWidth={1.5} />
          </motion.span>
        </div>

        {/* Horizontal scroll image strip */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          className={`flex gap-4 overflow-x-auto mb-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            dragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {strip.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${project.title} — view ${i + 1}`}
              draggable={false}
              className="h-[260px] md:h-[420px] w-auto flex-shrink-0 object-cover select-none"
            />
          ))}
        </div>

        {/* Description + specs */}
        <div className="max-w-[680px]">
          <p
            className="text-[#F7F5F2]/65 leading-[1.8] font-light mb-8"
            style={{ fontSize: '1.0625rem' }}
          >
            {project.description}
          </p>
          <div className="flex flex-wrap gap-3">
            {project.specs.map((spec) => (
              <span
                key={spec}
                className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#F7F5F2]/55 border border-[#F7F5F2]/20 rounded-full px-4 py-2"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-10 border-t border-[#F7F5F2]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-[#F7F5F2]/65 font-light" style={{ fontSize: '1.0625rem' }}>
            Interested in a similar project?
          </p>
          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex items-center min-h-[44px] text-[11px] font-bold tracking-[0.2em] uppercase px-7 py-3 border border-[#C4805A] text-[#C4805A] hover:bg-[#C4805A] hover:text-[#F7F5F2] transition-all duration-200"
          >
            Begin a Conversation
          </a>
        </div>
      </div>
    </motion.div>
  )
}
