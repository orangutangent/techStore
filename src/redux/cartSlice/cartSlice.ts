import { createSlice } from "@reduxjs/toolkit";
import products from "../../products.json";
import { getTotalCartAmount } from "../../utils/getTotalCartAmount";
import { getCartFromLS } from "../../utils/getCartFromLS";

type CartState = {
  cartItems: {
    [key: number]: number;
  };
  totalAmount: number;
};

export const getDeafaultCart = () => {
  const cart: { [key: number]: number } = {};
  for (let i = 1; i < products.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

const { cartItems, totalAmount } = getCartFromLS();

const initialState: CartState = {
  cartItems,
  totalAmount,
};

export const cartSlice = createSlice({
  initialState: initialState,
  name: "cart",
  reducers: {
    addToCart: (state, action) => {
      const prev = state.cartItems;
      state.cartItems = { ...prev, [action.payload]: prev[action.payload] + 1 };
      state.totalAmount = getTotalCartAmount(state.cartItems);
    },
    removeFromCart: (state, action) => {
      const prev = state.cartItems;
      const itemID = action.payload;
      state.cartItems = { ...prev, [itemID]: prev[itemID] - 1 };
      state.totalAmount = getTotalCartAmount(state.cartItems);
    },
    updateCartItemCount: (state, action) => {
      const { itemID, newAmount } = action.payload;
      const prev = state.cartItems;
      state.cartItems = { ...prev, [itemID]: newAmount };
      state.totalAmount = getTotalCartAmount(state.cartItems);
    },
    // getTotalCartAmount: (state) => {
    //   let totalAmount = 0;
    //   for (const item in state.cartItems) {
    //     if (state.cartItems[item] > 0) {
    //       const itemInfo = products.find(
    //         (product: productType) => product.id === Number(item)
    //       );
    //       if (itemInfo) {
    //         totalAmount += state.cartItems[item] * itemInfo.price;
    //       }
    //     }
    //   }
    //   state.totalAmount = totalAmount;
    // },
  },
});

export const { addToCart, removeFromCart, updateCartItemCount } =
  cartSlice.actions;
export default cartSlice.reducer;
