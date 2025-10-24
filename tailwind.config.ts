/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      spacing: {},
      colors: {
        "text-foreground": "var(--text-foreground)",
        "overview-card-bg": "var(--overview-card-background)",
        "overview-card-text": "var(--overview-card-text)",
      },
      backgroundImage: {
        "profile-bg": "var(--profile-background)",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translate(0,-50%)" },
          "50%": { transform: "translate(-7px,-50%)" },
        },
        "shake-reverse": {
          "0%, 100%": { transform: "translate(0,-50%)" },
          "50%": { transform: "translate(7px,-50%)" },
        },
      },
      animation: {
        shake: "shake 1s ease-in-out infinite",
        "shake-reverse": "shake-reverse 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
