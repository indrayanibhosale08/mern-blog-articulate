// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         'background': '#111827', // A deep, dark navy/slate
//         'surface': '#1F2937',    // A slightly lighter gray for cards and surfaces
//         'primary': '#38BDF8',    // A vibrant, modern light blue for primary actions
//         'muted': '#9CA3AF',      // A soft gray for secondary text and icons
//         'text-main': '#F9FAFB',  // An off-white for primary text
//         'text-secondary': '#D1D5DB', // A slightly dimmer white for descriptions
//         'accent': '#4F46E5',     // An indigo accent for highlights
//       },
//       fontFamily: {
//         'sans': ['"Inter"', 'sans-serif'],
//         'serif': ['"Lora"', 'serif'],
//       },
//     },
//   },
//   plugins: [
//     require('@tailwindcss/typography'),
//   ],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-light': '#F8F7F4', // Soft, creamy off-white for backgrounds
        'brand-dark': '#1E2022',  // Deep charcoal for text and headings
        'brand-blue': '#4A6FA5',  // Muted, sophisticated blue for buttons and links
        'brand-gray': '#777777',  // Neutral gray for secondary text
      },
      fontFamily: {
        'sans': ['"Inter"', 'sans-serif'],
        'serif': ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}