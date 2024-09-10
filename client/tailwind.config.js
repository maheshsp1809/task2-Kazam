/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "scrollbar-thumb": "rgb(146, 64, 14)",
        "scrollbar-track": "white",
      },
    },
  },
  plugins: [],
};
