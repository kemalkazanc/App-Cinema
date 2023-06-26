import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LikePage from "./pages/LikePage";
//import Error from "./pages/Error";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coups-de-coeur" element={<LikePage />} />
        {/* <Route path="/**" element={<Error />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
