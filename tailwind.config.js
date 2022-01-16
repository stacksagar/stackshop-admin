module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'

  theme: {
    extend: {
      minHeight: {
        header: "50px",
        minus_header: "calc(100vh - 50px)",
        minus_header_dbl: "calc(100vh - 100px)",
      },
      maxHeight: {
        header: "50px",
        minus_header: "calc(100vh - 50px)",
        minus_header_dbl: "calc(100vh - 100px)",
      },
      spacing: {
        header: "50px",
        minus_header: "calc(100vh - 50px)",
        minus_header_dbl: "calc(100vh - 100px)",
        0.1: "0.1px",
        0.2: "0.2px",
        0.3: "0.3px",
        0.4: "0.4px",
        0.5: "0.5px",
        0.6: "0.6px",
        0.7: "0.7px",
        0.8: "0.8px",
        0.9: "0.9px",
        "1p": "1px",
        1.2: "1.2px",
        1.3: "1.3px",
        1.4: "1.4px",
        1.5: "1.5px",
        1.6: "1.6px",
        1.7: "1.7px",
        1.8: "1.8px",
        1.9: "1.9px",
        "2p": "2px",
      },
    },
  },
  variants: {
    extend: {
      padding: ["hover", "group-hover"],
      dark: ["screens"],
      screens: ["dark"],
    },
  },
  plugins: [],
};
