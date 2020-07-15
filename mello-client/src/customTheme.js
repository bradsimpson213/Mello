import { theme } from "@chakra-ui/core";

// Let's say you want to add custom colors
const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
    fonts: {
      heading: "Helvetica, sans-serif",
      body: "Helvetica, sans-serif",
      mono: "Helvetica, sans-serif",
    },
  },
};

export default customTheme;


// export default {
//   breakpoints: ["30em", "48em", "62em", "80em"],
//   fonts: {
//     heading: '"Avenir Next", sans-serif',
//     body: "system-ui, sans-serif",
//     mono: "Menlo, monospace",
//   },
//   fontSizes: {
//     xs: "0.75rem",
//     sm: "0.875rem",
//     md: "1rem",
//     lg: "1.125rem",
//     xl: "1.25rem",
//     "2xl": "1.5rem",
//     "3xl": "1.875rem",
//     "4xl": "2.25rem",
//     "5xl": "3rem",
//     "6xl": "4rem",
//   },
// };