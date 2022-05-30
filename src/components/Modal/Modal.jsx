import React, { useEffect, useRef } from "react";
import cl from "./Modal.module.scss";
import ButtonIcon from "../UI/ButtonIcon/ButtonIcon";
import { ReactComponent as CrossIcon } from "../../images/cross.svg";
import Portal from "../Portal/Portal";

const Modal = (props) => {
  const containerEl = useRef(null);

  const clickHandler = (evt) => {
    if (!evt.target.closest(`.${cl.window}`))
      props.closeFunc();
  };
  const keyDownHandler = (evt) => {
    if (evt.key === "Escape")
      props.closeFunc();
  };

  useEffect(() => {
    if (props.showModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
    containerEl.current && containerEl.current.focus();

  }, [props.showModal]);

  return (
    <>
      {
        props.showModal &&
        <Portal>
          <div className={cl.container}
               ref={containerEl}
               tabIndex={-1}
               onKeyDown={keyDownHandler}
               onClick={clickHandler}
          >
            <div className={cl.window}>
              <div className={cl.header}>
                <h3 className={cl.title}>{props.title}</h3>
                <div className={cl.crossButton} onClick={props.closeFunc}>
                  <ButtonIcon
                    ariaText={"Закрыть окно"}
                    iconHeight={12}
                    iconWidth={12}
                    Icon={CrossIcon}
                  />
                </div>
              </div>
              <div className={cl.content}>
                {props.children}
              </div>
            </div>
          </div>
        </Portal>
      }
    </>
  );
};

export default Modal;