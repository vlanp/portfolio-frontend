import { redirect, RedirectType } from "next/navigation";

export default function NotFoundCatchAll() {
  return redirect("/not-found", RedirectType.replace);
}
