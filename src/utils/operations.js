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
      reviews {
        text
        rating
      }
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

export const PAGINATION = gql`
  query PAGINATION {
    productsConnection {
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
        type
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
