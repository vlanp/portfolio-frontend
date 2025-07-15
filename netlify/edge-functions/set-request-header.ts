import type { Context, Config } from "@netlify/edge-functions";

const setRequestHeader = async (request: Request, context: Context) => {
  const headers = new Headers(request.headers);
  headers.set("x-current-path", context.url.pathname);
};

export const config: Config = {
  path: "/*",
};

export default setRequestHeader;
