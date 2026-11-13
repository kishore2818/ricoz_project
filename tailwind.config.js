/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0B132B',
          800: '#1C2541',
          700: '#3A506B',
        },
        slate: {
          850: '#151e2e',
        },
        pe: {
          blue: '#1E40AF',
          gold: '#D97706',
          teal: '#0D9488',
        }
      }
    },
  },
  plugins: [],
};

