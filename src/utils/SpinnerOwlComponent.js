import React from "react";
import SpinnerIcon from "./SpinnerIcon";
import SpinnerOwl from "./SpinnerOwl";
import OriginalIcon from "./OriginalIcon";

export default function SpinnerOwlComponent() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {/* <SpinnerIcon /> */}
      {/* <SpinnerOwl /> */}
      <OriginalIcon />
    </div>
  );
}
