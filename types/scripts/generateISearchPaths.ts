"server only";

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import axios from "axios";
import checkedEnv from "@/lib/checkEnv";
import * as prettier from "prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fetchSearchPaths = async () => {
  console.log(`Generating ISearchPaths.ts...`);
  const searchPathsResponse = await axios.get(
    checkedEnv.NEXT_PUBLIC_BACKEND_URL +
      checkedEnv.NEXT_PUBLIC_GET_SEARCH_PATHS_URL
  );
  const searchPaths = searchPathsResponse.data.data;
  const outputDir = resolve(__dirname, "../generated");
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = resolve(__dirname, `../generated/ISearchPaths.ts`);

  const fileContent = `
    // Auto-generated file. Do not edit manually.

    import { z } from "zod/v4";


    interface ISearchPathsMapping ${JSON.stringify(searchPaths, undefined, 2)}

    const searchPathsMapping: ISearchPathsMapping = ${JSON.stringify(
      searchPaths,
      undefined,
      2
    )}

    const ZESearchPaths = z.union([${Object.keys(searchPaths).map((key) => `z.enum([${Object.values(searchPaths[key]).map((value) => `\"${value}\"`)}])`)}])

    type ISearchPaths = z.infer<typeof ZESearchPaths>

    export type {ISearchPathsMapping, ISearchPaths}
    export {searchPathsMapping, ZESearchPaths}
    `;

  const prettierConfig = await prettier.resolveConfig(outputPath);
  const formattedContent = await prettier.format(fileContent, {
    ...prettierConfig,
    parser: "typescript",
  });

  writeFileSync(outputPath, formattedContent, "utf8");
  console.log(`✅ Generated ${outputPath}`);
};

fetchSearchPaths().catch(console.error);
