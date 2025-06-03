import {
  readFileSync,
  writeFileSync,
  watchFile,
  mkdirSync,
  existsSync,
} from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { ELang } from "@/types/ILang";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const locales = Object.values(ELang);

function parseTemplateParams(template: string): string[] {
  const matches = template.match(/%\(([^)]+)\)s/g);
  if (!matches) return [];
  return matches.map((match) => match.slice(2, -2)); // Remove %( and )s
}

function needsQuotes(key: string): boolean {
  return !/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key);
}

function formatKey(key: string): string {
  return needsQuotes(key) ? `"${key}"` : key;
}

function generateTypeForParams(paramNames: string[]): string {
  if (paramNames.length === 0) return "";
  const paramTypes = paramNames.map((name) => `${name}: string`).join("; ");
  return `(params: { ${paramTypes} }) => Promise<string>`;
}

function generateFunctionCode(template: string, paramNames: string[]): string {
  const escapedTemplate = template.replace(/'/g, "\\'").replace(/\n/g, "\\n");
  return `async (params: { ${paramNames
    .map((name) => `${name}: string`)
    .join("; ")} }) => {
    "use server"
    return '${escapedTemplate}'.replace(/%\\(([^)]+)\\)s/g, (match, paramName) => {
      return params[paramName as keyof typeof params] || match;
    });
  }`;
}

function processObject(obj: object): { code: string; types: string } {
  const processValue = (
    value: unknown,
    key: string,
    indent: string = ""
  ): { code: string; type: string } => {
    const formattedKey = formatKey(key);

    if (typeof value === "string") {
      const paramNames = parseTemplateParams(value);
      const isTemplate = paramNames.length > 0;

      if (isTemplate) {
        const functionCode = generateFunctionCode(value, paramNames);
        const typeCode = generateTypeForParams(paramNames);
        return {
          code: `${indent}${formattedKey}: ${functionCode}`,
          type: `${formattedKey}: ${typeCode}`,
        };
      } else {
        const escapedValue = value.replace(/'/g, "\\'").replace(/\n/g, "\\n");
        return {
          code: `${indent}${formattedKey}: '${escapedValue}'`,
          type: `${formattedKey}: string`,
        };
      }
    } else if (typeof value === "object" && value !== null) {
      const entries: string[] = [];
      const types: string[] = [];

      for (const [nestedKey, nestedValue] of Object.entries(value)) {
        const nested = processValue(nestedValue, nestedKey, indent + "  ");
        entries.push(nested.code);
        types.push(nested.type);
      }

      return {
        code: `${indent}${formattedKey}: {\n${entries.join(",\n")}\n${indent}}`,
        type: `${formattedKey}: {\n${types
          .map((t) => `  ${t}`)
          .join(";\n")}\n}`,
      };
    }

    return { code: "", type: "" };
  };

  const entries: string[] = [];
  const types: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const processed = processValue(value, key, "  ");
    entries.push(processed.code);
    types.push(processed.type);
  }

  return {
    code: `{\n${entries.join(",\n")}\n}`,
    types: types.join(";\n"),
  };
}

function generateDictionaryFile(locale: string): void {
  try {
    console.log(`Generating dictionary for ${locale}...`);

    const jsonPath = resolve(__dirname, `../${locale}.json`);
    const outputPath = resolve(__dirname, `../generated/${locale}.ts`);

    if (!existsSync(jsonPath)) {
      console.log(`⚠️  Warning: ${jsonPath} does not exist, skipping...`);
      return;
    }

    const rawData = JSON.parse(readFileSync(jsonPath, "utf8"));
    const { code, types } = processObject(rawData);

    const interfaceName = `I${
      locale.charAt(0).toUpperCase() + locale.slice(1)
    }Dictionary`;
    const constName = `${locale}Dictionary`;

    const fileContent = `// Auto-generated file. Do not edit manually.
// Generated from ${locale}.json

interface ${interfaceName} {
  ${types};
}

export const ${constName}: ${interfaceName} = ${code} as const;

export type { ${interfaceName} };
`;

    writeFileSync(outputPath, fileContent, "utf8");
    console.log(`✅ Generated ${outputPath}`);
  } catch (error) {
    console.error(`❌ Error generating ${locale} dictionary:`, error);
  }
}

function generateAllDictionaries(): void {
  // Create output directory if it doesn't exist
  const outputDir = resolve(__dirname, "../generated");
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  locales.forEach(generateDictionaryFile);

  // Generate index file
  const indexContent = `// Auto-generated index file
${locales
  .map(
    (locale) =>
      `import { I${
        locale.charAt(0).toUpperCase() + locale.slice(1)
      }Dictionary } from './${locale}';`
  )
  .join("\n")}

export type IDictionary = ${locales
    .map(
      (locale) =>
        `I${locale.charAt(0).toUpperCase() + locale.slice(1)}Dictionary`
    )
    .join(" | ")};
`;

  writeFileSync(
    resolve(__dirname, "../generated/index.ts"),
    indexContent,
    "utf8"
  );
  console.log("✅ Generated index.ts");
}

function watchDictionaries(): void {
  locales.forEach((locale) => {
    const jsonPath = resolve(__dirname, `../${locale}.json`);
    console.log(`👀 Watching ${jsonPath}`);

    watchFile(jsonPath, () => {
      console.log(`📝 ${locale}.json changed, regenerating...`);
      generateDictionaryFile(locale);
    });
  });
}

// CLI handling
const args = process.argv.slice(2);
const command = args[0];

if (command === "watch") {
  generateAllDictionaries();
  watchDictionaries();
  console.log("👀 Watching for changes... Press Ctrl+C to stop.");
} else {
  generateAllDictionaries();
}
