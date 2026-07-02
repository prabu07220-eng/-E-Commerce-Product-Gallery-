/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F6F5F1',
        card: '#FFFFFF',
        line: '#E4E1D9',
        ink: {
          DEFAULT: '#15171A',
          dim: '#5C6066',
          faint: '#9A9D9F',
        },
        emerald: {
          DEFAULT: '#0E6F4E',
          deep: '#0A5A3F',
          soft: '#E6F2EC',
        },
        sale: '#D6502B',
      },
      fontFamily: {
        display: ['"Archivo"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        pop: { '0%': { transform: 'scale(0.92)' }, '60%': { transform: 'scale(1.04)' }, '100%': { transform: 'scale(1)' } },
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.25s ease-out',
        pop: 'pop 0.25s ease-out',
      },
    },
  },
  plugins: [],
}
