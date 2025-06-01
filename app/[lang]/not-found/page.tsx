import Link from "next/link";
import { HiOutlineFaceFrown } from "react-icons/hi2";
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
      <HiOutlineFaceFrown className="text-gray-400 size-10" />
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>{dict["404NotFound"].Description}</p>
      <Link className={buttonVariants({ variant: "outline" })} href="/">
        {dict["404NotFound"].GoBack}
      </Link>
    </main>
  );
}
