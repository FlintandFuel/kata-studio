import { useState, useEffect, useRef } from 'react'

// Returns the timestamp for the next Friday at 23:59:59 local time.
// If today is Saturday the target becomes the Friday of next week.
function getNextFridayEnd() {
  const now = new Date()
  const day = now.getDay() // 0=Sun … 5=Fri 6=Sat
  const daysUntilFriday = day === 6 ? 6 : (5 - day + 7) % 7
  const target = new Date(now)
  target.setDate(now.getDate() + daysUntilFriday)
  target.setHours(23, 59, 59, 999)
  return target.getTime()
}

function pad(n) {
  return String(n).padStart(2, '0')
}

function useCountdown(targetMs) {
  const [diff, setDiff] = useState(() => Math.max(0, targetMs - Date.now()))

  useEffect(() => {
    const id = setInterval(() => {
      setDiff(Math.max(0, targetMs - Date.now()))
    }, 1000)
    return () => clearInterval(id)
  }, [targetMs])

  const s = Math.floor(diff / 1000)
  return {
    days:    Math.floor(s / 86400),
    hours:   Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

function CountUnit({ value, label }) {
  return (
    <div className="flex items-end gap-[3px]">
      <span className="font-mono font-bold text-sm tabular-nums bg-white/10 rounded px-1.5 py-0.5 min-w-[28px] text-center leading-tight">
        {pad(value)}
      </span>
      <span className="text-[10px] text-white/40 mb-0.5">{label}</span>
    </div>
  )
}

// Add  className="pb-[72px]"  (or similar) to your <body> / root wrapper
// so the fixed bar does not overlap page footer content.
export default function SalesBar() {
  const [visible, setVisible] = useState(true)
  const targetMs = useRef(getNextFridayEnd()).current
  const { days, hours, minutes, seconds } = useCountdown(targetMs)

  if (!visible) return null

  return (
    <div
      role="complementary"
      aria-label="Special offer"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#3D3A36] text-white shadow-[0_-2px_16px_rgba(0,0,0,0.25)]"
    >
      <div className="max-w-[1180px] mx-auto px-4 md:px-8">

        {/* ── Main bar ── */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-x-6 gap-y-2 py-3">

          {/* Badge + pricing */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 min-w-0">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-white text-[10px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" aria-hidden="true" />
              This site is ready for you
            </span>

            <div className="flex items-baseline gap-1.5 shrink-0">
              <span className="text-white/40 text-sm line-through">R7 500</span>
              <span className="text-white text-lg font-bold leading-none">R5 000</span>
            </div>

            <span className="text-white/50 text-[12px] hidden sm:inline whitespace-nowrap">
              Live within 24 hours of payment
            </span>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-white/40 text-[11px] uppercase tracking-widest mr-1 hidden xs:inline">
              Ends
            </span>
            <CountUnit value={days}    label="d" />
            <span className="text-white/30 text-sm font-light">:</span>
            <CountUnit value={hours}   label="h" />
            <span className="text-white/30 text-sm font-light">:</span>
            <CountUnit value={minutes} label="m" />
            <span className="text-white/30 text-sm font-light">:</span>
            <CountUnit value={seconds} label="s" />
          </div>

          {/* CTA + dismiss */}
          <div className="flex items-center gap-2 shrink-0 ml-auto md:ml-0">
            <a
              href="YOUR_PAYMENT_LINK_HERE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[40px] text-[11px] font-bold tracking-[0.16em] uppercase px-5 py-2 bg-[#C4805A] text-white hover:bg-[#b3704d] active:bg-[#a06245] transition-colors duration-150 whitespace-nowrap rounded-sm"
            >
              Claim This Site
            </a>

            <button
              onClick={() => setVisible(false)}
              aria-label="Dismiss offer bar"
              className="flex items-center justify-center min-h-[40px] min-w-[40px] text-white/40 hover:text-white/80 transition-colors duration-150"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" fill="none" aria-hidden="true">
                <path d="M1 1l10 10M11 1L1 11"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile-only: secondary note */}
        <p className="sm:hidden text-center text-white/40 text-[11px] pb-2 -mt-1">
          Live within 24 hours of payment
        </p>

      </div>
    </div>
  )
}
