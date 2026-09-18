import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { i18n, t } = useTranslation();
  const language = i18n.resolvedLanguage?.startsWith("es") ? "es" : "en";

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div
      role="group"
      aria-label={t("nav.languageAriaLabel")}
      className={`flex items-center gap-1 ${className}`}
    >
      {(["en", "es"] as const).map((code) => (
        <Button
          key={code}
          type="button"
          variant="ghost"
          size="sm"
          aria-pressed={language === code}
          onClick={() => void i18n.changeLanguage(code)}
          className={language === code ? "text-signal" : "text-muted-foreground"}
        >
          {code.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
