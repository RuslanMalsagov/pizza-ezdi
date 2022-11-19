import Header from "./components/Header";
import Main from "./pages/Main";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import "./scss/app.scss";
import { NotFound } from "./pages/NotFound";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  return (
    <div className="wrapper">
      <Header search={search} setSearch={setSearch} />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path={"/cart.html"} element={<Cart />} />
            <Route path={"/"} element={<Main search={search} />} />
            <Route path={"*"} element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
