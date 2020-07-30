import gql from "graphql-tag";

export const CART_OPEN_QUERY = gql`
  query {
    cartOpen @client
  }
`;


export const TOGGLE_CART_MUTATION = gql`
mutation TODDLE_CART_MUTATION{
    toggleCart @client{
        cartOpen
    }
}`