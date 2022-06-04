import React, { useId, useState } from "react";
import cl from "../CurrencyInput/CurrencyInput.module.scss";
import Modal from "../Modal/Modal";
import { currencies } from "../../utils/constants";
import { formatCurrency} from "../../utils/functions";
import CurrenciesList from "../CurrenciesList/CurrenciesList";

const CurrencyInput = ({ type, coinChanger, price, valueChanger, value, isPriceLoading, ...otherProps }) => {
  const id = useId();
  const [showModal, setShowModal] = useState(false);
  const [coinSymbol, setCoinSymbol] = useState("BTC");

  const selectCoinHandler = (evt) => {
    const el = (evt.target.tagName === "INPUT")
      ? evt.target
      : (evt.target.tagName === "LABEL")
        ? evt.target.previousSibling
        : null;
    if(el) {
      setShowModal(false);
      setCoinSymbol(el.value);
      const coinId = el.id;

      coinChanger(coinId, type);
    }
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
        <CurrenciesList
          currencies={currencies}
          selectCoinHandler={selectCoinHandler}
        />
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