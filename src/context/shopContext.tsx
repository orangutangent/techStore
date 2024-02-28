import React, { createContext, useState } from "react";
import products from "../products.json";

export const ShopContext = createContext<IShopContextValue>({
  cartItems: {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemCount: () => {},
  getTotalCartAmount: () => 0,
});

const getDeafaultCart = () => {
  const cart: { [key: number]: number } = {};
  for (let i = 1; i < products.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

interface IShopContextValue {
  cartItems: Record<number, number>;
  addToCart: (itemID: number) => void;
  removeFromCart: (itemID: number) => void;
  updateCartItemCount: (newAmount: number, itemID: number) => void;
  getTotalCartAmount: () => number;
}

export const ShopContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const [cartItems, setCartItems] = useState(getDeafaultCart());
  const addToCart = (itemID: number) => {
    setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] + 1 }));
  };
  const removeFromCart = (itemID: number) => {
    setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] - 1 }));
  };

  const updateCartItemCount = (newAmount: number, itemID: number) => {
    setCartItems((prev) => ({ ...prev, [itemID]: newAmount }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = products.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.price;
        }
      }
    }
    return totalAmount;
  };

  const contextValue: IShopContextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getTotalCartAmount,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
