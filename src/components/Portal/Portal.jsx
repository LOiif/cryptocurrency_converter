import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";

const Portal = ({ children, className, el = "div" }) => {

  const [container] = useState(document.createElement(el));

  if (className)
    container.classList.add(className);

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);
  return (ReactDOM.createPortal(children, container));
};

export default Portal;