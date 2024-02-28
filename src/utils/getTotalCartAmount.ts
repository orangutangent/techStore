import products from "../products.json";
import { productType } from "../pages/Cart";

export const getTotalCartAmount = (cartItems: { [key: number]: number }) => {
  let totalAmount = 0;
  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      const itemInfo = products.find(
        (product: productType) => product.id === Number(item)
      );
      if (itemInfo) {
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
  }
  return totalAmount;
};
