import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { getDictionary, IDictionary } from "../dictionaries";

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
      <Link
        href="/"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        {dict["404NotFound"].GoBack}
      </Link>
    </main>
  );
}
