/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'stretch': 'Stretch-pro, sans-serif',
        'poppins' : 'Poppins-Regular, inter, sans-serif'
      },
      colors: { 
        "fomo-pri-one": "#462e75",
        "fomo-pri-two": "#ed6e2f",
        "fomo-sec-one": "#3a9299",
        "fomo-sec-two": "#3c3c3b",
        "fomo-sec-white": "#efefef"
      }
    },
  },
  plugins: [],
}
