/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
      },
      colors: {
        primary: "var(--primary-color)",
        "primary-light": "var(--primary-color--light)",
        "primary-heavy": "var(--primary-color--heavy)",
        disabled: "var(--disabled-color)",
        background: "var(--bg-color)",
      },
    },
  },
  plugins: [],
};
