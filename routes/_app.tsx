import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>circle</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="https://esm.sh/@picocss/pico@2.0.6/css/pico.classless.orange.min.css" />
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
