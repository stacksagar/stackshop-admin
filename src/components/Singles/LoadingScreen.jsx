import React from "react";

const LoadingScreen = () => {
  return (
    <div className="w-full z-50 h-full flex items-center justify-center">
      <div
        className="w-10 h-10 rounded-full border-4 border-white animate-spin"
        style={{borderRightColor: "#999"}}
      />
    </div>
  );
};

export default LoadingScreen;
