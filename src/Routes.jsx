import React from "react";
import { Routes, Route } from "react-router-dom";
import { GroupLink } from "./GroupLink";
import { Home } from "./Home";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/grouplink" element={<GroupLink />}></Route>
    </Routes>
  );
};
