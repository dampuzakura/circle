import { languages } from "../i18n/i18n.ts";

interface LanguageSwitcherProps {
  url: URL;
}

export default function LanguageSwitcher({ url }: LanguageSwitcherProps) {
  const buildQuery = (code: string) => {
    const query = new URLSearchParams(url.searchParams);
    query.set("lang", code);
    return `?${query.toString()}`;
  };

  return (
    <nav>
      <ul>
        {languages.map((lang) => (
          <li key={lang.code}>
            <a href={buildQuery(lang.code)}>
              {lang.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
