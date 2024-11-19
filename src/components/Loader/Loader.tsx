import React from "react";
import { BeatLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <BeatLoader size={30} color="#A020F0" />
    </div>
  );
};

export default Loader;
