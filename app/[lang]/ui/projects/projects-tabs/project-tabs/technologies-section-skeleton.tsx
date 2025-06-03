import { Skeleton } from "@/components/ui/skeleton";
import ProgrammingLanguageComboboxSkeleton from "./technologies-section/programming-languages-combobox-skeleton";

const TechnologiesSectonSkeleton = () => {
  return (
    <div className="space-y-2">
      <ProgrammingLanguageComboboxSkeleton />
      <div>
        <div className="flex flex-wrap gap-1 justify-center">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="inline-flex items-center rounded-md border px-2.5 py-1 text-sm gap-2 bg-secondary text-secondary-foreground"
            >
              <Skeleton className="w-5 h-5" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnologiesSectonSkeleton;
