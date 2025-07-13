import { z } from "zod/v4";

const ZPage = z.coerce.number().int().positive().default(1);

type IPage = z.infer<typeof ZPage>;

export { ZPage };
export type { IPage };
