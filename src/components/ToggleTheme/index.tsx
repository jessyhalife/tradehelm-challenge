import React from "react";
import {FiMoon, FiSun} from "react-icons/fi";
import "./styles.scss";
const ToggleTheme: React.FC = () => {
  const [theme, setTheme] = React.useState<"dark" | "light">("light");

  function toggleColor() {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  }
  React.useEffect(() => {
    let pref = (window.localStorage.getItem("pref_mode") as "dark" | "light") || undefined;

    if (!pref) {
      const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

      if (darkThemeMq.matches) pref = "dark";
    }

    setTheme(pref);
  }, []);
  React.useEffect(() => {
    const docEl = document.documentElement;

    if (theme === "light") {
      docEl.style.setProperty("--background", "white");
      docEl.style.setProperty("--color", "rgb(33, 33, 33)");
    } else {
      docEl.style.setProperty("--color", "white");
      docEl.style.setProperty("--background", "rgb(33, 33, 33)");
    }
    window.localStorage.setItem("pref_mode", theme);
  }, [theme]);

  return (
    <div className="toggle-wrapper mt-md" onClick={toggleColor}>
      {theme === "light" && <FiMoon size={32} style={{color: "var(--color)"}} />}
      {theme === "dark" && <FiSun size={32} style={{color: "var(--color)"}} />}
    </div>
  );
};

export default ToggleTheme;
