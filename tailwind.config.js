/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: { 
      "primary-one": "#462e75",
      "primary-two": "#ed6e2f",
      "secondary-one": "#3a9299",
      "secondary-two": "#3c3c3b",
      "secondart-three": "#efefef"
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'title': 'Stretch-pro',
        'subtitle' : 'Poppins-Regular'
      }
    },
  },
  plugins: [],
}
