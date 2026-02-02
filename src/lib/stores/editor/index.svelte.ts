import { writable } from "svelte/store";
import type { EditorStoreType } from "../../../types";

export const editorStore = writable<EditorStoreType>([
  {
    type: "line",
    id: self.crypto.randomUUID(),
    key: "",
    value: "",
  },
]);
