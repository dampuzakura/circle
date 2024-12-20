import { type PageProps } from "$fresh/server.ts";
import { getCurrentLanguage, t } from "../i18n/i18n.ts";
import LanguageSwitcher from "../components/language_switcher.tsx";
export default function App({ Component, url }: PageProps) {
  return (
    <html lang={getCurrentLanguage()}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{t().title}</title>
        <meta name="description" content={t().description} />
        <meta name="keywords" content={t().keywords} />
        <meta name="robots" content="index, follow" />
        <link rel="stylesheet" href="/styles.css" />
        <link
          rel="stylesheet"
          href="https://esm.sh/@picocss/pico@2.0.6/css/pico.classless.orange.min.css"
        />
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=ibm-plex-sans:400|ibm-plex-sans-jp:400"
          rel="stylesheet"
        />
      </head>
      <body>
        <header>
          <hgroup>
            <h1>{t().title}</h1>
          </hgroup>
          <LanguageSwitcher url={url} />
        </header>
        <main>
          <Component />
        </main>
      </body>
    </html>
  );
}
