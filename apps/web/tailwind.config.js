function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  mode: "jit",
  content: ["./src/pages/**/*.tsx"],
  theme: {
    extend: {
      boxShadow: {
        "code-dark": "0 0px 20px -6px rgba(0,0,0,0.7)",
        "code-light": "0 0px 10px -6px rgba(0,24,40,0.3)",
        smooth: "0 0px 15px -8px rgba(0,24,40,0.3)",
      },
      colors: {
        background: withOpacityValue("--background"),
        foreground: withOpacityValue("--foreground"),
        ["sep-gray"]: withOpacityValue("--separator"),
        "blue-opaque": "rgb(13 42 148 / 18%)",
        "blue-deep": {
          800: "#1D2433",
          900: "#16181D",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    ({ addVariant }) => {
      addVariant(
        "supports-backdrop-blur",
        "@supports (backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0))"
      );
    },
  ],
};
