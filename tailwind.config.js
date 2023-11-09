/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      text: "var(--text)",
      background: "var(--background)",
      primary: "var(--primary)",
      secondary: "var(--secondary)",
      accent: "var(--accent)",
      border: "#aaa",
      buttonText: "#fdfefb",
      link: "#362FD9",
      warning: "#FFA559",
      error: "#E74646",
    },
    fontSize: {
      sm: "0.750rem",
      base: "1rem",
      xl: "1.333rem",
      "2xl": "1.777rem",
      "3xl": "2.369rem",
      "4xl": "3.158rem",
      "5xl": "4.210rem",
    },
    fontFamily: {
      heading: ["Roboto", "sans-serif"],
      body: ["Roboto", "sans-serif"],
    },
    fontWeight: {
      normal: "400",
      semiBold: "600",
      bold: "700",
    },
  },
  plugins: [],
};
