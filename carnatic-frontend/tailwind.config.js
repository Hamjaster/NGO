/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto'],
        poppings: ['Poppins'],
        dancing: ['Dancing Script'],
        satisfy: ['Satisfy', "cursive"],
        curly: ['Simonetta']
      }
    },
  },
  plugins: [],
}

