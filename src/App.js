import Header from "./components/Header";
import Main from "./pages/Main";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import "./scss/app.scss";
import { NotFound } from "./pages/NotFound";
import { createContext, useState } from "react";

export const SearchContext = createContext();

function App() {
  const [search, setSearch] = useState("");
  
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ search, setSearch }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path={"/cart.html"} element={<Cart />} />
              <Route path={"/"} element={<Main search={search} />} />
              <Route path={"*"} element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
