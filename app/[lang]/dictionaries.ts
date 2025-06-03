import "server-only";

import { ELang, ILang } from "@/types/ILang";
import { IDictionary } from "./dictionaries/generated";

const dictionaries = {
  [ELang.EN]: () =>
    import("./dictionaries/generated/en").then((module) => module.enDictionary),
  [ELang.FR]: () =>
    import("./dictionaries/generated/fr").then((module) => module.frDictionary),
} satisfies Record<ELang, () => Promise<IDictionary>>;

export const getDictionary = async (locale: ILang): Promise<IDictionary> =>
  dictionaries[locale]();
