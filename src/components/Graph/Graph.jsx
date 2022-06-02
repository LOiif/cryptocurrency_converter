import React, { useEffect, useMemo, useState } from "react";
import cl from "./Graph.module.scss";
import LineGraph from "../LineGraph/LineGraph";
import GeckoService from "../../API/GeckoService";
import { currencies } from "../../utils/constants";
import Loader from "../UI/Loader/Loader";

const Graph = ({ coinIdFrom, coinIdTo }) => {

  const [labels, setLabels] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [priceChange, setPriceChange] = useState(0);
  const [isPriceLoading, setIsPriceLoading] = useState(false);

  useEffect(() => {
    fetchPriceRange();
  }, [coinIdFrom, coinIdTo]);

  const fetchPriceRange = async () => {
    setIsPriceLoading(true);
    try {
      const resp = (coinIdFrom === "usd")
        ? await GeckoService.getPriceRange(coinIdTo, coinIdFrom)
        : await GeckoService.getPriceRange(coinIdFrom, coinIdTo);

      const dates = resp.map((el) => new Date(el[0]));
      const prices = resp.map((el) => {
        if (coinIdFrom === "usd") {
          return 1 / el[1];
        }
        return el[1];
      });

      setGraphData(prices);

      const percent = (prices[prices.length - 1].toPrecision(5)) / (prices[0].toPrecision(5)) * 100 - 100;
      setPriceChange(percent);

      const days = dates.map((date) => date.toLocaleString("default", { month: "short", day: "numeric" }));

      setLabels(days);
    } catch (e) {
      console.log(e);
    } finally {
      setIsPriceLoading(false);
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Цена",
        data: graphData,
        borderColor: "royalblue",
        backgroundColor: "royalblue",
        tension: 0.2,
        tooltip: {
          callbacks: {
            label: function(item) {
              return `${item.dataset.label}: 
             ${(item.dataset.data[item.dataIndex] > 1)
                ? item.dataset.data[item.dataIndex].toFixed(2)
                : item.dataset.data[item.dataIndex].toPrecision(2)} 
               ${Object.values(currencies).find(c => c.id === coinIdTo).symbol.toUpperCase()}`;
            }
          }
        }
      }
    ]
  };

  return (
    <section className={cl.graph}>
      {
        isPriceLoading
          ? <div className={cl.loaderContainer}>
            <Loader />
          </div>
          : <>
            <div className={cl.graphHeader}>
              <p className={cl.price}>
                {
                  (graphData.length !== 0 && labels.length !== 0)
                    ?
                    (graphData[graphData.length - 1] > 1)
                      ? graphData[graphData.length - 1].toFixed(2)
                      : graphData[graphData.length - 1].toPrecision(2)
                    : ""
                }
              </p>

              <p className={cl.currenciesSymbol}>
                {
                  `${Object.values(currencies).find(c => c.id === coinIdFrom).symbol.toUpperCase()}
            / 
          ${Object.values(currencies).find(c => c.id === coinIdTo).symbol.toUpperCase()}`
                }
              </p>

              <p className={(priceChange >= 0)
                ? `${cl.priceChange} ${cl.gain}`
                : `${cl.priceChange} ${cl.decline}`}
              >
                {
                  (priceChange > 0)
                    ? `+${priceChange.toPrecision(2)}%`
                    : `${priceChange.toPrecision(2)}%`
                }
              </p>
            </div>
            <div className={cl.container}>
              {
                (graphData.length !== 0 && labels.length !== 0)
                  ? <LineGraph data={data} />
                  : ""
              }
            </div>
          </>
      }
    </section>
  );
};

export default Graph;