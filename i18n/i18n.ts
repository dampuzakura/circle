import { signal } from "@preact/signals";
import { Translation } from "./types.ts";

export const languages = [
  { code: "en", name: "English" },
  { code: "ja", name: "日本語" },
] as const;

export type Language = typeof languages[number]["code"];

export const tSignal = signal<Translation | null>(null);
export const langSignal = signal<Language | null>(null);

export const t = () => tSignal.value!;
export const lang = () => langSignal.value!;
