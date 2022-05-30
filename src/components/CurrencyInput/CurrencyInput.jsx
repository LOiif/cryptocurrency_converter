import React, { useId, useState } from "react";
import cl from "../CurrencyInput/CurrencyInput.module.scss";
import Modal from "../Modal/Modal";
import { currencies } from "../../utils/constants";
import { formatCurrency, roundUp } from "../../utils/functions";

const CurrencyInput = ({ type, coinChanger, price, valueChanger, value, isPriceLoading, ...otherProps }) => {
  const id = useId();
  const [showModal, setShowModal] = useState(false);

  const [coinSymbol, setCoinSymbol] = useState("BTC");

  const selectCoinHandler = (evt) => {
    setShowModal(false);
    setCoinSymbol(evt.target.value);
    const coinId = evt.target.id;

    coinChanger(coinId, type);
  };

  const selectClickHandler = (evt) => {
    setShowModal(true);
  };

  return (
    <div {...otherProps}>
      <Modal showModal={showModal}
             title={"Выберите валюту"}
             closeFunc={() => setShowModal(false)}
      >
        {Object.values(currencies).map((c) =>
          (<div className={cl.coinItem}
                key={c.id}
            >
              <input type="radio"
                     value={c.symbol}
                     radioGroup="currencies"
                     className={cl.coinInput}
                     id={c.id}
                     onChange={selectCoinHandler}
              />
              <label className={cl.coinLabel} htmlFor={c.id}>
                {c.name}<span className={cl.coinSymbol}>{` (${c.symbol.toUpperCase()})`}</span>
              </label>
            </div>
          )
        )}
      </Modal>
      <button className={cl.coinSelect} onClick={selectClickHandler}>
        Выберите коин
        <span className={cl.coinTitle}>{coinSymbol.toUpperCase()}</span>
      </button>
      <label className={cl.label} htmlFor={id}>
        {
          type === "from"
            ? "Сколько коинов хотите конверитировать"
            : type === "to"
              ? "Сколько токинов получите"
              : ""
        }
      </label>

      <div className={cl.inputContainer}>
        <input maxLength={15}
               className={cl.input}
               id={id}
               type="text"
               placeholder="0.0"
               disabled={type === "to"}
               onChange={valueChanger}
               value={type === "from"
                 ? value
                 : formatCurrency(value, coinSymbol, price)
               }
        />
        <span className={isPriceLoading && type === "to" ? `${cl.inputPlug} ${cl.inputLoading}` : cl.inputPlug} />
      </div>

    </div>
  );
};
export default CurrencyInput;