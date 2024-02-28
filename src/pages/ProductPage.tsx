import React from "react";
import { useParams } from "react-router-dom";
import products from "../products.json";
import { IoMdArrowRoundBack } from "react-icons/io";
import { addToCart } from "../redux/cartSlice/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

const ProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { cartItems } = useAppSelector((state) => state.cartSlice);
  const [selectedColor, setSelectedColor] = React.useState<number>(0);
  console.log(params);
  const product = products.find((product) => product.id == Number(params.id));
  return (
    <div className="bg-slate-900 mx-2 md:mx-40 xl:mx-68 border-8 rounded-xl border-slate-950  productPage ">
      <button
        className="bg-slate-900 text-white p-2 rounded-lg w-max backButton"
        onClick={() => window.history.go(-1)}
      >
        <IoMdArrowRoundBack size={30} />
      </button>
      <div className="text-center text-3xl py-4 font-bold">
        <h1>{product?.title}</h1>
        <div className="border-slate-950 w-fit  p-8 mx-auto rounded-lg border-4 my-8 PPImageWrapper">
          <img
            className="mx-auto object-cover h-full rounded-lg PPImage"
            src={product?.img}
            alt="image"
          />
        </div>
        <p>${product?.price}</p>
        <p className="text-base my-4  ">
          <p>Description:</p> <br />
          {product?.description}
        </p>
        <ul className="text-center text-base rounded-3xl w-1/2 md:w-1/3 lg:w-1/4 bg-slate-800 flex justify-around mx-auto my-2 p-1 cursor-pointer">
          {product?.colors.map((color, i) => (
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
        <button
          className="bg-slate-950 text-xl text-white p-4 rounded-lg w-max m-4 addButton"
          onClick={() => {
            dispatch(addToCart(product?.id));
            alert(`${product?.title} added to cart` + "⚡");
          }}
        >
          Add to Cart
          <br />
          <p className="text-lime-600">${product?.price}</p>
          color: {product?.colors[selectedColor]}
          <br />
          <p className="text-cyan-600 text-sm">
            number of added: {product ? cartItems[product.id] : 0}
          </p>
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
