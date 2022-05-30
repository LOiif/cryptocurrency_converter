import React, { useEffect, useMemo, useState } from "react";
import cl from "./Converter.module.scss";
import ButtonIcon from "../UI/ButtonIcon/ButtonIcon";
import { ReactComponent as refreshIcon } from "../../images/refresh.svg";
import { ReactComponent as graphIcon } from "../../images/graph.svg";
import { ReactComponent as swapIcon } from "../../images/swap.svg";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import GeckoService from "../../API/GeckoService";
import { convertPrice } from "../../utils/functions";

const Converter = () => {
  const [price, setPrice] = useState();
  const [pricesInUsd, setPricesInUsd] = useState();
  const [coinIdFrom, setCoinIdFrom] = useState("bitcoin");
  const [coinIdTo, setCoinIdTo] = useState("bitcoin");
  const [isSwap, setIsSwap] = useState(false);
  const [currencyInputValue, setCurrencyInputValue] = useState("");
  const [isPriceLoading, setIsPriceLoading] = useState(false);

  useEffect(() => {
    fetchPricesWithLoader();
    const fetchInterval = setInterval(() => {
      fetchPrices();
    }, 100000);
    return () => clearInterval(fetchInterval);
  }, []);

  useEffect(() => {
    if (pricesInUsd) {
      const price = convertPrice(pricesInUsd[coinIdFrom], pricesInUsd[coinIdTo]);
      setPrice(price);
    }
  }, [coinIdFrom, coinIdTo]);

  useMemo(() => {
    if (pricesInUsd) {
      const price = convertPrice(pricesInUsd[coinIdFrom], pricesInUsd[coinIdTo]);
      setPrice(price);
    }
  }, [pricesInUsd]);

  const coinChanger = (id, type) => {
    if (type === "from") {
      setCoinIdFrom(() => id);
    } else if (type === "to") {
      setCoinIdTo(() => id);
    }
  };

  const refreshHandler = (evt) => {
    fetchPricesWithLoader();
  };

  const swapHandler = (evt) => {
    setIsSwap(!isSwap);
    const cif = coinIdFrom;
    setCoinIdFrom(coinIdTo);
    setCoinIdTo(cif);
  };

  async function fetchPricesWithLoader() {
    try {
      setIsPriceLoading(true);
      await fetchPrices();

    } catch (e) {
      console.log(e);
    } finally {
      setIsPriceLoading(false);
    }
  }

  async function fetchPrices() {
    console.log("fetch price");
    try {
      const prices = await GeckoService.getPricesInUsd();
      setPricesInUsd(prices);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <section className={cl.converter}>
      <div className={cl.converterWrapper}>

        <div className={cl.header}>
          <h2 className={cl.title}>Конвертер</h2>

          <div className={cl.buttons}>
            <div className={cl.refreshButton}
                 onClick={refreshHandler}
            >
              <ButtonIcon ariaText={"Обновить курс"}
                          iconWidth={20}
                          iconHeight={20}
                          Icon={refreshIcon}
              />
            </div>
            <ButtonIcon ariaText={"Показать/скрыть график"}
                        iconWidth={20}
                        iconHeight={20}
                        Icon={graphIcon}
            />
          </div>
        </div>

        <div className={cl.content} style={{ flexDirection: isSwap ? "column-reverse" : "column" }}>
          <CurrencyInput type={isSwap ? "to" : "from"}
                         coinChanger={coinChanger}
                         price={price}
                         valueChanger={(evt) => setCurrencyInputValue(evt.target.value)}
                         value={currencyInputValue}
                         isPriceLoading={isPriceLoading}
          />

          <div className={cl.swapButton} onClick={swapHandler}>
            <ButtonIcon ariaText={"Поменять местами"}
                        iconWidth={20}
                        iconHeight={20}
                        Icon={swapIcon}
            />
          </div>
          <CurrencyInput type={isSwap ? "from" : "to"}
                         coinChanger={coinChanger}
                         price={price}
                         valueChanger={(evt) => setCurrencyInputValue(evt.target.value)}
                         value={currencyInputValue}
                         isPriceLoading={isPriceLoading}
          />
        </div>
      </div>
    </section>
  );
};

export default Converter;