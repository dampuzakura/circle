import { FreshContext } from "$fresh/server.ts";
import { acceptsLanguages, getCookies, setCookie } from "@std/http";

import { Translation } from "../i18n/types.ts";
import {
  currentLanguageSignal,
  Language,
  languages,
  tSignal,
} from "../i18n/i18n.ts";

export async function handler(
  req: Request,
  ctx: FreshContext,
) {
  const cookies = getCookies(req.headers);
  let lang: Language | null = null;

  const url = new URL(req.url);
  const queryLang = url.searchParams.get("lang") as Language | null;

  if (queryLang && languages.some((l) => l.code === queryLang)) {
    lang = queryLang;
  }

  if (!lang) {
    const cookieLang = cookies.lang as Language;
    if (cookieLang && languages.some((l) => l.code === cookieLang)) {
      lang = cookieLang;
    }
  }

  if (!lang) {
    const acceptLanguages = acceptsLanguages(req) as Language[];
    for (const acceptLanguage of acceptLanguages) {
      if (languages.some((l) => l.code === acceptLanguage)) {
        lang = acceptLanguage;
        break;
      }
    }
  }

  if (!lang) {
    lang = languages[0].code;
  }

  currentLanguageSignal.value = lang;
  const langModule = await import(`../locales/${lang}.json`, {
    with: { type: "json" },
  });
  tSignal.value = langModule.default as Translation;

  const res = await ctx.next();

  setCookie(res.headers, {
    name: "lang",
    value: lang,
  });

  return res;
}
