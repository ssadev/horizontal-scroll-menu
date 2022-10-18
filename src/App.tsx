import React from "react";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";
import ScrollMenu from "./ScrollMenu";
import Tag from "./components/tag";

const Tags = Array(15)
  .fill(0)
  .map((_, idx) => (
    <>
      <Tag />
      {/* <Card /> */}
    </>
  ));
const Footer = () => {
    return (
        <>
            <footer>
                <p>Created with ❤️ by Ssadev</p>
            </footer>


        </>
    )
};
const App = () => {
  return (
    <div className="container px-20">
      <ScrollMenu
        data={Tags}
        leftArrow={
          <ArrowCircleLeftIcon className="h-6 w-6 ml-3 rounded-full cursor-pointer" />
        }
        rightArrow={
          <ArrowCircleRightIcon className="h-6 w-6 ml-3 rounded-full cursor-pointer" />
        }
      />

<Footer></Footer>
    </div>
  );
};

export default App;
