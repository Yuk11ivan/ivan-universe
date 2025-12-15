/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'magic-purple': '#8B5CF6',
        'magic-gray': '#1E293B',
        'coffee-brown': '#936F47',
        'music-red': '#D14343',
        'movie-blue': '#165DFF',
      },
      keyframes: {
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        }
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out",
      }
    },
  },
  plugins: [],
}