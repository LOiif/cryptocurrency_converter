import React, { useState } from "react";
import cl from "./ConverterPage.module.scss";
import Converter from "../../components/Converter/Converter";
import Graph from "../../components/Graph/Graph";

const ConverterPage = () => {
  const [coinIdFrom, setCoinIdFrom] = useState("bitcoin");
  const [coinIdTo, setCoinIdTo] = useState("bitcoin");

  const changeCoins = (id, type) => {
    if (type === "from") {
      setCoinIdFrom(() => id);
    } else if (type === "to") {
      setCoinIdTo(() => id);
    }
  };

  return (
    <main className={cl.main}>
      <div className={cl.mainWrapper}>
        <Converter changeCoins={changeCoins} coinIdFrom={coinIdFrom} coinIdTo={coinIdTo} />
        <Graph coinIdFrom={coinIdFrom} coinIdTo={coinIdTo} />
      </div>
    </main>
  );
};

export default ConverterPage;