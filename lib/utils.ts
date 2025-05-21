import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export { formatPathToDisplayName, constructNewUrl };
