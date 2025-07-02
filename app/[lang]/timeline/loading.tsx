import PageContainer from "../ui/shared/page-container";
import TimelineSkeleton from "../ui/exclusive/timeline-page/timeline-skeleton";

const Loading = () => {
  return (
    <PageContainer className="flex grow justify-center">
      <TimelineSkeleton />
    </PageContainer>
  );
};

export default Loading;
