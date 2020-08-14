import gql from "graphql-tag";
import { perPage } from "../configVars";

export const PRODUCT_SUBSCRIPTION = gql`
  subscription {
    product {
      node {
        id
        name
        description
        price
        rating
        stock
        seller {
          name
          id
        }
      }
      mutation
      previousValues {
        id
      }
    }
  }
`;

export const FETCH_PRODUCTS = gql`
query FETCH_PRODUCTS($skip: Int = 0, $first: Int = ${perPage} )
  {
    products(skip: $skip, first: $first, orderBy: createdAt_DESC ) {
      id
      name
      # description
      image
      price
      rating
      stock
      seller {
        id
        name
      }
    }
  }
`;

export const FETCH_SINGLE_PRODUCT = gql`
  query FETCH_SINGLE_PRODUCT($id: ID!) {
    product(where: { id: $id }) {
      id
      name
      department
      description
      largeImage
      price
      rating
      stock
      seller {
        id
        name
      }
    }
  }
`;

export const SEARCH_PRODUCT = gql`
  query SEARCH_PRODUCT($query: String) {
    products(query: $query) {
      id
      name
      image
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct($data: CreateProductInput!) {
    createProduct(data: $data) {
      id
      name
      department
      description
      image
      largeImage
      price
      rating
      stock
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

export const ALL_PRODUCTS_PAGINATION = gql`
  query ALL_PRODUCTS_PAGINATION {
    productsConnection {
      aggregate {
        count
      }
    }
  }
`;

// https://stackoverflow.com/questions/44403930/error-network-error-error-writing-result-to-store-for-query-apollo-client
// export const FETCH_PRODUCT_REVIEWS = gql`
//   query FETCH_PRODUCT_REVIEWS($id: ID!) {
//     product(where: { id: $id }) {
//       id
//       name
//       reviews {
//         id
//         text
//         rating
//       }
//     }
//   }
// `;

export const FETCH_SELLERS = gql`
query FETCH_SELLERS($skip: Int = 0, $first: Int = ${perPage} ){
  sellers(skip: $skip, first: $first, orderBy: createdAt_DESC ){
    id
    name
    email
  }
}`;

export const SEARCH_SELLER = gql`
  query SEARCH_SELLER($query: String) {
    sellers(query: $query) {
      id
      name
      image
    }
  }
`;

export const ALL_SELLERS_PAGINATION = gql`
  query ALL_SELLERS_PAGINATION {
    sellersConnection {
      aggregate {
        count
      }
    }
  }
`;

export const FETCH_PRODUCT_REVIEWS = gql`
  query FETCH_PRODUCT_REVIEWS($productId: ID, $skip: Int = 0, $first: Int = 4) {
    reviews(
      productId: $productId
      first: $first
      skip: $skip
      orderBy: createdAt_DESC
    ) {
      id
      rating
      text
    }
  }
`;

export const ALL_REVIEWS_PAGINATION = gql`
  query ALL_REVIEWS_PAGINATION($productId: ID!) {
    reviewsConnection(where: { product: { id: $productId } }) {
      aggregate {
        count
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($data: LoginUserInput!) {
    loginUser(data: $data) {
      token
      user {
        id
        name
        age
        type
      }
    }
  }
`;

export const LOGIN_SELLER = gql`
  mutation loginSeller($data: LoginSellerInput!) {
    loginSeller(data: $data) {
      token
      seller {
        id
        name
        email
        type
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation createUser($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
        name
        email
        age
        image
        type
      }
    }
  }
`;

export const SIGNUP_SELLER = gql`
  mutation createSeller($data: CreateSellerInput!) {
    createSeller(data: $data) {
      token
      seller {
        id
        name
        email
        image
        type
      }
    }
  }
`;

export const REQUEST_RESET = gql`
  mutation REQUEST_RESET($email: String!, $type: String!) {
    requestReset(email: $email, type: $type) {
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD(
    $type: String!
    $password: String!
    $resetToken: String!
  ) {
    resetPassword(type: $type, password: $password, resetToken: $resetToken) {
      ... on UserAuthPayLoad {
        token
        user {
          id
          type
          name
        }
      }
      ... on SellerAuthPayLoad {
        token
        seller {
          id
          type
          name
        }
      }
    }
  }
`;

export const FETCH_USER_PROFILE = gql`
  query {
    meUser {
      id
      name
      email
      age
      type
      image
    }
  }
`;

export const SELLER_PUBLIC_PROFILE = gql`
  query SELLER_PUBLIC_PROFILE($id: ID!) {
    seller(id: $id) {
      id
      name
      email
    }
  }
`;

export const FETCH_SELLER_PROFILE = gql`
  query {
    meSeller {
      id
      name
      email
      type
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      id
      name
      email
      age
      image
      type
    }
  }
`;

export const UPDATE_SELLER = gql`
  mutation updateSeller($data: UpdateSellerInput!) {
    updateSeller(data: $data) {
      id
      name
      email

      type
    }
  }
`;

export const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToOrder(id: $id) {
      id
      count
      product {
        id
        name
      }
    }
  }
`;

export const REMOVE_ITEM_FROM_CART = gql`
  mutation REMOVER_ITEM_FROM_CART($id: ID!) {
    removeItemFromOrder(id: $id) {
      id
    }
  }
`;

export const CART_ITEMS_QUERY = gql`
  query OPEN_CART_QUERY {
    myCurrentOrder {
      id
      items {
        id
        count
        product {
          id
          name
          price
          image
        }
      }
    }
  }
`;
