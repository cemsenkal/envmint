import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

export type ThemeType = "dark" | "light" | null;

export type EditorStoreType = Array<EditorLineType | EditorCommentType>;

export interface EditorLineType {
  type: "line";
  id: `${string}-${string}-${string}-${string}-${string}`;
  key: string;
  value: string;
}

export interface EditorCommentType {
  type: "comment";
  id: `${string}-${string}-${string}-${string}-${string}`;
  value: string;
}

export interface ButtonType extends HTMLButtonAttributes {
  chilren?: Snippet;
  variant?: "base" | "success" | "danger" | "warning";
}
