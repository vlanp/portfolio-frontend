import z from "zod/v4";

const getZApiSuccessResponse = <ResponseType>(
  zResponseType: z.ZodType<ResponseType>
) => {
  return z.object({
    success: z.literal(true),
    message: z.string(),
    data: zResponseType,
  });
};

type IApiSuccessResponse<ResponseType> = z.infer<
  ReturnType<typeof getZApiSuccessResponse<ResponseType>>
>;

const ZApiErrorResponse = z.object({
  success: z.literal(false),
  message: z.string(),
});

type IApiErrorResponse = z.infer<typeof ZApiErrorResponse>;

export { getZApiSuccessResponse, ZApiErrorResponse };
export type { IApiErrorResponse, IApiSuccessResponse };
