import React from "react";
import CartStyles from "./styled/CartStyles";
import Button from "./styled/Button";
import { Query, Mutation } from "react-apollo";
import CloseButton from "./styled/CloseButton";
import {
  CART_OPEN_QUERY,
  TOGGLE_CART_MUTATION,
} from "../utils/localOperations";

const Cart = () => {
  return (
    <Mutation mutation={TOGGLE_CART_MUTATION}>
      {(toggleCart, payload) =>
        console.log(payload) || (
          <Query query={CART_OPEN_QUERY}>
            {({ data, error }) =>
              console.log(data) || (
                <CartStyles open={data.cartOpen}>
                  <header>
                    <h3>Your Cart</h3>
                    <p>Total: __ Items in your cart</p>
                    <CloseButton onClick={toggleCart}>X</CloseButton>
                  </header>
                  <main>items</main>
                  <footer>
                    <p>$10.10</p>
                    <Button>Checkout</Button>
                  </footer>
                </CartStyles>
              )
            }
          </Query>
        )
      }
    </Mutation>
  );
};
export default Cart;
