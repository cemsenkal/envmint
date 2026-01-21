import type { ThemeType } from "../../types";
import { writable } from "svelte/store";

export const themeState = writable<ThemeType>(null);

window.onload = function loadTheme() {
  const localTheme = localStorage.getItem("theme") as ThemeType;
  themeState.set(localTheme);
};

export const toggleTheme = () => {
  themeState.update((prevTheme) => {
    const newTheme = prevTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-app-theme", newTheme);
    return newTheme;
  });
};
