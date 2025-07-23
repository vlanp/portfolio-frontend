"use client";

import { cn } from "@/lib/utils";
import { IDispatchedTimelineDatas } from "@/types/ITimelineData";
import { useLayoutEffect, useRef, useState } from "react";
import {
  middleTimelineMarginYPx,
  sideTimelineMarginYPx,
  startYearHeightPx,
  timelineElementRelativeWidthToContainer,
  timelineWidthPx,
} from "../../timeline";

const TimelineElementBody = ({
  bgThemeColor,
  dispatchedTimelineDatas,
}: {
  bgThemeColor: `bg-chart-${number}`;
  dispatchedTimelineDatas: IDispatchedTimelineDatas<3 | 1 | 2>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  useLayoutEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
  }, []);

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
      className="absolute flex top-0 left-0 right-0 bottom-0 justify-center"
      style={{
        marginTop: middleTimelineMarginYPx,
        marginBottom: middleTimelineMarginYPx,
      }}
    >
      <div
        id="timeline-1"
        className={cn("absolute h-full rounded-sm", bgThemeColor)}
        style={{ width: timelineWidthPx }}
      >
        {dispatchedTimelineDatas.timeline1.map((t) => t.jsxElement)}
      </div>
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
        <span className={cn("flex-1 rounded-sm", bgThemeColor)} />
        {dispatchedTimelineDatas.timeline2.map((t) => t.jsxElement)}
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
        <span className={cn("flex-1 rounded-sm", bgThemeColor)} />
        {dispatchedTimelineDatas.timeline3.map((t) => t.jsxElement)}
      </div>
      <div
        className="relative"
        ref={containerRef}
        style={{
          height: startYearHeightPx - middleTimelineMarginYPx,
          width: `${timelineElementRelativeWidthToContainer * 100}%`,
        }}
      >
        <div
          className={cn(
            "absolute rounded-sm top-0 h-full origin-top",
            bgThemeColor
          )}
          style={{
            width: timelineWidthPx,
            left: `calc(50% - ${timelineWidthPx}px / 2 - 2px)`,
            transform: `rotate(-${rotationValue}deg) scaleY(${scale})`,
          }}
        />

        <div
          className={cn(
            "absolute rounded-sm top-0 h-full origin-top",
            bgThemeColor
          )}
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
          <div
            className={cn(
              "absolute rounded-sm bottom-0 h-full origin-bottom",
              bgThemeColor
            )}
            style={{
              width: timelineWidthPx,
              left: `calc(50% - ${timelineWidthPx}px / 2 + 2px)`,
              transform: `rotate(-${rotationValue}deg) scaleY(${scale})`,
            }}
          />

          <div
            className={cn(
              "absolute rounded-sm bottom-0 h-full origin-bottom",
              bgThemeColor
            )}
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

export default TimelineElementBody;
