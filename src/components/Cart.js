import React from "react";
import CartStyles from "./styled/CartStyles";
import Button from "./styled/Button";
import { Query, Mutation } from "react-apollo";
import CloseButton from "./styled/CloseButton";
import Error from "./ErrorMessage";
import CartItem from "./CartItem";
import {
  CART_OPEN_QUERY,
  TOGGLE_CART_MUTATION,
} from "../utils/localOperations";
import { CART_ITEMS_QUERY } from "../utils/serverOperations";
import calcCartTotalPrice from "../utils/calcCartTotalPrice";

const Cart = (props) => {
  return (
    <Mutation mutation={TOGGLE_CART_MUTATION}>
      {(toggleCart, payload) => (
        <Query query={CART_OPEN_QUERY}>
          {({ data, error }) => (
            <CartStyles open={data.cartOpen}>
              <Query query={CART_ITEMS_QUERY}>
                {({ data, error, loading }) => {
                  if (error) return <Error error={error} />;
                  if (loading) return <p>Loading...</p>;
                  return (
                    <>
                      <header>
                        <h3>Your Cart</h3>
                        <p>
                          Total: {data.myCurrentOrder.items.length} Items in
                          your cart
                        </p>
                        <CloseButton onClick={toggleCart}>X</CloseButton>
                      </header>

                      <main>
                        <ul>
                          {data.myCurrentOrder &&
                            data.myCurrentOrder.items.map((cartItem) => (
                              <CartItem key={cartItem.id} cartItem={cartItem} />
                            ))}
                        </ul>
                      </main>
                      <footer>
                        <p>
                          ${" "}
                          {calcCartTotalPrice(
                            data.myCurrentOrder.items
                          ).toFixed(2)}
                        </p>
                        <Button>Checkout</Button>
                      </footer>
                    </>
                  );
                }}
              </Query>
            </CartStyles>
          )}
        </Query>
      )}
    </Mutation>
  );
};
export default Cart;
