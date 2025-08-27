/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // The new color palette for "Articulate"
      colors: {
        'brand-light': '#F8F7F4', // A soft, creamy off-white
        'brand-dark': '#1E2022',  // A deep, rich charcoal
        'brand-blue': '#4A6FA5',  // A muted, sophisticated blue for accents
        'brand-gray': '#777777',  // A neutral gray for secondary text
      },
      // The new font families
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'serif': ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}