import React from "react";
import { useColorMode } from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";

interface ThemeToggleButtonProps {
  className?: string;
  iconClassName?: string;
}

export default function ThemeToggleButton({
  className = "",
  iconClassName = "w-4 h-4",
}: ThemeToggleButtonProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";
  const Icon = isDark ? FiSun : FiMoon;

  return (
    <button
      type="button"
      onClick={toggleColorMode}
      aria-label={label}
      title={label}
      className={className}
    >
      <Icon className={iconClassName} />
    </button>
  );
}
