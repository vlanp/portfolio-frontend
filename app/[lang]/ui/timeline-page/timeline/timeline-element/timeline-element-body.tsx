"use client";

import { cn } from "@/lib/utils";
import { IDispatchedTimelineDatas } from "@/types/ITimelineData";
import { useLayoutEffect, useRef, useState } from "react";
import { startYearHeightPx } from "../timeline-element";

const linesWidhtPx = 8;
const containerRelativeWidth = 3 / 4;
const marginYPx = 8;

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
    (Math.atan((startYearHeightPx - marginYPx) / (containerWidth / 2)) * 360) /
      (2 * Math.PI);

  const hypotenusePx = Math.sqrt(
    Math.pow(startYearHeightPx - marginYPx, 2) + Math.pow(containerWidth / 2, 2)
  );

  const scale = hypotenusePx / (startYearHeightPx - marginYPx);

  return (
    <div
      className="absolute flex top-0 left-0 right-0 bottom-0 justify-center"
      style={{ marginTop: marginYPx, marginBottom: marginYPx }}
    >
      <div
        id="timeline-1"
        className={cn("absolute h-full rounded-sm", bgThemeColor)}
        style={{ width: linesWidhtPx }}
      >
        {dispatchedTimelineDatas.timeline1.map((t) => t.jsxElement)}
      </div>
      <div
        id="timeline-2"
        className="absolute top-0 bottom-0 flex"
        style={{
          left: `${(100 * (1 - containerRelativeWidth)) / 2 + 1}%`,
          width: linesWidhtPx,
          marginTop: startYearHeightPx - marginYPx - 5,
          marginBottom: startYearHeightPx - marginYPx - 5,
        }}
      >
        <span className={cn("flex-1 rounded-sm", bgThemeColor)} />
        {dispatchedTimelineDatas.timeline2.map((t) => t.jsxElement)}
      </div>
      <div
        id="timeline-3"
        className="absolute top-0 bottom-0 flex"
        style={{
          right: `${(100 * (1 - containerRelativeWidth)) / 2 + 1}%`,
          width: linesWidhtPx,
          marginTop: startYearHeightPx - marginYPx - 5,
          marginBottom: startYearHeightPx - marginYPx - 5,
        }}
      >
        <span className={cn("flex-1 rounded-sm", bgThemeColor)} />
        {dispatchedTimelineDatas.timeline3.map((t) => t.jsxElement)}
      </div>
      <div
        className="relative"
        ref={containerRef}
        style={{
          height: startYearHeightPx - marginYPx,
          width: `${containerRelativeWidth * 100}%`,
        }}
      >
        <div
          className={cn(
            "absolute rounded-sm top-0 h-full origin-top",
            bgThemeColor
          )}
          style={{
            width: linesWidhtPx,
            left: `calc(50% - ${linesWidhtPx}px / 2 - 2px)`,
            transform: `rotate(-${rotationValue}deg) scaleY(${scale})`,
          }}
        />

        <div
          className={cn(
            "absolute rounded-sm top-0 h-full origin-top",
            bgThemeColor
          )}
          style={{
            width: linesWidhtPx,
            left: `calc(50% - ${linesWidhtPx}px / 2 + 2px)`,
            transform: `rotate(${rotationValue}deg) scaleY(${scale})`,
          }}
        />
      </div>
      <div
        className="absolute bottom-0"
        style={{
          height: startYearHeightPx - marginYPx,
          width: `${containerRelativeWidth * 100}%`,
        }}
      >
        <div
          className="relative"
          ref={containerRef}
          style={{ height: startYearHeightPx - marginYPx }}
        >
          <div
            className={cn(
              "absolute rounded-sm bottom-0 h-full origin-bottom",
              bgThemeColor
            )}
            style={{
              width: linesWidhtPx,
              left: `calc(50% - ${linesWidhtPx}px / 2 + 2px)`,
              transform: `rotate(-${rotationValue}deg) scaleY(${scale})`,
            }}
          />

          <div
            className={cn(
              "absolute rounded-sm bottom-0 h-full origin-bottom",
              bgThemeColor
            )}
            style={{
              width: linesWidhtPx,
              left: `calc(50% - ${linesWidhtPx}px / 2 - 2px)`,
              transform: `rotate(${rotationValue}deg) scaleY(${scale})`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TimelineElementBody;
export { linesWidhtPx, marginYPx, containerRelativeWidth };
