import {
  addToCart,
  removeFromCart,
  updateCartItemCount,
} from "../redux/cartSlice/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { RootState } from "../redux/store";

type productType = {
  data: {
    id: number;
    title: string;
    price: number;
    img: string;
  };
};

export function CartItem(props: productType) {
  const dispatch = useAppDispatch();
  const { id, title, price, img } = props.data;
  const { cartItems } = useAppSelector((state: RootState) => state.cartSlice);
  return (
    <div className="text-center border-4 border-slate-700 mx-auto py-4 px-8 my-4 rounded-lg w-min cartItem ">
      <div className=" my-4 mx-auto bg-slate-800 p-4 rounded-lg cartItemImage">
        <img src={img} alt="" className=" mx-auto w-auto object-cover h-full" />
      </div>
      <div className="description">
        <p>
          <b>{title}</b>
        </p>
        <p className="text-xl m-2">${price}</p>
        <div className="countHandler">
          <button
            className="m-2 p-2 rounded-md bg-slate-800 cartItemButton"
            onClick={() => dispatch(removeFromCart(id))}
          >
            {" "}
            -{" "}
          </button>
          <input
            className="text-center w-8 bg-slate-700 rounded-md"
            value={cartItems[id]}
            onChange={(e) => {
              dispatch(
                updateCartItemCount({
                  newAmount: Number(e.target.value),
                  itemID: id,
                })
              );
            }}
          />
          <button
            className="m-2 p-2 rounded-md bg-slate-800 cartItemButton"
            onClick={() => dispatch(addToCart(id))}
          >
            {" "}
            +{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
