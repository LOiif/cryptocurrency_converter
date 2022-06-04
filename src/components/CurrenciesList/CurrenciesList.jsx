import React from "react";
import cl from "./CurrenciesList.module.scss";

const CurrenciesList = ({ currencies, selectCoinHandler }) => {
  return (
    <>
      {
        Object.values(currencies).map((c) =>
          (<div className={cl.coinItem}
                key={c.id}
                onClick={selectCoinHandler}
          >
            <input type="radio"
                   value={c.symbol}
                   radioGroup="portfolio-currencies"
                   className={cl.coinInput}
                   id={c.id}
                   onChange={selectCoinHandler}
            />
            <label className={cl.coinLabel} htmlFor={c.id}>
              {c.name + ` (${c.symbol.toUpperCase()})`}
            </label>
          </div>)
        )
      }
    </>
  );
};

export default CurrenciesList;