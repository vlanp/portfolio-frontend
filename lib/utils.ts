import { clsx, type ClassValue } from "clsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams, redirect } from "next/navigation";
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
  searchParams: Record<string, string> | ReadonlyURLSearchParams
) => {
  const params = new URLSearchParams(searchParams);
  if (paramValue) {
    params.set(paramKey, paramValue);
  } else {
    params.delete(paramKey);
  }
  return `${pathname}?${params.toString()}`;
};

const setSPInSC = (
  paramKey: string,
  paramValue: string,
  pathname: string,
  searchParams: Record<string, string>
) => {
  const newUrl = constructNewUrl(paramKey, paramValue, pathname, searchParams);
  redirect(newUrl);
};

const setSPInCC = (
  paramKey: string,
  paramValue: string,
  searchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance,
  pathname: string
) => {
  const newUrl = constructNewUrl(paramKey, paramValue, pathname, searchParams);
  router.replace(newUrl);
};

export { formatPathToDisplayName, setSPInSC, setSPInCC, constructNewUrl };
