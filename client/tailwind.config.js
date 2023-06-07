/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(1Q,#DDDDDD 1Q,#f1f5f9 2Q)',
        'background-size': '36px 36px',
        "package-gold": 'repeating-linear-gradient(45deg,#FED049,#FED049 10px,#FFC93C 10px,#FFC93C 20px)',
        "package-basic": 'repeating-linear-gradient(45deg,#EEEEEE,#EEEEEE 10px,#E8E2E2 10px,#E8E2E2 20px)',
        "package-bronze": 'repeating-linear-gradient(45deg,#FFE7CC,#FFE7CC 10px,#F8CBA6 10px,#F8CBA6 20px)'
      },
      colors: {
        'navbar': '#007bff',
        'hero': '#0062D1'
      },
      height: {
        '190': '90vh',
        '180': '80vh',
        '120': '20vh',
        '160': '60vh'
      },
      animation: {
        'up-down': 'updown 2s ease-in-out infinite alternate-reverse both',
        'high-up': 'highup 10s'
      },
      keyframes: {
        updown: {
          '0%': { transform: 'translateY(10px)' },
          '100%': { transform: 'translateY(-10px)' },
        },
        highup: {
          '0%,100%': { transform: 'translateY(-30px)' }
        }
      }
    }
  }
}