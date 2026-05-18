/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C63D36',
          50: '#FFF4F3',
          100: '#FFE7E5',
          200: '#FFCEC9',
          300: '#F8A7A0',
          400: '#EE766D',
          500: '#DE554B',
          600: '#C63D36',
          700: '#AA312B',
          800: '#7F2722',
          900: '#5B1E1A',
        },
        secondary: {
          DEFAULT: '#2C2F3A',
          50: '#F5F6F8',
          100: '#E9EBEF',
          200: '#D2D7E0',
          300: '#B0B8C6',
          400: '#8A94A8',
          500: '#68748D',
          600: '#4E5970',
          700: '#3A4358',
          800: '#2C2F3A',
          900: '#1E212A',
        },
        accent: {
          DEFAULT: '#F6F7FB',
          50: '#FFFFFF',
          100: '#F9FAFD',
          200: '#F4F6FB',
          300: '#ECEFF7',
          400: '#E2E7F2',
          500: '#D6DDEA',
          600: '#C2CCDE',
          700: '#A9B6CF',
          800: '#8F9EBC',
          900: '#7482A4',
        },
      },
    },
  },
  plugins: [],
};
