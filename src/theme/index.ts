import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `"DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
    body: `"DM Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,
  },
  styles: {
    global: (props: { colorMode: "light" | "dark" }) => ({
      "html, body": {
        bg: props.colorMode === "dark" ? "gray.950" : "white",
        color: props.colorMode === "dark" ? "gray.100" : "gray.900",
        transitionProperty: "background-color, color",
        transitionDuration: "200ms",
      },
    }),
  },
});

export default theme;
