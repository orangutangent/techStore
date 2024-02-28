import { useNavigate } from "react-router-dom";
import { CartItem } from "../components/CartItem";
import products from "../products.json";
import { RootState, useAppSelector } from "../redux/store";

export type productType = {
  id: number;
  title: string;
  price: number;
  img: string;
  description: string;
};

export function Cart() {
  const { cartItems, totalAmount } = useAppSelector(
    (state: RootState) => state.cartSlice
  );
  const navigate = useNavigate();
  return (
    <div className="h-full Cart">
      {totalAmount > 0 ? (
        <div className="checkout">
          <div className="text-center text-2xl py-4 font-bold">
            <h1>Your Cart Items</h1>
          </div>
          <div className="cartItems">
            {products.map((product: productType) => {
              if (cartItems[product.id] !== 0) {
                return <CartItem key={product.id} data={product} />;
              }
            })}
          </div>
          <div className="bg-slate-800 mx-auto h-full p-4 text-center text-3xl  rounded-xl cartTotal">
            <p className="text-white border-4 border-slate-700 rounded-lg w-max mx-auto p-4 cartSubtotal  ">
              Subtotal: ${totalAmount}
            </p>
            <button
              className="bg-slate-900 text-white p-2 m-4 rounded-lg w-max addButton"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
            <button className="bg-slate-900 text-white p-2 rounded-lg w-min m-4 addButton">
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-3xl my-6">
          <h1>Your Cart is Empty</h1>
          <button
            className="bg-slate-800 text-white p-2 m-4 rounded-lg w-max addButton"
            onClick={() => navigate("/")}
          >
            Go Shopping
          </button>
        </div>
      )}
    </div>
  );
}
