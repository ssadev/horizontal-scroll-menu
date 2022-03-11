import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";
import ScrollMenu from "./ScrollMenu";
import Card from "./components/card";
import Tag from "./components/tag";

const Tags = Array(15)
  .fill(0)
  .map((_, idx) => (
    <>
      <Tag />
    </>
  ));

const App = () => {
  return (
    <div>
      <ScrollMenu
        data={Tags}
        leftArrow={
          <ArrowCircleLeftIcon className="h-6 w-6 ml-3 rounded-full cursor-pointer" />
        }
        rightArrow={
          <ArrowCircleRightIcon className="h-6 w-6 ml-3 rounded-full cursor-pointer" />
        }
      />
    </div>
  );
};

export default App;
