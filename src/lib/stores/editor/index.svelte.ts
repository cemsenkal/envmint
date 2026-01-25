import { writable } from "svelte/store";
import type { LineDataType } from "../../../types";

export const editorStore = writable<LineDataType[]>([
  {
    id: self.crypto.randomUUID(),
    key: "",
    value: "",
  },
]);
