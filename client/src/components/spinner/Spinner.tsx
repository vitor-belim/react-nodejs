import React, { CSSProperties } from "react";
import SpinnerSize from "../../models/spinner-size";
import "./Spinner.css";

interface SpinnerProps {
  isLoading: boolean;
  height?: number;
  size?: SpinnerSize;
}

const Spinner = ({
  isLoading,
  height = undefined,
  size = SpinnerSize.NORMAL,
}: SpinnerProps) => {
  let containerClasses = ["loader-container"];
  if (!isLoading) {
    containerClasses.push("hidden");
  }
  if (size === SpinnerSize.FULL_PAGE) {
    containerClasses.push(SpinnerSize.FULL_PAGE);
  }

  let loaderClasses = ["loader"];
  if (size && size !== SpinnerSize.NORMAL) {
    loaderClasses.push(size);
  }

  const style: CSSProperties = {};
  if (height) {
    style.height = height + "px";
  }

  return (
    <div className={containerClasses.join(" ")} style={style}>
      <div className={loaderClasses.join(" ")}></div>
    </div>
  );
};

export default Spinner;
