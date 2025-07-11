import { z } from "zod/v4";

const getZPage = (max: number) => {
  return z.coerce.number().int().positive().max(max).default(1);
};

type IPage = z.infer<ReturnType<typeof getZPage>>;

export { getZPage };
export type { IPage };
