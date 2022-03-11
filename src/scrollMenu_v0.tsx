/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createRef, useEffect, useState } from "react";
import "../App.css";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/outline";

const Tags: { id: string }[] = Array(15)
  .fill(0)
  .map((_, ind) => ({ id: `Cat-` }));
const ScrollMenu = () => {
  const tagsContainerElm = createRef<HTMLDivElement>();
  const [scrollWidth, setScrollWidth] = useState<number>(0);
  const [clientWidth, setClientWidth] = useState<number>(0);
  const [scrollableWidth, setScrollableWidth] = useState<number>(0);
  const [scrollable, setScrollable] = useState<{ left: number; right: number }>(
    {
      left: 0,
      right: 0,
    }
  );
  const [isLeftScrollActive, setIsLeftScrollActive] = useState(false);
  const [isRightScrollActive, setIsRightScrollActive] = useState(true);
  const [scrollPerLength, setScrollPerLength] = useState(100);
  const [currectView, setCurrectView] = useState(0);

  const handleLeftScroll = () => {
    if (currectView > 0) {
      tagsContainerElm.current?.scroll({
        left: currectView - scrollPerLength,
        behavior: "smooth",
      });
      setCurrectView(currectView - scrollPerLength);
    }
  };

  const handleRightScroll = () => {
    if (scrollableWidth > 0 && currectView < scrollableWidth) {
      tagsContainerElm.current?.scroll({
        left: currectView + scrollPerLength,
        behavior: "smooth",
      });
      setCurrectView(currectView + scrollPerLength);
    }
  };

  useEffect(() => {
    const clientWidth = tagsContainerElm.current?.clientWidth
      ? tagsContainerElm.current?.clientWidth
      : 0;
    const scrollWidth = tagsContainerElm.current?.scrollWidth
      ? tagsContainerElm.current?.scrollWidth
      : 0;
    setClientWidth(clientWidth);
    setScrollWidth(scrollWidth);
  }, [tagsContainerElm]);

  useEffect(() => {
    setScrollableWidth(scrollWidth - clientWidth);
  }, [scrollWidth, clientWidth]);

  useEffect(() => {}, [scrollable]);

  useEffect(() => {
    if (scrollableWidth > 0) {
      // scroll range per click defined
      setScrollPerLength(scrollableWidth / Tags.length + 100);
      // inital scollability
      setScrollable({
        right: scrollableWidth,
        left: 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollableWidth]);

  useEffect(() => {
    // Left scroll btn status
    if (currectView <= 0) {
      setIsLeftScrollActive(false);
    } else {
      setIsLeftScrollActive(true);
    }
    // Right scroll btn status
    if (currectView >= scrollableWidth || clientWidth >= scrollWidth) {
      setIsRightScrollActive(false);
    } else {
      setIsRightScrollActive(true);
    }
  }, [currectView, scrollableWidth, clientWidth, scrollWidth]);

  useEffect(() => {
    tagsContainerElm.current?.addEventListener(
      "scroll",
      (event) => {
        if (tagsContainerElm.current?.scrollLeft !== undefined) {
          const scrollRN = tagsContainerElm.current?.scrollLeft;
          if (scrollRN !== 0) {
            setCurrectView(scrollRN);
            setScrollable({
              right: scrollableWidth - scrollRN,
              left: 0 + scrollRN,
            });
          } else {
            // returen back scrollable to inital value when scollLeft is 0
            setCurrectView(0);
            setScrollable({
              right: scrollableWidth,
              left: 0,
            });
          }
        }
      },
      { passive: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagsContainerElm]);

  return (
    <div className="App">
      <div className="px-32 mt-3 py-2 ">
        <div className="flex flex-row h-20 items-center container rounded-md">
          <div
            className={`py-2 px-2 -ml-2 text-black`}
            onClick={handleLeftScroll}
          >
            {isLeftScrollActive ? (
              <ChevronLeftIcon className="h-6 w-6 mr-3 rounded-full cursor-pointer" />
            ) : (
              <></>
            )}
          </div>

          <div
            className="tags-container flex flex-row items-center h-full overflow-x-auto"
            ref={tagsContainerElm}
          >
            {Tags.map((tag, idx) => (
              <div
                key={idx}
                className="bg-gray-100 py-2 px-8 mx-1 rounded-full whitespace-nowrap cursor-pointer hover:bg-gray-300"
              >
                {tag.id + (idx + 1)}
              </div>
            ))}
          </div>
          <div
            className={`py-2 px-2 ml-1 text-black`}
            onClick={handleRightScroll}
          >
            {isRightScrollActive ? (
              <ChevronRightIcon className="h-6 w-6 ml-3 rounded-full cursor-pointer" />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollMenu;
