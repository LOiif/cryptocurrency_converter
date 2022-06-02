import React from "react";
import cl from "./Loader.module.scss";

const Loader = ({ width = 30, height = 30, backgroundColor = "#212b41" }) => {
  return (
    <div className={cl.loader} style={{ width: width + "px", height: height + "px", backgroundColor }}>
    </div>
  );
};

export default Loader;