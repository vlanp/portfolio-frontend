import { clsx, type ClassValue } from "clsx";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function formatPathToDisplayName(path: string): string {
  const fileName = path.split("/").pop();

  console.log(path);

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

const setSPInSC = (paramKey: string, paramValue: string, pathname: string) => {
  const params = new URLSearchParams();
  params.set(paramKey, paramValue);
  redirect(`${pathname}?${params.toString()}`);
};

export { formatPathToDisplayName, setSPInSC };
