import React, { useEffect, useMemo, useState } from "react";
import cl from "./Converter.module.scss";
import ButtonIcon from "../UI/ButtonIcon/ButtonIcon";
import { ReactComponent as refreshIcon } from "../../images/refresh.svg";
import { ReactComponent as graphIcon } from "../../images/graph.svg";
import { ReactComponent as swapIcon } from "../../images/swap.svg";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import GeckoService from "../../API/GeckoService";
import { convertPrice } from "../../utils/functions";

const Converter = ({ changeCoins, coinIdFrom, coinIdTo }) => {
  const [price, setPrice] = useState();
  const [pricesInUsd, setPricesInUsd] = useState();

  const [isSwap, setIsSwap] = useState(false);
  const [currencyInputValue, setCurrencyInputValue] = useState("");
  const [isPriceLoading, setIsPriceLoading] = useState(false);

  useEffect(() => {
    fetchPricesWithLoader();
    const fetchInterval = setInterval(() => {
      fetchPrices();
    }, 30000);
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

  const refreshHandler = (evt) => {
    fetchPricesWithLoader();
  };

  const swapHandler = (evt) => {
    setIsSwap(!isSwap);
    const cif = coinIdFrom;
    const cit = coinIdTo;

    const button = evt.target.closest('button')

    button.focus()
    button.blur()

    changeCoins(cif, "to");
    changeCoins(cit, "from");
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
      <div>
        <div className={cl.header}>
          <h2 className={cl.title}>Конвертер</h2>
          <div className={cl.buttons}>
            <div onClick={refreshHandler}>
              <ButtonIcon ariaText={"Обновить курс"}
                          iconWidth={20}
                          iconHeight={20}
                          Icon={refreshIcon}
              />
            </div>
          </div>
        </div>

        <div className={cl.content} style={{ flexDirection: isSwap ? "column-reverse" : "column" }}>
          <CurrencyInput type={isSwap ? "to" : "from"}
                         coinChanger={changeCoins}
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
                         coinChanger={changeCoins}
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