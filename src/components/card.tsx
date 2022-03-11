import React from "react";
import lacy from "../assets/lacy-spice.jpg";

const Card = () => {
  return (
    <>
      <div className="flex flex-col justify-center p-4 mx-2 border-2 border-green-300 hover:shadow-lime-300 shadow-lg rounded-md bg-green-100 hover:bg-green-300 cursor-pointer">
        <div className="w-60">
          <img
            src={lacy}
            width={500}
            className="w-full rounded cursor-grabbing"
            alt="lacy spice"
          />
        </div>
        <h2 className="whitespace-nowrap text-xl py-2">Lacy Spice</h2>
        <p className="pb-2 text-slate-600">
          Minim et excepteur nostrud in irure amet velit eu minim elit.
        </p>
      </div>
    </>
  );
};

export default Card;
