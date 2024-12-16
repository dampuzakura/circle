import { FreshContext } from "$fresh/server.ts";
import { acceptsLanguages, getCookies, setCookie } from "@std/http";

import { Translation } from "../i18n/types.ts";
import { langSignal, Language, languages, tSignal } from "../i18n/i18n.ts";

export async function handler(
  req: Request,
  ctx: FreshContext,
) {
  const cookies = getCookies(req.headers);
  let lang: Language | null = null;

  const cookieLang = cookies.lang;
  for (const language of languages) {
    if (language.code === cookieLang) {
      lang = language.code;
      break;
    }
  }

  if (!lang) {
    const acceptLanguages = acceptsLanguages(req);
    for (const acceptLanguage of acceptLanguages) {
      for (const language of languages) {
        if (language.code === cookieLang) {
          lang = acceptLanguage as Language;
          break;
        }
      }
    }

    lang = languages[0].code;
  }

  langSignal.value = lang;
  const langModule = await import(`../locales/${lang}.json`, {
    with: { type: "json" },
  });
  tSignal.value = langModule.default as Translation;

  const res = await ctx.next();

  if (!cookies.lang) {
    setCookie(res.headers, {
      name: "lang",
      value: lang,
    });
  }

  return res;
}
