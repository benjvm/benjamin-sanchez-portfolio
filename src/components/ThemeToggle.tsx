import { Moon, Sun } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toggleTheme, useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const theme = useTheme();
  const { t } = useTranslation();
  const action = t(theme === "dark" ? "theme.toLight" : "theme.toDark");

  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={action}>
      <span className="theme-is-dark">
        <Moon aria-hidden="true" fill="currentColor" strokeWidth={0} />
      </span>
      <span className="theme-is-light">
        <Sun aria-hidden="true" />
      </span>
    </button>
  );
}
