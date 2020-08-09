// https://spectrum.chat/apollo/apollo-client/apollo-client-cookies~9a6087a8-a67e-4df6-935d-bd3eecbdbdaa

// cookies - https://medium.com/@rossbulat/using-cookies-in-react-redux-and-react-router-4-f5f6079905dc

import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Router,
  Route,
  Switch,
  hashHistory,
} from "react-router-dom";
// import ApolloBoost, { gql } from "apollo-boost";
import { CookiesProvider } from "react-cookie";

import "./index.scss";
import logo from "./logo.svg";

// import "./App.css";
import * as serviceWorker from "./serviceWorker";
// flesh messages
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ApolloProvider, ApolloConsumer } from "react-apollo";
import { withClientState } from "apollo-link-state";
// const client = new ApolloBoost({
//   uri: "http://localhost:8080/",
// });
import { ApolloClient } from "apollo-client";
import { split } from "apollo-link";
import { setContext } from "apollo-link-context";
import { getMainDefinition } from "apollo-utilities";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { onError } from "apollo-link-error";
// import history from "./history.js";

import App from "./components/App";
import requireSellerAuth from "./components/HOC/requireSellerAuth";
import Homepage from "./components/Homepage";
import UserProfile from "./components/UserProfile";
import RequestReset from "./components/RequestReset";
import ResetPassword from "./components/ResetPassword";
import Seller from "./components/Seller";
import SingleItem from "./components/SingleItem";
import Login from "./components/Login";
import CreateProduct from "./components/CreateProduct";

import { CART_OPEN_QUERY } from "./utils/localOperations";

const httpLink = createHttpLink({
  uri: "http://localhost:7070",
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: "ws://localhost:7070",
  options: {
    reconnect: true,
  },
});

// using the ability to split links, you can send data to each link depending on what kind of operation is being sent
// https://www.howtographql.com/react-apollo/8-subscriptions/
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink
  // httpLink
);

// console.log(document.cookie > 0)
// https://www.howtographql.com/react-apollo/5-authentication/
const authLink = setContext((_, { headers }) => {
  // console.log(document.cookie);
  const getToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token"));
  // console.log(getToken);

  if (getToken) {
    const token = getToken.split("=")[1];
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  }
  // const token = document.cookie
  //   ? document.cookie
  //       .split("; ")
  //       .find((row) => row.startsWith("token"))
  //       .split("=")[1]
  //   : ""; // get cookie - https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie

  // console.log(token);
  // return {
  //   headers: {
  //     ...headers,
  //     authorization: token ? `Bearer ${token}` : "",
  //   },
  // };
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations,
          null,
          2
        )}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const cache = new InMemoryCache();
// https://www.apollographql.com/docs/link/links/state/
const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      toggleCart(_, variables, { cache }) {
        // read the cartOpen value from the cart
        const { cartOpen } = cache.readQuery({
          query: CART_OPEN_QUERY,
        });
        // console.log(cartOpen);
        // write the cart State to the opposite
        const data = {
          data: { cartOpen: !cartOpen },
        };
        cache.writeData(data);
      },
    },
  },
  defaults: {
    cartOpen: false,
  },
});

const client = new ApolloClient({
  // link: httpLink,
  link: link
    .concat(authLink)
    .concat(errorLink)
    .concat(stateLink)
    .concat(httpLink),
  cache,
  dataIdFromObject: (o) => o.id,
});

ReactDOM.render(
  <CookiesProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={15000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <Switch>
          <App>
            <Route exact path="/" component={Homepage} />
            <Route path="/login" exact component={Login} />
            <Route path="/request-reset" exact component={RequestReset} />
            <Route path="/reset" exact component={ResetPassword} />
            <Route exact path="/user-profile/:id" component={UserProfile} />
            {/* public seller profile */}
            <Route exact path="/seller/:id" component={Seller} />
            <Route
              exact
              path="/sell"
              component={requireSellerAuth(CreateProduct)}
            />
            <Route exact path="/item/:id" component={SingleItem} />
            {/* <Route exact path='/formik-test' component={Basic} /> */}
          </App>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  </CookiesProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
