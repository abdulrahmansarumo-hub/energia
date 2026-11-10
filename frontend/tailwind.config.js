/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        energia: {
          navy: "#0b172a",
          green: "#18a878",
          mint: "#dff7ed",
        },
      },
    },
  },
  plugins: [],
};
