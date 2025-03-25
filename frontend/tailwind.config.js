/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kote-blue-dark': '#244F82', // Bleu foncé (Principale)
        'kote-white': '#F5F8FC', // Blanc (Police)
        'kote-blue-light': '#0099D9', // Bleu clair pour dégradé
        'kote-turquoise': '#40C0F0', // Bleu turquoise (Secondaire)
        'kote-green': '#B0C852', // Vert clair (Call To Action)
      },
      fontFamily: {
        'arboria': ['Arboria', 'sans-serif'],
      },
      textShadow: {
        'glow': '0 0 4px rgba(64, 192, 240, 0.6), 0 0 8px rgba(64, 192, 240, 0.4)'
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'page-transition': 'pageFadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        pageFadeIn: {
          '0%': { opacity: '0.8' },
          '100%': { opacity: '1' },
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-glow': {
          textShadow: '0 0 4px rgba(64, 192, 240, 0.6), 0 0 8px rgba(64, 192, 240, 0.4)',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
        '.transform-preserve-3d': {
          transformStyle: 'preserve-3d',
        },
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.perspective-2000': {
          perspective: '2000px',
        },
        '.translate-z-0': {
          transform: 'translateZ(0)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} 