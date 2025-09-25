import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PageContainer = ({
  children,
  className,
  inCard,
  ...props
}: React.ComponentProps<"div"> & {
  inCard?: boolean;
}) => {
  return inCard ? (
    <Card {...props} className={cn("p-5 m-5", className)}>
      {children}
    </Card>
  ) : (
    <section {...props} className={cn("p-5", className)}>
      {children}
    </section>
  );
};

export default PageContainer;
