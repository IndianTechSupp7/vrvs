const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6", // blue-500
          light: "#60A5FA", // blue-400
          dark: "#2563EB", // blue-600
        },
        secondary: {
          DEFAULT: "#64748B", // slate-500 (grayish blue)
          light: "#94A3B8", // slate-400
          dark: "#475569", // slate-600
        },
        background: {
          DEFAULT: "#c2d6f6", // slate-100
          dark: "#1c283b", // slate-800
        },
        text: {
          DEFAULT: "#1E293B", // slate-800
          muted: "#64748B", // slate-500
          light: "#F8FAFC", // slate-50
        },
      },
      fontFamily: {
        sans: ["Poppins-Regular"],
        poppins: ["Poppins-Regular"],
        "poppins-semibold": ["Poppins-SemiBold"],
        "poppins-bold": ["Poppins-Bold"],
      },
    },
  },
  plugins: [],
};
