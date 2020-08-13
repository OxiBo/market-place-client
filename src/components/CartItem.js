import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import formatMoney from "../lib/formatMoney";
import RemoveFromCart from "./RemoveFromCart";
import { noImage } from "../utils/utilVars";

const CartItemStyles = styled.li`
  /* background-color: yellow; */
  margin: 0 auto !important;
  padding: 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.lightGrey};
  display: grid !important;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    width: 100px;
    margin-right: 10px;
  }
  h3,
  p {
padding-left: 2rem;
   
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

//{ id, count, price, product }
const CartItem = ({ cartItem: { id, count, product } }) => {
  
  if (!product)
    return (
      <CartItemStyles>
        <p>This item has been removed</p>
        <RemoveFromCart id={id} />
      </CartItemStyles>
    );
  return (
    <CartItemStyles>
      <img src={product.image || noImage} alt={product.name} />
      <div className="cart-item-details">
        <h3>
          <Link to={`/item/${product.id}`}>{product.name}</Link>
        </h3>
        <p>
          <strong>$ {(product.price * count).toFixed(2)} </strong>
          {" - "}
          <em>
            {count} &times; $ {product.price.toFixed(2)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={id} />
    </CartItemStyles>
  );
};

export default CartItem;
