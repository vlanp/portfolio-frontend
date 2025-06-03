import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LuChevronsUpDown } from "react-icons/lu";

const ProgrammingLanguageComboboxSkeleton = () => {
  return (
    <Button
      variant="ghost"
      className="w-full text-md flex justify-center gap-2 cursor-not-allowed"
      disabled
    >
      <Skeleton className="h-5 w-32" />
      <Skeleton className="h-5 w-5" />
      <LuChevronsUpDown className="opacity-30" />
    </Button>
  );
};

export default ProgrammingLanguageComboboxSkeleton;
