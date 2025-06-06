import { cn } from "@/lib/utils";

const PageContainer = ({
  children,
  className,
  ...props
}: React.ComponentProps<"section">) => {
  return (
    <section {...props} className={cn("p-5", className)}>
      {children}
    </section>
  );
};

export default PageContainer;
