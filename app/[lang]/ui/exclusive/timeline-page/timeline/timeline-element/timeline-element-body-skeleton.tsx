"use client";

import { cn } from "@/lib/utils";
import { useLayoutEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  createDispatchedTimelineDatas,
  IDispatchedTimelineDatas,
  selectTimeline,
} from "@/types/ITimelineData";
import { useIsBelowBP } from "@/hooks/useIsBelowBP";
import { largeBreakpoint, mobileBreakpoint } from "@/types/IBreakpoints";
import {
  middleTimelineMarginYPx,
  sideTimelineMarginYPx,
  startYearHeightPx,
  timelineElementRelativeWidthToContainer,
  timelineWidthPx,
} from "../../timeline";

const TimelineElementBodySkeleton = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [dispatchedTimelineDatas, setDispatchedTimelineDatas] = useState<
    IDispatchedTimelineDatas<3 | 1 | 2> | undefined
  >(undefined);
  const isBelowMobileBp = useIsBelowBP(mobileBreakpoint);
  const isBelowLargeBp = useIsBelowBP(largeBreakpoint);

  useLayoutEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, []);

  useLayoutEffect(() => {
    const elementsGenerator = () => {
      const timelineBody = document.getElementById("timeline-body");
      if (!timelineBody) {
        console.error('Element with id "timeline-body" not found');
        return;
      }

      const dispatchedTimelineDatas = createDispatchedTimelineDatas([1, 2, 3]);

      const containerHeightPx = timelineBody.clientHeight;
      const minElementHeightPx = 5;
      const maxElementHeightPx = 300;

      const count = Math.floor(Math.random() * 5) + 10;

      [...Array(count).keys()].forEach((sn) => {
        const fromTopPx = Math.floor(
          Math.random() *
            (containerHeightPx - minElementHeightPx - 2 * startYearHeightPx)
        );
        const randomHeightPx = Math.floor(
          Math.random() * (maxElementHeightPx - minElementHeightPx) +
            minElementHeightPx
        );
        const heightPx =
          fromTopPx + randomHeightPx + 2 * startYearHeightPx < containerHeightPx
            ? randomHeightPx
            : minElementHeightPx;

        const timeline = selectTimeline(
          dispatchedTimelineDatas,
          fromTopPx,
          heightPx
        );

        if (!timeline) {
          return;
        }

        dispatchedTimelineDatas[timeline].push({
          fromTopPx,
          heightPx,
          jsxElement: (
            <Skeleton
              key={sn}
              className={cn(
                "absolute rounded-sm hover:cursor-pointer flex justify-center items-center"
              )}
              style={{
                top: fromTopPx,
                height: heightPx,
                width: 24,
                left: -(24 / 2 - timelineWidthPx / 2),
              }}
            />
          ),
        });
      });

      setDispatchedTimelineDatas(dispatchedTimelineDatas);
    };

    elementsGenerator();
  }, [isBelowLargeBp, isBelowMobileBp]);

  const rotationValue =
    90 -
    (Math.atan(
      (startYearHeightPx - middleTimelineMarginYPx) / (containerWidth / 2)
    ) *
      360) /
      (2 * Math.PI);

  const hypotenusePx = Math.sqrt(
    Math.pow(startYearHeightPx - middleTimelineMarginYPx, 2) +
      Math.pow(containerWidth / 2, 2)
  );

  const scale = hypotenusePx / (startYearHeightPx - middleTimelineMarginYPx);

  return (
    <div
      id="timeline-body"
      className="absolute flex top-0 left-0 right-0 bottom-0 justify-center"
      style={{
        marginTop: middleTimelineMarginYPx,
        marginBottom: middleTimelineMarginYPx,
      }}
    >
      <Skeleton
        id="timeline-1"
        className={cn("absolute h-full rounded-sm")}
        style={{ width: timelineWidthPx }}
      >
        {dispatchedTimelineDatas &&
          dispatchedTimelineDatas.timeline1.map((t) => t.jsxElement)}
      </Skeleton>
      <div
        id="timeline-2"
        className="absolute top-0 bottom-0 flex"
        style={{
          left: `${(100 * (1 - timelineElementRelativeWidthToContainer)) / 2 + 1}%`,
          width: timelineWidthPx,
          marginTop: sideTimelineMarginYPx,
          marginBottom: sideTimelineMarginYPx,
        }}
      >
        <Skeleton className={cn("flex-1 rounded-sm")} />
        {dispatchedTimelineDatas &&
          dispatchedTimelineDatas.timeline2.map((t) => t.jsxElement)}
      </div>
      <div
        id="timeline-3"
        className="absolute top-0 bottom-0 flex"
        style={{
          right: `${(100 * (1 - timelineElementRelativeWidthToContainer)) / 2 + 1}%`,
          width: timelineWidthPx,
          marginTop: sideTimelineMarginYPx,
          marginBottom: sideTimelineMarginYPx,
        }}
      >
        <Skeleton className={cn("flex-1 rounded-sm")} />
        {dispatchedTimelineDatas &&
          dispatchedTimelineDatas.timeline3.map((t) => t.jsxElement)}
      </div>
      <div
        className="relative"
        ref={containerRef}
        style={{
          height: startYearHeightPx - middleTimelineMarginYPx,
          width: `${timelineElementRelativeWidthToContainer * 100}%`,
        }}
      >
        <Skeleton
          className={cn("absolute rounded-sm top-0 h-full origin-top")}
          style={{
            width: timelineWidthPx,
            left: `calc(50% - ${timelineWidthPx}px / 2 - 2px)`,
            transform: `rotate(-${rotationValue}deg) scaleY(${scale})`,
          }}
        />

        <Skeleton
          className={cn("absolute rounded-sm top-0 h-full origin-top")}
          style={{
            width: timelineWidthPx,
            left: `calc(50% - ${timelineWidthPx}px / 2 + 2px)`,
            transform: `rotate(${rotationValue}deg) scaleY(${scale})`,
          }}
        />
      </div>
      <div
        className="absolute bottom-0"
        style={{
          height: startYearHeightPx - middleTimelineMarginYPx,
          width: `${timelineElementRelativeWidthToContainer * 100}%`,
        }}
      >
        <div
          className="relative"
          ref={containerRef}
          style={{ height: startYearHeightPx - middleTimelineMarginYPx }}
        >
          <Skeleton
            className={cn("absolute rounded-sm bottom-0 h-full origin-bottom")}
            style={{
              width: timelineWidthPx,
              left: `calc(50% - ${timelineWidthPx}px / 2 + 2px)`,
              transform: `rotate(-${rotationValue}deg) scaleY(${scale})`,
            }}
          />

          <Skeleton
            className={cn("absolute rounded-sm bottom-0 h-full origin-bottom")}
            style={{
              width: timelineWidthPx,
              left: `calc(50% - ${timelineWidthPx}px / 2 - 2px)`,
              transform: `rotate(${rotationValue}deg) scaleY(${scale})`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineElementBodySkeleton;
