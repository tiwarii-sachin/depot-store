/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        concrete: "#ECEAE3",
        panel: "#F6F5F1",
        ink: "#14181D",
        navy: "#1B2430",
        navy2: "#242F3D",
        safety: "#FF5A1F",
        safetyDark: "#D6470F",
        crate: "#2F6F4E",
        line: "#C9C5B8",
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
