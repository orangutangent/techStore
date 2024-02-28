import { useState } from "react";
import { useAppSelector, useAppDispatch, RootState } from "../redux/store";
import { addToCart } from "../redux/cartSlice/cartSlice";
import { useNavigate } from "react-router-dom";

type productType = {
  img: string;
  title: string;
  description: string;
  price: number;
  id: number;
  colors: string[];
};

export function ProductElement({ product }: { product: productType }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(0);
  const cartItems = useAppSelector(
    (state: RootState) => state.cartSlice.cartItems
  );
  const cartItemAmount = cartItems[product.id];
  return (
    <div className="bg-slate-900 w-min text-white border-4 border-slate-700 m-4 rounded-lg productElement">
      <div onClick={() => navigate(`/product/${product.id}`)}>
        <div className="h-48 w-72 my-4  mx-4 bg-slate-800 p-4 rounded-lg">
          <img
            src={product.img}
            alt=""
            className=" mx-auto w-auto object-cover h-full rounded-lg"
          />
        </div>
        <div className="text-center h-16 font-semibold text-xl productTitle">
          {product.title}
        </div>
      </div>
      <div className="h-16">
        <ul className="text-center text-base rounded-3xl bg-slate-800 flex justify-around mx-10 my-2 p-1 cursor-pointer">
          {product.colors.map((color, i) => (
            <li
              key={color}
              onClick={() => setSelectedColor(i)}
              className={
                i === selectedColor ? "bg-slate-900 rounded-3xl p-2" : "p-2"
              }
            >
              {color}
            </li>
          ))}
        </ul>
      </div>
      <div className="text-center font-semibold text-2xl h-8 ">
        ${product.price}
      </div>
      <div className="text-center text-base my-4 h-12">
        <button
          onClick={() => {
            dispatch(addToCart(product.id));
          }}
          className="bg-slate-800 text-white p-2 rounded-lg w-1/2 addButton"
        >
          Add to cart {cartItemAmount > 0 ? `(${cartItemAmount})` : ""}
        </button>
      </div>
    </div>
  );
}
