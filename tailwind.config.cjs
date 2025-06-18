/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#001c2f",
        surface: "#0F2C3F",
        header: "#193142",
        accent: "#0797FF",
        blurHighlight: "#1c5e8c",
      },
      borderRadius: {
        card: "14px",
        button: "20px",
      },
      spacing: {
        "header-px": "60px",
        "header-px-mobile": "16px",
      },
      maxWidth: {
        container: "1200px",
      },
      blur: {
        heavy: "100px",
        medium: "20px",
      },
    },
  },
  plugins: [],
}
