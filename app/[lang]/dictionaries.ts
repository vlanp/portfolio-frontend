import "server-only";

export type IDictionary =
  | Awaited<ReturnType<typeof dictionaries.en>>
  | Awaited<ReturnType<typeof dictionaries.fr>>;

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  fr: () => import("./dictionaries/fr.json").then((module) => module.default),
};

export const getDictionary = async (
  locale: "en" | "fr"
): Promise<IDictionary> => dictionaries[locale]();
