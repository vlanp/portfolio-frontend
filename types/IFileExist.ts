import z from "zod/v4";

const ZFileExist = z.object({
  exist: z.boolean(),
  filePath: z.string().optional(),
});

type IFileExist = z.infer<typeof ZFileExist>;

export { ZFileExist };
export default IFileExist;
