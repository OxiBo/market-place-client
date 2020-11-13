import React, { Component } from "react";
import styled from "styled-components";
import { withApollo } from "@apollo/react-hoc";
import { Mutation } from "react-apollo";
import {
  REMOVE_ITEM_FROM_CART,
  CART_ITEMS_QUERY,
} from "../utils/serverOperations";

const SmallDeleteButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  margin-left: auto;
  width: 3rem;
  &:hover {
    color: red;
    cursor: pointer;
  }
`;

class RemoveFromCart extends Component {
  // this gets called as soon as we get a response back from the server after a mutation has been performed
  update = (cache, payload) => {
    const data = cache.readQuery({ query: CART_ITEMS_QUERY });

    //https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/
    const newData = JSON.parse(JSON.stringify(data)); //Object.assign({}, data);

    // remove the item from the cart
    const deletedItemId = payload.data.removeItemFromOrder.id;
    // console.log(payload)

    newData.myCurrentOrder.items = newData.myCurrentOrder.items.filter(
      (item) => item.id !== deletedItemId
    );

    // write it back to the cache
    // https://github.com/apollographql/apollo-client/pull/4664/files
    // if used with withApollo HOC
    this.props.client.writeQuery({
      query: CART_ITEMS_QUERY,
      data: { ...newData },
    });
  };
  render() {
    const { id } = this.props;
    return (
      // TODO - to make sure the cart wont open if no cart items left need to query myCurrentOrder each time after deleting a cart item. Delete Optimistic response?
      <Mutation
        mutation={REMOVE_ITEM_FROM_CART}
        variables={{ id }}
        update={this.update}
        optimisticResponse={{
          __typename: "Mutation",
          removeItemFromOrder: {
            __typename: "OrderItem",
            id,
          },
        }}
        refetchQueries={[{ query: CART_ITEMS_QUERY }]}
      >
        {(removeItemFromOrder, { loading, error }) => (
          <SmallDeleteButton
            onClick={() => {
              removeItemFromOrder().catch((error) => alert(error.message));
            }}
          >
            &times;
          </SmallDeleteButton>
        )}
      </Mutation>
    );
  }
}

export default withApollo(RemoveFromCart);
