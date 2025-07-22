/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F97316', // basketball-orange
          light: '#FB923C',   // basketball-orange-light
          lighter: '#FED7AA', // basketball-orange-lighter
        },
        secondary: {
          DEFAULT: '#78350F', // basketball-brown
          light: '#A16207',   // basketball-brown-light
          lighter: '#D97706', // basketball-brown-lighter
        },
        gray: {
          DEFAULT: '#374151', // basketball-gray
          light: '#6B7280',   // basketball-gray-light
          lighter: '#F3F4F6', // basketball-gray-lighter
        },
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
      },
    },
  },
  plugins: [],
}