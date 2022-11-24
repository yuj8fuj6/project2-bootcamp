/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      display: ["sansita"],
      body: ["sansita"],
    },
    extend: {
      fontSize: {
        14: "14px",
        xxl: "10rem",
        xxs: "0.6rem",
        nav: [
          "1.9rem",
          {
            lineHeight: "1rem",
            letterSpacing: "-0.01em",
            fontWeight: "500",
          },
        ],
      },
      backgroundColor: {
        "main-bg": "#FFFFFF",
        "secondary-orange-bg": "#F0A375",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        color: "rgba(0, 0, 0, 0.1)",
      },
      width: {
        400: "400px",
        760: "760px",
        780: "780px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
        1400: "1400px",
      },
      height: {
        80: "80px",
      },
      minHeight: {
        590: "590px",
      },
      colors: {
        orange: "#F0A375",
        purple: "#9D7D9B",
        green: "#90BC3F",
      },
    },
  },
  plugins: [],
};
