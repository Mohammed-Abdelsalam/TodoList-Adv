import React from "react";

// React Router
import { Route, Routes } from "react-router-dom";

// Components
import Home from "./scenes/pages/home/Home";
import NotFound from "./scenes/pages/404/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
