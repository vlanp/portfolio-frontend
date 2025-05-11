import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { getDictionary, IDictionary } from "../dictionaries";
import { buttonVariants } from "@/components/ui/button";

export default async function NotFound({
  params,
}: {
  params: Promise<{ lang: "en" | "fr" }>;
}) {
  const { lang } = await params;
  const dict: IDictionary = await getDictionary(lang);
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>{dict["404NotFound"].Description}</p>
      <Link className={buttonVariants({ variant: "outline" })} href="/">
        {dict["404NotFound"].GoBack}
      </Link>
    </main>
  );
}
