"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { titleContainerSizePx } from "../timeline-container";
import { yearDivHeightPx } from "./year-timeline";

const TimelineBackground = () => {
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
    <div className="absolute flex top-0 bottom-0 left-0 right-0">
      <div
        className="flex flex-col flex-1"
        style={{ paddingTop: `${titleContainerSizePx}px` }}
      >
        {[...Array(yearCount).keys()].map((year) => {
          return (
            <div className="flex flex-1 items-center" key={year}>
              <p className="h-px w-full border-t border-dashed border-border"></p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineBackground;
