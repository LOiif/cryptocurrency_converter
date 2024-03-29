import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ConverterPage from "../../pages/ConverterPage/ConverterPage";
import Portfolio from "../../pages/Portfolio/Portfolio";
import Page404 from "../../pages/404/Page404";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/converter" />} />
      <Route path="/converter" element={<ConverterPage />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/404" element={<Page404 />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default AppRouter;