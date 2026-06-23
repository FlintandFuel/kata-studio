import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'

const statusColors = {
  'Completed': 'border-[#C4805A] text-[#C4805A]',
  'In Progress': 'border-[#F7F5F2]/40 text-[#F7F5F2]/70',
  'Concept': 'border-[#F7F5F2]/25 text-[#F7F5F2]/50',
}

export default function CaseStudyModal({ project, onClose }) {
  const reduced = useReducedMotion()
  const scrollRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, startScroll: 0 })
  const [dragging, setDragging] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [imageCount, setImageCount] = useState(0)

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

  useEffect(() => {
    if (project) {
      setActiveIndex(0)
      setImageCount(project.images.length)
    }
  }, [project])

  const updateActiveFromScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el || !imageCount) return
    const children = el.children
    if (!children.length) return

    const scrollLeft = el.scrollLeft
    const containerWidth = el.clientWidth

    let closest = 0
    let closestDist = Infinity
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      const childCenter = child.offsetLeft + child.offsetWidth / 2
      const dist = Math.abs(childCenter - (scrollLeft + containerWidth / 2))
      if (dist < closestDist) {
        closestDist = dist
        closest = i
      }
    }
    setActiveIndex(Math.min(closest, imageCount - 1))
  }, [imageCount])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handler = () => updateActiveFromScroll()
    el.addEventListener('scroll', handler, { passive: true })
    return () => el.removeEventListener('scroll', handler)
  }, [updateActiveFromScroll])

  // Translate vertical wheel to horizontal scroll
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handler = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        el.scrollLeft += e.deltaY
      }
    }
    el.addEventListener('wheel', handler, { passive: false })
    return () => el.removeEventListener('wheel', handler)
  }, [project])

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

  const scrollToIndex = (index) => {
    const el = scrollRef.current
    if (!el) return
    const child = el.children[index]
    if (!child) return
    el.scrollTo({
      left: child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2,
      behavior: 'smooth',
    })
  }

  const images = project.images

  return (
    <motion.div
      key="case-study-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project`}
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
        aria-label="Close project"
        className="fixed top-4 right-4 md:top-6 md:right-6 z-10 flex items-center justify-center w-11 h-11 text-[#F7F5F2] hover:text-[#C4805A] transition-colors duration-200"
      >
        <X size={26} strokeWidth={1.5} />
      </button>

      <div
        className="relative max-w-[1180px] mx-auto px-6 md:px-10 pt-24 pb-20 md:pt-32 md:pb-28"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-6">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#C4805A]">
            {project.number} &mdash; {project.type}
          </p>
          {project.status && (
            <span className={`text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 border ${statusColors[project.status] || 'border-[#F7F5F2]/25 text-[#F7F5F2]/50'}`}>
              {project.status}
            </span>
          )}
        </div>

        <h2
          className="text-[#F7F5F2] leading-[1.05] mb-3"
          style={{ fontSize: 'clamp(3rem, 6vw, 4rem)', fontWeight: 150 }}
        >
          {project.title}
        </h2>
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#F7F5F2]/40 mb-14">
          {project.location}
        </p>

        {/* Directional hint */}
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </motion.span>
        </div>

        {/* Image gallery */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          className={`flex gap-4 overflow-x-auto mb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth ${
            dragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${project.title} - view ${i + 1}`}
              draggable={false}
              className="h-[260px] md:h-[420px] w-auto flex-shrink-0 object-cover select-none"
            />
          ))}
        </div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-2 mb-16">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-6 h-2 bg-[#C4805A]'
                  : 'w-2 h-2 bg-[#F7F5F2]/25 hover:bg-[#F7F5F2]/40'
              }`}
            />
          ))}
        </div>

        {/* Description + specs */}
        <div className="max-w-[720px]">
          <p
            className="text-[#F7F5F2]/65 leading-[1.8] font-light mb-8"
            style={{ fontSize: '1.0625rem' }}
          >
            {project.description}
          </p>

          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-5 mb-10">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#F7F5F2]/40">
                Highlights
              </p>
              {project.highlights.map((h, i) => (
                <p key={i} className="text-[#F7F5F2]/55 leading-[1.8] font-light text-sm pl-4 border-l border-[#F7F5F2]/15">
                  {h}
                </p>
              ))}
            </div>
          )}

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
