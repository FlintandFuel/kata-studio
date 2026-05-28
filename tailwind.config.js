/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Google Sans Flex"', 'system-ui', 'sans-serif'],
        display: ['"Google Sans Flex"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Kata Studio brand palette
        canvas:   '#F7F5F2', // warm off-white / architectural plaster
        sienna:   '#C4805A', // burnt sienna / rammed earth terracotta
        charcoal: '#3D3A36', // warm charcoal / dark timber
        slate:    '#A8A29E', // warm slate grey
        linen:    '#D4C9B8', // pale warm linen / raw concrete
      },
      maxWidth: {
        content: '1180px',
      },
      letterSpacing: {
        widest2: '0.2em',
        widest3: '0.3em',
      },
    },
  },
  plugins: [],
}
