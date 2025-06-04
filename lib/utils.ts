import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const arrayDistinct = <T>(array: T[]) => {
  return array.filter((value, index, array) => array.indexOf(value) === index);
};

const arrayDistinctBy = <T, K>(array: T[], keySelector: (item: T) => K) => {
  const seen = new Set<K>();
  return array.filter((item) => {
    const key = keySelector(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};

function formatPathToDisplayName(path: string): string {
  const fileName = path.split("/").pop();

  if (!fileName) {
    return "";
  }

  const nameWithoutExtension = fileName.includes(".")
    ? fileName.substring(0, fileName.lastIndexOf("."))
    : fileName;

  const formattedName = nameWithoutExtension
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return formattedName;
}

const constructNewUrl = (
  paramKey: string,
  paramValue: string,
  pathname: string,
  urlSearchParams: URLSearchParams,
  options?: {
    append?: boolean;
    oldParamValue?: string;
  }
) => {
  if (paramValue) {
    if (options?.append && !urlSearchParams.has(paramKey, paramValue)) {
      urlSearchParams.append(paramKey, paramValue);
    } else {
      urlSearchParams.set(paramKey, paramValue);
    }
  } else {
    urlSearchParams.delete(paramKey, options?.oldParamValue);
  }
  return `${pathname}?${urlSearchParams.toString()}`;
};

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function camelToScreamingSnakeCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1_$2").toUpperCase();
}

export {
  formatPathToDisplayName,
  constructNewUrl,
  arrayDistinct,
  arrayDistinctBy,
  capitalizeFirstLetter,
  camelToScreamingSnakeCase,
};
