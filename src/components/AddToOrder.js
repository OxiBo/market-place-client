import React from "react";
import { Mutation } from "react-apollo";
import ItemButton from "./styled/ItemButton";
import { ADD_TO_CART_MUTATION, CART_ITEMS_QUERY } from "../utils/serverOperations";

const AddToOrder = (props) => {
  const { id } = props;
  return (
    <Mutation
      mutation={ADD_TO_CART_MUTATION}
      variables={{ id }}
      refetchQueries={[{query: CART_ITEMS_QUERY}]}
      onCompleted={(data) => console.log(data)}
    >
      {(addToOrder, { data, error, loading }) => {
        {
          /* if (error) console.log(error.message); */
        }
        return <ItemButton disabled={loading} onClick={addToOrder}>Add{loading && "ing"} To Cart</ItemButton>;
      }}
    </Mutation>
  );
};

export default AddToOrder;
