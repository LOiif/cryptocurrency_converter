import React from "react";
import "./NavBar.module.scss";
import cl from "./NavBar.module.scss";
import { NavLink } from "react-router-dom";

const NavBar = () => {

  const activeLinkClasses = cl.navLink + " " + cl.navLinkActive;

  return (
    <header className={cl.header}>
      <nav className={cl.nav}>
        <ul className={cl.navList}>
          <li className={cl.navItem}>
            <NavLink
              to="/converter"
              className={({ isActive }) => (isActive ? activeLinkClasses : cl.navLink)}
            >
              Конвертер
            </NavLink>
          </li>
          <li className={cl.navItem}>
            <NavLink
              to="/portfolio"
              className={({ isActive }) => (isActive ? activeLinkClasses : cl.navLink)}
            >
              Портфель
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
