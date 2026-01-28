import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

export type ThemeType = "dark" | "light" | null;

export interface EditorStoreType {
  id: `${string}-${string}-${string}-${string}-${string}`;
  key: string;
  value: string;
}

export interface ButtonType extends HTMLButtonAttributes {
  chilren?: Snippet;
  variant?: "base" | "success" | "danger" | "warning";
}
