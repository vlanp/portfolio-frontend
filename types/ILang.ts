import { z } from "zod/v4";

enum ELangs {
  FR = "fr",
  EN = "en",
}
const ZELangs = z.enum(ELangs);
type ILang = `${ELangs}`;

export type { ILang };
export { ELangs, ZELangs };
