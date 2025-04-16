/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#A3A9E2",
        },
        success: {
          DEFAULT: "#23C552",
        },
        error: {
          DEFAULT: "#FF0101",
        },
        gray: {
          50: "#F8F7F4",
          100: "#EDECE8",
          150: "#E6E5E2",
          200: "#CFCEC9",
          300: "#BAB9B5",
          400: "#A7A5A0",
          500: "#91908D",
          600: "#7D7C78",
          700: "#686764",
          800: "#535350",
          900: "#1F1F1E",
        },
      },
    },
  },
};
