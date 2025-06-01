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
  urlSearchParams: URLSearchParams
) => {
  if (paramValue) {
    urlSearchParams.set(paramKey, paramValue);
  } else {
    urlSearchParams.delete(paramKey);
  }
  return `${pathname}?${urlSearchParams.toString()}`;
};

export {
  formatPathToDisplayName,
  constructNewUrl,
  arrayDistinct,
  arrayDistinctBy,
};
