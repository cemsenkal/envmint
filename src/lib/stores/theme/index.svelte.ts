import type { ThemeType } from "../../../types";
import { writable } from "svelte/store";

export const themeStore = writable<ThemeType>(null);

window.onload = function loadTheme() {
  const localTheme = localStorage.getItem("theme") as ThemeType;
  themeStore.set(localTheme);
};

export const toggleTheme = () => {
  themeStore.update((prevTheme) => {
    const newTheme = prevTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-app-theme", newTheme);
    return newTheme;
  });
};
