/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-merriweather)', 'Georgia', 'serif'],
        display: ['var(--font-clash-display)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'line-move': 'line-move 9s ease-in-out infinite',
        'line-pulse': 'line-pulse 8s ease-in-out infinite',
        'rotate-slow': 'rotate 20s linear infinite',
        'float-slow': 'float 15s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 10s ease-in-out infinite',
        'pulse-slow': 'pulse 8s ease-in-out infinite',
        'float-random': 'float-random 8s ease-in-out infinite',
      },
      keyframes: {
        'line-move': {
          '0%': { transform: 'translateX(-6%)' },
          '50%': { transform: 'translateX(6%)' },
          '100%': { transform: 'translateX(-6%)' }
        },
        'line-pulse': {
          '0%, 100%': { opacity: 0.65 },
          '50%': { opacity: 1 }
        },
        'rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(-12deg)' },
          '50%': { transform: 'translateY(-10px) rotate(-8deg)' }
        },
        'float-random': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(10px, -10px)' },
          '66%': { transform: 'translate(-10px, 10px)' }
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right bottom'
          }
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.primary.600'),
              textDecoration: 'none',
              transition: 'color 0.2s ease-in-out',
              '&:hover': {
                color: theme('colors.primary.700'),
              },
            },
            h1: {
              fontFamily: theme('fontFamily.display').join(', '),
              fontWeight: '600',
            },
            h2: {
              fontFamily: theme('fontFamily.display').join(', '),
              fontWeight: '600',
            },
            h3: {
              fontFamily: theme('fontFamily.display').join(', '),
              fontWeight: '600',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
