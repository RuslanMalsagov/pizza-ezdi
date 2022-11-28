import Header from "./components/Header";
import Main from "./pages/Main";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import "./scss/app.scss";
import { NotFound } from "./pages/NotFound";

function App() {

  return (
    <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path={"/cart.html"} element={<Cart />} />
              <Route path={"/"} element={<Main/>} />
              <Route path={"*"} element={<NotFound />} />
            </Routes>
          </div>
        </div>
    </div>
  );
}

export default App;
