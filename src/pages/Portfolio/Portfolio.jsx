import React, { useEffect, useMemo, useRef, useState } from "react";
import cl from "./Portfolio.module.scss";
import DoughnutChart from "../../components/DoughnutChart/DoughnutChart";
import ButtonIcon from "../../components/UI/ButtonIcon/ButtonIcon";
import { ReactComponent as PlusIcon } from "../../images/plus.svg";
import Modal from "../../components/Modal/Modal";
import { currencies } from "../../utils/constants";
import { formatCurrency } from "../../utils/functions";
import GeckoService from "../../API/GeckoService";
import CurrenciesList from "../../components/CurrenciesList/CurrenciesList";

const Portfolio = () => {
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isEditAsset, setIsEditAsset] = useState(false);
  const [isInputError, setIsInputError] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState({});
  const [assets, setAssets] = useState([]);
  const [prices, setPrices] = useState({});
  const [assetValue, setAssetValue] = useState("");
  const [sumOfAssets, setSumOfAssets] = useState(null);
  const [deleteAssetId, setDeleteAssetId] = useState(null);

  const assetsRef = useRef(null);
  assetsRef.current = assets;

  const data = {
    labels: assets.map(a => a.name),
    datasets: [
      {
        data: assets.map(a => a.valueInUsd),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgb(131,255,86)"
        ],
        borderWidth: 0
      }
    ]
  };

  useEffect(() => {
    console.log("mount");
    const storageAssets = localStorage.getItem("assets");

    if (storageAssets) {
      setAssets(JSON.parse(storageAssets));
    }
    fetchAllPrices();

    return () => {
      localStorage.setItem("assets", JSON.stringify(assetsRef.current));
    };
  }, []);


  useMemo(() => {
    const sum = assets.reduce((acc, asset) => {
      return (acc + asset.valueInUsd);
    }, 0);
    setSumOfAssets(sum);
  }, [assets]);

  async function fetchAllPrices() {
    try {
      const response = await GeckoService.getPricesInUsd();
      setPrices(response);
    } catch (e) {
      console.log(e);
    }
  }

  const closeModalInputFunc = () => {
    setShowInputModal(false);
    setAssetValue("");
  };

  const editHandler = (evt) => {
    const el = evt.target.closest("tr");
    if (el) {
      const id = el.id;
      const name = Object.values(currencies).find(c => c.id === id).name;
      const symbol = Object.values(currencies).find(c => c.id === id).symbol;

      setIsEditAsset(true);
      console.log(assets.find(asset => asset.id === id).value + "");
      setAssetValue(assets.find(asset => asset.id === id).value + "");

      setSelectedCoin({ id, name, symbol });
      setShowInputModal(true);
    }
  };

  const deleteHandler = (evt) => {
    setShowConfirmModal(true);
    const el = evt.target.closest("tr");
    if (el) {
      setDeleteAssetId(el.id);
    }
  };

  const deleteConfirmHandler = (evt) => {
    setAssets(assets.filter(asset => asset.id !== deleteAssetId));
    setShowConfirmModal(false);
  };

  const addAssetHandler = (evt) => {
    const value = parseFloat(assetValue);

    if (value && !isNaN(value) && value > 0) {
      setIsInputError(false);

      const asset = assets.find((el) => el.id === selectedCoin.id);

      if (asset) {
        if (isEditAsset) {
          asset.value = value;
        } else {
          asset.value = asset.value + value;
        }
        asset.valueInUsd = +asset.value * prices[selectedCoin.id];
      } else {
        setAssets([...assets, {
          value,
          valueInUsd: value * prices[selectedCoin.id],
          id: selectedCoin.id,
          name: selectedCoin.name,
          symbol: selectedCoin.symbol
        }]);
      }
      setAssetValue("");
      setShowInputModal(false);
    } else {
      setIsInputError(true);
    }
  };

  const selectCoinHandler = (evt) => {
    const el = (evt.target.tagName === "INPUT")
      ? evt.target
      : (evt.target.tagName === "LABEL")
        ? evt.target.previousSibling
        : null;

    if (el) {
      const id = el.id;

      if (id !== selectedCoin.id) {

        const symbol = el.value;
        const name = Object.values(currencies).find(c => c.id === id).name;

        setSelectedCoin({ id, name, symbol });
      } else {
        setAssetValue("");
      }

      setIsEditAsset(false);
      setShowSelectModal(false);
      setShowInputModal(true);
    }
  };

  return (
    <main className={cl.portfolio}>
      <div className={cl.portfolioWrapper}>
        {
          assets.length !== 0
            ? <>
              <h2 className={cl.title}>Всего активов</h2>
              <p className={cl.allAssets}>
                ${formatCurrency(sumOfAssets)}
              </p>
              <div className={cl.chartContainer}>
                <DoughnutChart data={data} />
              </div>
            </>
            : ""
        }
        <div>
          <div className={cl.assetsHeader}>
            <div className={cl.assetsHeaderWrapper}>
              <h3>Ваши активы</h3>
              <div className={cl.plusAsset} onClick={() => setShowSelectModal(true)}>
                <ButtonIcon iconWidth={20} iconHeight={20} ariaText={"Добавить актив"} Icon={PlusIcon} />
              </div>
            </div>
          </div>
          {
            assets.length === 0
              ? <p className={cl.noAssets}>У вас пока нет активов</p>
              : <div className={cl.tableContainer}>
                <table className={cl.assetsTable}>
                  <thead>
                  <tr>
                    <th>Название</th>
                    <th>Кол-во</th>
                    <th>Действия</th>
                  </tr>
                  </thead>

                  <tbody>
                  {
                    assets.map((asset) => {
                      return (
                        <tr key={asset.id} id={asset.id}>
                          <td>
                            <div>
                              <p className={cl.big}>{asset.name}</p>
                              <span className={cl.small}>{asset.symbol.toUpperCase()}</span>
                            </div>
                          </td>

                          <td>
                            <div>
                              <p className={cl.big}>${formatCurrency(asset.valueInUsd)}</p>
                              <span
                                className={cl.small}>{formatCurrency(asset.value, asset.symbol) + " " + asset.symbol.toUpperCase()}</span>
                            </div>
                          </td>

                          <td>
                            <div className={cl.assetsActions}>
                              <button className={cl.edit} onClick={editHandler}>Изменить количество актива</button>
                              <button className={cl.delete} onClick={deleteHandler}>Удалить актив</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  }
                  </tbody>
                </table>
              </div>
          }
        </div>
      </div>

      {/*модалки*/}

      <Modal closeFunc={() => setShowSelectModal(false)}
             showModal={showSelectModal}
             title={"Выберите актив"}
      >
        <CurrenciesList
          currencies={currencies}
          selectCoinHandler={selectCoinHandler}
        />
      </Modal>

      <Modal showModal={showInputModal}
             closeFunc={closeModalInputFunc}
             title={"Введите кол-во актива"}
      >
        {
          "id" in selectedCoin && "symbol" in selectedCoin && "name" in selectedCoin
            ? <div className={cl.inputModalContainer}>
              <label
                htmlFor={"amount-of-" + selectedCoin.id}
                className={cl.label}>
                {selectedCoin.name}:
              </label>
              <input className={isInputError ? cl.inputModal + " " + cl.inputModalErr : cl.inputModal}
                     type="text"
                     placeholder={"0.0"}
                     id={"amount-of-" + selectedCoin.id}
                     maxLength={15}
                     value={assetValue}
                     onChange={(evt) => setAssetValue(evt.target.value)}
              />
              {
                isInputError
                  ? <span className={cl.errorMsg}>Введите данные корректно</span>
                  : ""
              }
              <p className={cl.decorEqual}>=</p>
              <p className={cl.total}>
                ${formatCurrency(assetValue, selectedCoin.symbol, prices[selectedCoin.id]) || 0}
              </p>
              <button className={cl.addAsset} onClick={addAssetHandler}>
                Готово
              </button>
            </div>
            : ""
        }
      </Modal>

      <Modal showModal={showConfirmModal}
             closeFunc={() => setShowConfirmModal(false)}
             title={"Хотите удалить этот актив?"}
      >
        <div className={cl.confirmContainer}>
          <button className={cl.confirmNo} onClick={() => setShowConfirmModal(false)}>
            Нет
          </button>
          <button className={cl.confirmYes} onClick={deleteConfirmHandler}>
            Да
          </button>
        </div>
      </Modal>
    </main>
  );
};

export default Portfolio;