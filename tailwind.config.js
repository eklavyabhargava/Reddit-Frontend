/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#121518",
        btnPrimary: "#D93900",
        textPrimary: "#ededed",
        bgSecondary: "#33353c",
        btnSecondary: "#bd4114",
        textSecondary: "#9e9e9e",
      },
    },
    screens: {
      tablet: "720px",
      desktop: "1030px",
    },
  },
  plugins: [],
};
