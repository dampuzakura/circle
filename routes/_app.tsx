import { type PageProps } from "$fresh/server.ts";
import "../i18n/i18n.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>circle</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="https://esm.sh/@picocss/pico@2.0.6/css/pico.classless.orange.min.css" />
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=ibm-plex-sans:400|ibm-plex-sans-jp:400" rel="stylesheet" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
