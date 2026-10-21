/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hero: {
          black: '#0F172A',
          dark: '#1E293B',
          red: '#DC2626',
          crimson: '#B91C1C',
          brightRed: '#EF4444',
          gold: '#F59E0B',
          amber: '#FBBF24',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          success: '#10B981',
          successBg: '#ECFDF5',
          danger: '#F43F5E',
          dangerBg: '#FFF1F2',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Nunito', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'hero-sm': '0 2px 8px rgba(15, 23, 42, 0.04)',
        'hero-md': '0 8px 24px -4px rgba(15, 23, 42, 0.06), 0 4px 10px -2px rgba(15, 23, 42, 0.02)',
        'hero-red': '0 8px 20px -2px rgba(220, 38, 38, 0.25)',
        'hero-gold': '0 8px 20px -2px rgba(245, 158, 11, 0.3)',
      },
      borderRadius: {
        'hero': '22px',
        'hero-lg': '28px',
      }
    },
  },
  plugins: [],
}
