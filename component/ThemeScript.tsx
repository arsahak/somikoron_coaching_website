import { THEME_STORAGE_KEY } from "@/lib/theme-constants";

/** Runs before React hydrates so dark/light applies immediately */
export function ThemeScript() {
  const script = `
(function () {
  try {
    var key = ${JSON.stringify(THEME_STORAGE_KEY)};
    var theme = localStorage.getItem(key);
    var isDark = theme === "dark";
    var root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(isDark ? "dark" : "light");
    root.setAttribute("data-theme", isDark ? "dark" : "light");
    root.style.colorScheme = isDark ? "dark" : "light";
  } catch (e) {}
})();
`;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
