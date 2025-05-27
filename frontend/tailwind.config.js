/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1300px',
      '2xl': '1536px',
    },
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
      boxShadow: {
        'card-standard': '0 8px 32px rgba(0,0,0,0.1)',
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
    plugin(function ({ addUtilities, theme }) {
      addUtilities({
        '.section-base': {
          '@apply py-16 px-5 mb-10': {},
        },
        '.section-dark-overlay': {
          '@apply relative py-16 px-5': {},
        },
        '.card-glass-transparent': {
          '@apply backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl': {},
          '-webkit-backdrop-filter': 'blur(12px)',
          boxShadow: theme('boxShadow.card-standard'),
        },
        '.card-glass-opaque': {
          '@apply bg-white/20 border border-white/30 rounded-2xl': {},
          '-webkit-backdrop-filter': 'blur(8px)',
          'backdrop-filter': 'blur(8px)',
          boxShadow: theme('boxShadow.card-standard'),
        },
        '.card-glass-reflect': {
          position: 'relative',
          'z-index': '0',
        },
        '.card-shadow-projected': {
          position: 'absolute',
          inset: '0',
          'z-index': '-5',
          'border-radius': theme('borderRadius.2xl'),
          background: 'rgba(0,0,0,0.2)',
          filter: 'blur(20px)',
          transform: 'scale(0.98) translateY(4px)',
          opacity: '0.5',
          'pointer-events': 'none',
        },
      })
    }),
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
    },
    plugin(function({ addComponents, theme }) {
      addComponents({
        '.card-glass-reflect::before': {
          content: '""',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          height: '24%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 60%, transparent 100%)',
          'border-top-left-radius': theme('borderRadius.2xl'),
          'border-top-right-radius': theme('borderRadius.2xl'),
          'pointer-events': 'none',
          'z-index': '1',
          
        },
      })
    }),
  ],
} 