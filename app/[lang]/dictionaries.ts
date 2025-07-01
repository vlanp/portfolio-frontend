import "server-only";

import { ELangs, ILang } from "@/types/ILang";
import { IDictionary } from "./dictionaries/generated";

const dictionaries = {
  [ELangs.EN]: () =>
    import("./dictionaries/generated/en").then((module) => module.enDictionary),
  [ELangs.FR]: () =>
    import("./dictionaries/generated/fr").then((module) => module.frDictionary),
} satisfies Record<ELangs, () => Promise<IDictionary>>;

export const getDictionary = async (locale: ILang): Promise<IDictionary> =>
  dictionaries[locale]();
