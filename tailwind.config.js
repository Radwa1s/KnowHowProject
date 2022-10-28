module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],

  theme: {
    extend: {
      colors: {
        lightGreen: "#50FF81",
        darkGray: "#6B7280",
        whiteGray: "#F9FAFB",
      },
      backgroundImage: {
        bgImg: "url('/BG.png')",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
