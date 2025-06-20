import z from "zod/v4";

const ZPicture = z.strictObject({
  name: z.string(),
  originalWidth: z.coerce.number(),
  originalHeight: z.coerce.number(),
  url: z.url({
    protocol: /^https?$/,
    hostname: z.regexes.hostname,
  }),
  _id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  __v: z.number(),
});

type IPicture = z.infer<typeof ZPicture>;

export { ZPicture };
export type { IPicture };
