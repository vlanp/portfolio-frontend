import z from "zod/v4";

const getZApiSuccessResponse = <ZResponseType extends z.ZodType = z.ZodType>(
  zResponseType: ZResponseType
) => {
  return z.object({
    success: z.literal(true),
    message: z.string(),
    data: zResponseType,
  });
};

type IApiSuccessResponse<ResponseType> = z.infer<
  ReturnType<typeof getZApiSuccessResponse>
> & {
  data: ResponseType;
};

const ZApiErrorResponse = z.object({
  success: z.literal(false),
  message: z.string(),
});

type IApiErrorResponse = z.infer<typeof ZApiErrorResponse>;

export { getZApiSuccessResponse, ZApiErrorResponse };
export type { IApiErrorResponse, IApiSuccessResponse };
