/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#0B0F19',       // Deep tech black
          surface: '#121826',   // Lighter surface
          card: '#1A2133',      // Card background
          accent: '#D4FF00',    // Cyber Lime (Trend 2026)
          accentHover: '#B2D600',
          text: '#F3F4F6',
          muted: '#9CA3AF'
        }
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)",
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      }
    }
  },
  plugins: [],
}
