import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { ShopContextProvider } from "./context/shopContext";
import React from "react";
import { useAppSelector } from "./redux/store";
import "./index.css";
import NotFound from "./pages/NotFound";
import ProductPage from "./pages/ProductPage";

function App() {
  const { cartItems } = useAppSelector((state) => state.cartSlice);
  const isMounted = React.useRef(false);
  React.useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
    isMounted.current = true;
  }, [cartItems]);
  return (
    <>
      <ShopContextProvider>
        <Navbar />
        <div className="bg-slate-900 h-full text-white relative w-full mt-24 BG">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </ShopContextProvider>
    </>
  );
}

export default App;
