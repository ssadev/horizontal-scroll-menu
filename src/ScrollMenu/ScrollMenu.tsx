/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createRef, FC, useEffect, useState } from "react";
import "../App.css";

interface IProps {
  data: object[];
  leftArrow?: JSX.Element | null;
  rightArrow?: JSX.Element | null;
}

const ScrollMenu: FC<IProps> = ({ data, leftArrow, rightArrow, ...props }) => {
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
      setScrollPerLength(scrollableWidth / data.length + 100);
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
    <>
      {/* <div className="px-3 py-2"> */}
      <div className="flex flex-row py-10 items-center container rounded-md px-3">
        {leftArrow && (
          <div
            className={`py-2 px-2 -ml-2 text-black`}
            onClick={handleLeftScroll}
          >
            {isLeftScrollActive ? leftArrow : <></>}
          </div>
        )}
        <div
          className="tags-container flex flex-row items-center h-full overflow-x-auto py-4"
          ref={tagsContainerElm}
        >
          {data.map((tag, idx) => (
            <>{tag}</>
          ))}
        </div>

        {rightArrow && (
          <div
            className={`py-2 px-2 -ml-2 text-black`}
            onClick={handleRightScroll}
          >
            {isRightScrollActive ? rightArrow : <></>}
          </div>
        )}
      </div>
      {/* </div> */}
    </>
  );
};

export default ScrollMenu;
