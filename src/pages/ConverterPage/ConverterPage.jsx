import React from "react";
import cl from "./ConverterPage.module.scss";
import Converter from "../../components/Converter/Converter";

const ConverterPage = () => {
  return (
    <main className={cl.main}>
      <div className={cl.mainWrapper}>
        <Converter/>
        <div className={cl.plug}>
        </div>
      </div>
    </main>
  );
};

export default ConverterPage;