import { Skeleton } from "@/components/ui/skeleton";

const HtmlMarkdownContentSkeleton = () => {
  return (
    <section className="max-w-full flex flex-1 justify-center py-5 animate-pulse">
      <div
        role="status"
        className="max-w-6xl flex-1 flex flex-col items-center px-4"
      >
        <Skeleton className="h-[48px] w-80 mb-4" />
        <Skeleton className="h-[30px] w-60 mb-2" />
        <div className="border-t-1 w-full mb-4" />
        <Skeleton className="w-full h-[25px] mb-2" />
        <Skeleton className="w-3/4 h-[25px] mb-2 self-start" />
        <Skeleton className="w-30 h-[40px] mb-2 mt-2 self-start" />
        <Skeleton className="w-50 h-[35px] mb-2 mt-1 self-start" />
        <Skeleton className="w-full h-[25px] mb-2" />
        <Skeleton className="w-3/4 h-[25px] mb-2 self-start" />
        <Skeleton className="w-20 h-[30px] mt-1 mb-2 self-start" />
        <pre className="w-full">
          <code className="hljs language-ts">
            <Skeleton className="w-30 h-[25px] mb-2 mt-2 self-start" />
            <Skeleton className="w-full h-[25px] mt-5 mb-2" />
            <Skeleton className="w-full h-[25px] mb-2" />
            <Skeleton className="w-full h-[25px] mb-2" />
            <Skeleton className="w-full h-[25px] mt-5 mb-2" />
            <Skeleton className="w-full h-[25px] mb-2" />
            <Skeleton className="w-full h-[25px] mb-2" />
          </code>
        </pre>
        <div className="flex flex-row justify-between w-full">
          <div>
            <Skeleton className="w-20 h-[25px] mb-2" />
            <Skeleton className="w-50 h-[35px] mb-2" />
          </div>
          <div>
            <Skeleton className="w-20 h-[25px] mb-2" />
            <Skeleton className="w-50 h-[35px] mb-2" />
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </section>
  );
};

export default HtmlMarkdownContentSkeleton;
