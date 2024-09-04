/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        blazeberg: ['Blazeberg', 'sans-serif'],
        cooljazz: ['Cooljazz', 'sans-serif'],
        chococooky: ['Chococooky', 'sans-serif'],
      },
      backgroundImage: {
        'signup-Light': "url('/src/assets/image/builtIn/signupLight.jpg')",
        'signup-Dark': "url('/src/assets/image/builtIn/signupDark.jpg')",
        'noteBook-Light': "url('/src/assets/image/builtIn/noteBookLight.jpg')",
        'noteBook-Dark': "url('/src/assets/image/builtIn/noteBookDark.jpg')",
      }
    },
  },
  plugins: [],
  darkMode: 'class',

}

