import { z } from "zod/v4";

enum ELang {
  FR = "fr",
  EN = "en",
}
const ZELang = z.enum(ELang);
type ILang = `${ELang}`;

export type { ILang };
export { ELang, ZELang };
