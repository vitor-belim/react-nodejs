import React from "react";
import "./Spinner.css";

const Spinner = ({ height, isLoading = false, size = "normal" }) => {
  let containerClasses = ["loader-container"];
  if (!isLoading) {
    containerClasses.push("hidden");
  }
  if (size === "full-page") {
    containerClasses.push("full-page");
  }

  let loaderClasses = ["loader"];
  if (size !== "normal") {
    loaderClasses.push(size);
  }

  const style = {};
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
