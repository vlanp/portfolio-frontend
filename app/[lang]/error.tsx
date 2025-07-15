"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { startTransition, useEffect } from "react";
import coyoteFail from "../../public/coyote-fail.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const handleClick = () => {
    // https://github.com/vercel/next.js/issues/63369#issuecomment-2211698627
    startTransition(() => {
      // calling order does not matter
      reset();
      router.refresh();
    });
  };

  return (
    <div className="flex flex-1 flex-col justify-center items-center gap-5 px-10">
      <h2 className="text-center">Something went wrong !</h2>
      <Image src={coyoteFail} alt="coyote failing" />
      <Button
        size={"lg"}
        className="text-lg"
        onClick={
          // Attempt to recover by trying to re-render the segment
          handleClick
        }
      >
        Try again
      </Button>
    </div>
  );
}
