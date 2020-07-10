import React, { Component } from "react";
// import gql from "graphql-tag";
import { graphql, Query } from "react-apollo";
// import { gql } from "apollo-boost"
// import Helmet from 'react-helmet'
import styled from "styled-components";
import Error from "./ErrorMessage";
import InnerContainer from "./styled/InnerContainer";
import Item from "./Item";
import Pagination from "./Pagination";
import { perPage } from "../configVars";

import {
  FETCH_PRODUCTS,
  PRODUCT_SUBSCRIPTION,
  FETCH_USER_PROFILE,
} from "../utils/operations";

const ItemsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* :first-child {
    flex: 0 4;
  } */
`;
class Homepage extends Component {
  componentDidMount() {
    // console.log(this.props.location.search.split("=")[1]);
    // console.log(fetchProducts)
  }

  renderProducts(data) {
    return data.products.map((product) => {
      return <Item key={product.id} product={product} />;
    });
  }
  // https://www.howtographql.com/react-apollo/8-subscriptions/
  subscribeToNewProducts = async (subscribeToMore) => {
    subscribeToMore({
      document: PRODUCT_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        // console.log(subscriptionData);
        const mutationType = subscriptionData.data.product.mutation;
        // console.log(prev);
        if (!subscriptionData.data) return prev;
        // TODO - find a way to subscribe to new list without  deleted products
        if (mutationType === "DELETED") {
          return {
            products: prev.products.filter(
              (product) =>
                product.id !== subscriptionData.data.product.previousValues.id
            ),
          };
        }
        // if(subscriptionData.data.product.mutation !== "DELETE") {
        const newProduct = subscriptionData.data.product.node;
        // console.log(newProduct)
        // is it a good practice??  check if new product exists because in case of deleting a product, new product will be NULL -
        if (newProduct) {
          const exists = prev.products.findIndex(
            ({ id }) => id === newProduct.id
          );

          if (exists >= 0) {
            prev.products[exists] = newProduct;
            return { products: prev.products };
          } else {
            return { products: [...prev.products, newProduct] };
          }
          // }
        }
      },
    });
  };
  render() {
    // console.log(this.props);
    const page = this.props.location.search.split("=")[1];
    return (
      <InnerContainer>
        
        <h2>Product List</h2>
        <Pagination page={parseFloat(page) || 1} />
        <Query
          query={FETCH_PRODUCTS}
          variables={{ skip: page * perPage - perPage, first: perPage }}
        >
          {({ data, loading, error, subscribeToMore }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <Error error={error} />;

            this.subscribeToNewProducts(subscribeToMore);
            return <ItemsList>{this.renderProducts(data)}</ItemsList>;
          }}
        </Query>
        <Pagination
          page={parseFloat(this.props.location.search.split("=")[1]) || 1}
        />
      </InnerContainer>
    );
  }
}

export default Homepage;
