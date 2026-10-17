/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFF5F0',
          100: '#FFE8DE',
          200: '#FFD1BE',
          300: '#FFAF91',
          400: '#FF8756',
          500: '#FF6B35', // Requested Primary: #FF6B35
          600: '#EA5118',
          700: '#C43B0B',
          800: '#9E300D',
          900: '#802B0F',
          DEFAULT: '#FF6B35',
        },
        charcoal: {
          50: '#F5F5F6',
          100: '#E7E8EA',
          200: '#D0D2D6',
          300: '#A4A8B0',
          400: '#6E737E',
          500: '#484C56',
          600: '#34373F',
          700: '#2A2C33',
          800: '#202124', // Requested Secondary: #202124
          900: '#17181A',
          DEFAULT: '#202124',
        },
        warm: {
          50: '#FFFDF9', // Requested Background: #FFFDF9
          100: '#FAF6EE',
          200: '#F4ECE0',
          300: '#EADBC8',
          400: '#DFCAAE',
          500: '#CDB18F',
          DEFAULT: '#FFFDF9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(32, 33, 36, 0.05), 0 4px 6px -2px rgba(32, 33, 36, 0.03)',
        'card': '0 4px 20px -2px rgba(32, 33, 36, 0.06), 0 2px 8px -2px rgba(32, 33, 36, 0.04)',
        'elevated': '0 14px 34px -4px rgba(32, 33, 36, 0.09), 0 6px 14px -2px rgba(32, 33, 36, 0.05)',
        'brand': '0 10px 25px -3px rgba(255, 107, 53, 0.35)',
        'brand-sm': '0 4px 14px 0 rgba(255, 107, 53, 0.25)',
      },
      borderRadius: {
        '2xl': '1.125rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
