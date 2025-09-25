import z from "zod/v4";
import { ZELangs } from "./ILang";

const ZArticle = z.object({
  title: z.record(ZELangs, z.string()),
  description: z.record(ZELangs, z.string()),
  imgUrl: z.url({
    protocol: /^https?$/,
    hostname: z.regexes.hostname,
  }),
  imgWidth: z.number(),
  imgHeight: z.number(),
  category: z.string(),
  _id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  __v: z.number(),
});

type IArticle = z.infer<typeof ZArticle>;

export { ZArticle };
export type { IArticle };
