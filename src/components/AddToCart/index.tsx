import  { useState } from "react";

import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

import { AddToCartProps } from "./types";
import { Wrapper } from "./styles";
import { useCartContext } from "../../context/cartContext/useCartContext";

function AddToCart  ({ product }:AddToCartProps)  { 
  const { addToCart } = useCartContext();
  const { id, stock, colors } = product;
  const [mainColorState, setMainColorStateState] = useState(colors[0]);
  const [amountState, setAmountState] = useState(1);

  const increase = () => {
    setAmountState((oldAmount) => {
      let tempAmount = oldAmount + 1;
      if (tempAmount > stock) {
        tempAmount = stock;
      }
      return tempAmount;
    });
  };
  const decrease = () => {
    setAmountState((oldAmount) => {
      let tempAmount = oldAmount - 1;
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      return tempAmount;
    });
  };
  return (
    <Wrapper>
      <div className="colors">
        <span>colors :</span>
        <div>
        {colors.map((color: string, index: number) => {
            const buttonClass = mainColorState === color
            ? "color-btn active"
            : "color-btn";
            const isSelected = mainColorState === color;

          
            return (
              <button
                key={index}
                style={{ background: color }}
                className={`${
                  mainColorState === buttonClass
                }`}
                onClick={() => setMainColorStateState(color)}
              >
               {mainColorState === color && <FaCheck />}
              </button>
            );
          })}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          increase={increase}
          decrease={decrease}
          amount={amountState}
        />

        <Link
          to="/cart"
          className="btn"
          onClick={() => addToCart(id, mainColorState, amountState, product)}
        >
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
};


export default AddToCart;
