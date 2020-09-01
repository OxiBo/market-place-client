import React from "react";
import { adopt } from "react-adopt";
import CartStyles from "./styled/CartStyles";
import Button from "./styled/Button";
import { Query, Mutation } from "react-apollo";
import CloseButton from "./styled/CloseButton";
import BigHeader from "./styled/BigHeader";
import Error from "./ErrorMessage";
import CartItem from "./CartItem";
import CheckoutAndPay from "./CheckoutAndPay";
import {
  CART_OPEN_QUERY,
  TOGGLE_CART_MUTATION,
} from "../utils/localOperations";
import { CART_ITEMS_QUERY } from "../utils/serverOperations";
import calcCartTotalPrice from "../utils/calcCartTotalPrice";

const Composed = adopt({
  toggleCart: ({ render }) => (
    <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => <Query query={CART_OPEN_QUERY}>{render}</Query>,
  myCurrentOrder: ({ render }) => (
    <Query query={CART_ITEMS_QUERY}>{render}</Query>
  ),
});

const Cart = () => (
  <Composed>
    {({ toggleCart, localState, myCurrentOrder: { data, error, loading } }) => {
      if (error) return <Error error={error} />;
      if (loading) return <p>Loading...</p>;

      const cart = data.myCurrentOrder;
      {/* console.log(data.myCurrentOrder); */}
      if (!cart) return null; // cart does not open if there are no items in it
      const totalItems = data.myCurrentOrder.items.reduce(
        (count, item) => count + item.count,
        0
      );
{/* console.log(calcCartTotalPrice(data.myCurrentOrder.items)) */}
      return (
        <CartStyles open={localState.data.cartOpen}>
          <header>
            <BigHeader>Your Cart</BigHeader>
            <p>
              Total: {data.myCurrentOrder.items.length || 0} Items in your cart
            </p>
            <CloseButton onClick={toggleCart}>X</CloseButton>
          </header>
          <main>
            <ul>
              {data.myCurrentOrder.items.map((cartItem) => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))}
            </ul>
          </main>
          <footer>
            <p>
              $ {calcCartTotalPrice(data.myCurrentOrder.items).toFixed(2) || 0}
            </p>

            <CheckoutAndPay
              amount={calcCartTotalPrice(data.myCurrentOrder.items)}
              totalItems={totalItems}
              image={data.myCurrentOrder.items.length && data.myCurrentOrder.items[0].image}
            >
              <Button>Checkout</Button>
            </CheckoutAndPay>
          </footer>
        
        </CartStyles>
      );
    }}
  </Composed>
);
export default Cart;
