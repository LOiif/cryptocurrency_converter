import React from "react";
import cl from "./ButtonIcon.module.scss";

const ButtonIcon = ({ ariaText, iconWidth, iconHeight, Icon }) => {

  const mouseDownHandler = (evt) => {
    evt.preventDefault()
  };

  return (
    <button className={cl.button}
            onMouseDown={mouseDownHandler}
    >
      {ariaText}
      <Icon
        fill={"white"}
        className={cl.icon}
        style={{
          width: `${iconWidth}px`,
          height: `${iconHeight}px`
        }}
      >
      </Icon>
    </button>
  );
};

export default ButtonIcon;