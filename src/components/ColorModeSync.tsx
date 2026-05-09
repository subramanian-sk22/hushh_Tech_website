import { useEffect } from "react";
import { useColorMode } from "@chakra-ui/react";

export default function ColorModeSync() {
  const { colorMode } = useColorMode();

  useEffect(() => {
    const isDark = colorMode === "dark";

    document.documentElement.classList.toggle("dark", isDark);
    document.body.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }, [colorMode]);

  return null;
}
