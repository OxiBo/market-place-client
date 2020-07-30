import React, { Component } from "react";
import styled from "styled-components";

import { Mutation } from "react-apollo";

import { DELETE_PRODUCT } from "../utils/serverOperations";
import { ItemButton } from "./Item";

class DeleteButton extends Component {
  // use this in mutation component this the function below -   update={this.update}
  /* update = (cache, payload) => {
    const data = cache.readQuery({ query: FETCH_PRODUCTS });
    data.products = data.products.filter((product) => {
      return product.id !== payload.data.deleteProduct.id;
    });
    
    cache.writeQuery({ query: FETCH_PRODUCTS, data });
  }; */

  render() {
    return (
      <Mutation mutation={DELETE_PRODUCT} variables={{ id: this.props.id }}>
        {(deleteProduct, { error }) => (
          <ItemButton
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this product?")
              ) {
                deleteProduct();
                if (this.props.history) {
                  this.props.history.push("/");
                }
              }
            }}
          >
            {this.props.children}
          </ItemButton>
        )}
      </Mutation>
    );
  }
}

export default DeleteButton;
