import React, { useEffect, useRef } from "react";
import cl from "./Modal.module.scss";
import ButtonIcon from "../UI/ButtonIcon/ButtonIcon";
import { ReactComponent as CrossIcon } from "../../images/cross.svg";
import Portal from "../Portal/Portal";

const Modal = ({closeFunc, showModal, title, children}) => {
  const containerEl = useRef(null);

  const clickHandler = (evt) => {
    if (!evt.target.closest(`.${cl.window}`))
      closeFunc();
  };
  const keyDownHandler = (evt) => {
    if (evt.key === "Escape")
      closeFunc();
  };

  useEffect(() => {
    containerEl.current && containerEl.current.focus();
  }, [showModal]);

  return (
    <>
      {
        showModal &&
        <Portal>
          <div className={cl.container}
               ref={containerEl}
               tabIndex={-1}
               onKeyDown={keyDownHandler}
               onClick={clickHandler}
          >
            <div className={cl.window}>
              <div className={cl.header}>
                <h3 className={cl.title}>{title}</h3>
                <div className={cl.crossButton} onClick={closeFunc}>
                  <ButtonIcon
                    ariaText={"Закрыть окно"}
                    iconHeight={12}
                    iconWidth={12}
                    Icon={CrossIcon}
                  />
                </div>
              </div>
              <div className={cl.content}>
                {children}
              </div>
            </div>
          </div>
        </Portal>
      }
    </>
  );
};

export default Modal;