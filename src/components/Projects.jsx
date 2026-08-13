import { motion, useReducedMotion } from 'framer-motion'

const img = (filename) => `${import.meta.env.BASE_URL}images/${filename}`

const projects = [
  {
    number: '01',
    title: 'House Van der Pol',
    location: 'Nautilus Bay, Western Cape',
    status: 'Completed',
    type: 'Residential',
    description:
      'Nestled in the pristine coastal landscape of Nautilus Bay, House Van der Pol is a striking contemporary family home designed to exist in perfect harmony with its raw, natural surroundings. Perched above the coastline, the architecture thoughtfully frames panoramic, unobstructed views of the ocean and the sweeping native fynbos.',
    highlights: [
      'Seamless Indoor-Outdoor Living: An expansive deck and a natural, integrated eco-pool blur the boundary between the built environment and the rugged landscape outside. Large charcoal-framed folding glass doors open the entire living pavilion to the sea breeze.',
      'Volumetric Warmth: Inside, the home features a dramatic, double-volume open-plan living space beneath a soaring pitched ceiling. Exposed timber rafters juxtapose beautifully with a rugged, board-marked concrete ring beam and a monumental facebrick hearth.',
      'Material Integrity: The deliberate palette of warm timber, natural clay brick, off-shutter concrete, and glass creates an atmosphere that is simultaneously grand and intimate, making the expansive spaces feel profoundly open yet deeply warm and inviting.',
    ],
    teaser: 'A striking contemporary coastal home in perfect harmony with its raw, natural surroundings.',
    specs: ['Material: Timber, Clay Brick, Concrete', 'Location: Nautilus Bay', 'Status: Completed 2019'],
    heroImage: img('vdp-exterior-01.webp'),
    images: [
      img('vdp-12.webp'),
      img('vdp-exterior-01.webp'),
      img('vdp-interior-01.webp'),
      img('vdp-02.webp'),
      img('vdp-drive.webp'),
      img('vdp-front.webp'),
      img('vdp-garage.webp'),
      img('vdp-interior-02.webp'),
      img('vdp-05.webp'),
      img('vdp-06.webp'),
      img('vdp-07.webp'),
      img('vdp-08.webp'),
      img('vdp-09.webp'),
      img('vdp-10.webp'),
      img('vdp-11.webp'),
    ],
    alt: 'House Van der Pol - Nautilus Bay coastal residence by Kata Studio',
  },
  {
    number: '02',
    title: 'House Harrington',
    location: 'Nautilus Bay, Garden Route',
    status: 'In Progress',
    type: 'Residential',
    description:
      'Nestled within the pristine fynbos of the Nautilus Bay Coastal Nature Reserve, this contemporary residential home redefines comfortable family living by harmonizing sophisticated modern architecture with the wild beauty of the Garden Route. Designed to gracefully accommodate a slower pace of life, the home prioritizes seamless transitions, open-plan warmth, and single-level accessibility where it matters most.',
    highlights: [
      'Taking Advantage of Views: Strategically positioned on a sweeping coastal ridge, the home features expansive, floor-to-ceiling glass facades that frame uninterrupted panoramas of the ocean and the surrounding dunes.',
      'Materials Complementing Surroundings: Adhering beautifully to the eco-estate\'s earthy palette, the design pairs robust, textured masonry with warm, natural timber construction. Internally, the exposed timber rafters, slatted acoustic wall features, and raw concrete finishes mirror the organic textures of the rugged South African coastline.',
      'Comfy Living and Volumetric Light: The primary living area features a striking, high-pitched volume that maximizes natural daylight through strategically placed skylights. A cozy, integrated fireplace grounds the lounge, while a spacious loft area above offers a quiet, sun-drenched library and viewing deck.',
    ],
    teaser: 'Contemporary coastal living harmonized with the wild beauty of the Garden Route.',
    specs: ['Material: Masonry, Timber, Concrete', 'Location: Nautilus Bay', 'Status: In Progress'],
    heroImage: img('HH__Exterior Aerial 01.webp'),
    images: [
      img('HH__Exterior Aerial 01.webp'),
      img('HH__Exterior 01.webp'),
      img('HH__Exterior 04.webp'),
      img('HH__Interior 05.webp'),
      img('HH__Interior 10.webp'),
      img('HH__Night View 03.webp'),
      img('HH__Night View 05.webp'),
      img('HH__Night View 07.webp'),
      img('hh-sketch.webp'),
    ],
    alt: 'House Harrington - Nautilus Bay coastal residence by Kata Studio',
  },
  {
    number: '03',
    title: 'The Klipkop Farmstead',
    location: 'Bronkhorstspruit, Gauteng',
    status: 'Concept',
    type: 'Alterations & Additions',
    description:
      'Nestled within the sweeping farmlands of Klipkop, Bronkhorstspruit, this exceptional farmstead beautifully captures the essence of a modern rural lifestyle. Rather than an entirely new build, the project breathes new life into the landscape through extensive alterations and additions to an existing house, masterfully transforming the original structure into a striking, unified home. Designed with a simplistic yet sophisticated architectural silhouette, the residence reimagines the traditional homestead through a clean, contemporary farmstyle lens.',
    highlights: [
      'An Evolved Layout: The thoughtful additions expand the home\'s footprint to perfectly balance utility and leisure, integrating an expansive new glasshouse and specialized outdoor entertainment areas while respecting the bones of the original structure.',
      'Robust and Natural Materials: The exterior palette seamlessly anchors the new and old elements to the highveld surroundings, utilizing rugged, hand-packed stone feature walls, raw plaster, and a striking red corrugated iron roof. Inside, exposed timber rafters and rich earth-toned walls bring those organic textures indoors.',
      'True Farm Lifestyle: A prominent elevated dual water-tank tower, a massive integrated timber-framed glasshouse for year-round cultivation, and a sunken outdoor boma designed for starlit fireside gathering.',
      'Seamless Indoor-Outdoor Living: Large glass folding doors effortlessly dissolve the boundaries between a spacious, open-plan living pavilion with a central pizza oven and wood-burning fireplace, and a sleek lap pool outside.',
    ],
    teaser: 'A transformed farmstead offering understated, practical sanctuary for modern countryside living.',
    specs: ['Material: Stone, Raw Plaster, Timber', 'Location: Bronkhorstspruit', 'Status: Concept'],
    heroImage: img('klipkop-00.webp'),
    images: [
      img('klipkop-00.webp'),
      img('klipkop-01.webp'),
      img('klipkop-02.webp'),
      img('klipkop-03.webp'),
      img('klipkop-04.webp'),
      img('klipkop-05.webp'),
      img('klipkop-06.webp'),
      img('klipkop-07.webp'),
      img('klipkop-08.webp'),
      img('klipkop-10.webp'),
      img('klipkop-11.webp'),
      img('klipkop-siteplan.webp'),
    ],
    alt: 'The Klipkop Farmstead - Bronkhorstspruit contemporary farmstyle by Kata Studio',
  },
  {
    number: '04',
    title: 'Nautilus Bay Storage',
    location: 'Nautilus Bay, Western Cape',
    status: 'Concept',
    type: 'Commercial',
    description:
      'Exclusively for estate residents, these premium storage units in Nautilus Bay are thoughtfully designed to help residents maximize usage of their property by providing a secure, dedicated space for extra belongings, vehicles, or outdoor gear. The units feature a minimalist architectural design finished in muted, natural colours, ensuring they seamlessly blend into the coastal estate aesthetics and surrounding landscape. Strategically positioned for ultimate convenience, they are easily accessible right from the main entrance gate.',
    highlights: [],
    teaser: 'Premium storage units with minimalist design, blending seamlessly into the coastal estate.',
    specs: ['Material: Minimalist Palette', 'Location: Nautilus Bay', 'Status: Concept'],
    heroImage: img('nautilus-storage-01.webp'),
    images: [
      img('nautilus-storage-01.webp'),
      img('nautilus-storage-02.webp'),
      img('nautilus-storage-03.webp'),
    ],
    alt: 'Nautilus Bay Storage - minimalist estate storage by Kata Studio',
  },
]

const statusColors = {
  'Completed': 'bg-[#C4805A]/15 text-[#C4805A]',
  'In Progress': 'bg-[#3D3A36]/10 text-[#3D3A36]',
  'Concept': 'bg-[#D4C9B8]/40 text-[#A8A29E]',
}

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
            Featured Projects
          </p>
          <h2
            className="text-[#3D3A36] leading-[1.08] mb-6"
            style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3.5rem)', fontWeight: 150 }}
          >
            Each project, given<br />room to breathe.
          </h2>
          <p
            className="text-[#57534E] leading-[1.8] font-light"
            style={{ fontSize: '1.0625rem' }}
          >
            From completed builds to concepts taking shape. Each one a different brief, a different site, a different set of materials. The same design intent.
          </p>
        </motion.div>

        {/* First two projects - larger cards */}
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-16 md:gap-x-12 mb-16 md:mb-24">
          {projects.slice(0, 2).map((p, i) => (
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
                aria-label={`View project: ${p.title}`}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={p.heroImage}
                    alt={p.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>

                <div className="flex items-center gap-3 mt-6 mb-3">
                  <span className={`text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 ${statusColors[p.status]}`}>
                    {p.status}
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
                  View project&nbsp;&rarr;
                </span>
              </button>
            </motion.article>
          ))}
        </div>

        {/* Bottom two projects - smaller row */}
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-16 md:gap-x-12">
          {projects.slice(2).map((p, i) => (
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
                aria-label={`View project: ${p.title}`}
              >
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={p.heroImage}
                    alt={p.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>

                <div className="flex items-center gap-3 mt-6 mb-3">
                  <span className={`text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 ${statusColors[p.status]}`}>
                    {p.status}
                  </span>
                  <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#A8A29E]">
                    {p.type}
                  </span>
                </div>

                <h3 className="text-[#3D3A36] mb-2" style={{ fontSize: '1.25rem', fontWeight: 500 }}>
                  {p.title}
                </h3>
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#A8A29E]/70 mb-4">
                  {p.location}
                </p>
                <p className="text-sm text-[#A8A29E] leading-relaxed font-medium mb-5">
                  {p.teaser}
                </p>

                <span className="inline-flex items-center text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C4805A] underline decoration-transparent hover:decoration-[#C4805A] underline-offset-[6px] transition-all duration-200">
                  View project&nbsp;&rarr;
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
