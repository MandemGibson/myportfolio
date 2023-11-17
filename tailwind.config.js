/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "3/8": "38%",
      },
      height: {
        98: "30rem",
      },
    },
  },
  plugins: [],
};
