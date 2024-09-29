module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      fontWeight: {
        'extra-bold': '700',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'extra-tight': '-0.075em',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'scroll': 'scroll 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      translate: {
        'custom': 'var(--translate-y-mobile)',
      },
      colors: {
        primary: {
          DEFAULT: '#003366',
          light: '#004080',
          dark: '#002b4d',
        },
        secondary: '#FFFFFF',
        accent: {
          DEFAULT: '#FFD700',
          green: '#4CAF50',
        },
      },
    },
  },
  variants: {
    extend: {
      translate: ['responsive'],
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}