import React, { CSSProperties } from "react";
import SpinnerSize from "../../models/enums/spinner-size";
import "./Spinner.scss";

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
  let containerClasses = "spinner-container";
  if (!isLoading) {
    containerClasses += " hidden";
  }
  if (size === SpinnerSize.FULL_PAGE) {
    containerClasses += " " + SpinnerSize.FULL_PAGE;
  }

  let loaderClasses = "spinner";
  if (size && size !== SpinnerSize.NORMAL) {
    loaderClasses += " " + size;
  }

  const style: CSSProperties = {};
  if (height) {
    style.height = height + "px";
  }

  return (
    <div className={containerClasses} style={style}>
      <div className={loaderClasses}></div>
    </div>
  );
};

export default Spinner;
