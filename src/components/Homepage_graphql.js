import React, { Component } from "react";
// import gql from "graphql-tag";
import { graphql } from "react-apollo";
// import { gql } from "apollo-boost"
import InnerContainer from "./styled/InnerContainer";
import { FETCH_PRODUCTS, PRODUCT_SUBSCRIPTION } from "../utils/operations";

class Homepage extends Component {
  componentDidMount() {
    // console.log(this.props);
    // console.log(fetchProducts)
  }

  renderProducts() {
    return this.props.data.products.map((product) => {
      return (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <p>{product.seller.name}</p>
        </div>
      );
    });
  }

  subscribeToNewProducts = async (subscribeToMore) => {
    subscribeToMore({
      document: PRODUCT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        console.log(subscriptionData);
        if (!subscriptionData.data) return prev;
        const newProduct = subscriptionData.data.product.node;
        const exists = prev.products.findIndex(
          ({ id }) => id === newProduct.id
        );

        if (exists >= 0) {
          prev.products[exists] = newProduct;
          return { products: prev.products };
        } else {
          return { products: [...prev.products, newProduct] };
        }
      },
    });
  };
  render() {
    this.subscribeToNewProducts(this.props.data.subscribeToMore);
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }
    if (this.props.data.error)
      return <div>{this.props.data.error.message}</div>;
    return <InnerContainer>{this.renderProducts()}</InnerContainer>;
  }
}

export default /*graphql(subscriptionToProducts)*/ graphql(FETCH_PRODUCTS)(
  Homepage
);
