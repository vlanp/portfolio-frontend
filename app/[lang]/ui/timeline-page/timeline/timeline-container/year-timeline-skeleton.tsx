"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useLayoutEffect, useRef, useState } from "react";
import { titleContainerSizePx } from "../timeline-container";
import { yearDivHeightPx } from "./year-timeline";

const YearTimeline = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [yearCount, setYearCount] = useState(0);

  useLayoutEffect(() => {
    const calculateYearCount = () => {
      if (!containerRef.current) return;

      const containerHeight = containerRef.current.clientHeight;

      const yearCount = Math.floor(containerHeight / yearDivHeightPx);

      setYearCount(yearCount);
    };

    calculateYearCount();

    const handleResize = () => calculateYearCount();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="flex flex-col flex-1"
      style={{ paddingTop: `${titleContainerSizePx}px` }}
      ref={containerRef}
    >
      {[...Array(yearCount).keys()].map((index) => {
        return (
          <div
            key={index}
            className={`flex flex-row items-center gap-2 px-2`}
            style={{ minHeight: `${yearDivHeightPx}px` }}
          >
            <p className="flex-1 h-px bg-border"></p>
            <Skeleton className="h-[26px] w-[50px]" />
            <p className="flex-1 h-px bg-border"></p>
          </div>
        );
      })}
    </div>
  );
};

export default YearTimeline;
