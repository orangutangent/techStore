import { getTotalCartAmount } from "./getTotalCartAmount";
import { getDeafaultCart } from "../redux/cartSlice/cartSlice";

export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const cartItems = data ? JSON.parse(data) : getDeafaultCart();
  const totalAmount = getTotalCartAmount(cartItems);
  return {
    cartItems,
    totalAmount,
  };
};
