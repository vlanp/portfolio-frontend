import PageContainer from "../ui/page-container";
import TimelineSkeleton from "../ui/timeline-page/timeline-skeleton";

const Loading = () => {
  return (
    <PageContainer className="flex grow justify-center">
      <TimelineSkeleton />
    </PageContainer>
  );
};

export default Loading;
