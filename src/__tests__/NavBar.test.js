import React from "react";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import { act } from "react-dom/test-utils";
import { ApolloConsumer } from "react-apollo";
import { MemoryRouter, withRouter } from "react-router-dom"; // https://html.developreference.com/article/13543175/React+Router+Invariant+Violation+test+fails+with+%3CLink%3E+outside+%3CRouter%3E+%5Bduplicate%5D
// why MemoryRouter - https://github.com/enzymejs/enzyme/issues/1112#issuecomment-447643271
import { NavBar } from "../components/NavBar";
// import { CURRENT_USER_QUERY } from "../components/User";
// import { MockedProvider } from "react-apollo/test-utils";
import { MockedProvider } from "@apollo/react-testing";
 // mocking withCookies - https://github.com/reactivestack/cookies/blob/master/packages/react-cookie/src/__tests__/withCookies-test.js
import { CookiesProvider, withCookies, Cookies } from "react-cookie";

import { CART_ITEMS_QUERY } from "../utils/serverOperations";
import { CART_OPEN_QUERY } from "../utils/localOperations";

// mocking resolvers for queries and mutations with @client directive - https://github.com/apollographql/react-apollo/issues/3316#issuecomment-518948531
const resolvers = {
  defaults: {
    cartOpen: false,
  },
};

const fakeCurrentOrder = {
  id: "abc123",
  items: [
    {
      count: 1,
      id: "abc098",
      image: null,
      name: "test jest",
      price: 2222222,
      __typename: "OrderItem",
      product: {
        id: "prod_cke0uyoym023q0765s7qaqm9k",
        image: null,
        name: "test jest",
        price: 2222222,
        __typename: "Product",
      },
    },
    {
      count: 5,
      id: "qwe098",
      image: null,
      name: "test jest 2",
      price: 1111111,
      __typename: "OrderItem",
      product: {
        id: "prod2_cke0uyoym023q0765s7qaqm9k",
        image: null,
        name: "test jest 2",
        price: 1111111,
        __typename: "Product",
      },
    },
  ],
  __typename: "Order",
};
const signedInMocksWithCartItems = [
  {
    request: { query: CART_ITEMS_QUERY },
    result: {
      data: {
        myCurrentOrder: fakeCurrentOrder,
      },
    },
  },
  {
    request: { query: CART_OPEN_QUERY },
    result: {
      data: {
        cartOpen: false,
      },
    },
  },
];

// const originalError = console.error;

// beforeAll(() => {
//   console.error = jest.fn();
// });

// afterAll(() => {
//   console.error = originalError;
// });

describe("<NavBar />", () => {
  it("renders component without being logged in and match snapshot", async () => {
    const cookies = new Cookies();

    // mocking withCookies - https://github.com/reactivestack/cookies/blob/master/packages/react-cookie/src/__tests__/withCookies-test.js
    const Component = withCookies(NavBar);

    const wrapper = mount(
      <CookiesProvider cookies={cookies}>
        <MemoryRouter>
          <MockedProvider resolvers={resolvers}>
            <Component />
          </MockedProvider>
        </MemoryRouter>
      </CookiesProvider>
    );
    // console.log(wrapper.debug())

    await act(async () => wait());
    wrapper.update();
    const navBar = wrapper.find('ul[data-test="nav"]');
    // console.log(navBar.debug());
    expect(navBar.children().length).toBe(3);

    expect(toJSON(navBar)).toMatchSnapshot();
  });

  it("renders component with buyer logged in and match snapshot", async () => {
    const cookies = new Cookies();
    cookies.set("token", "token_lskdjflskdjflskdjflskdf");
    cookies.set("type", "BUYER");
    cookies.set("name", "Test");
    cookies.set("id", "lskdjflskdjflskdjflskdf");

    const Component = withCookies(NavBar);

    const wrapper = mount(
      <CookiesProvider cookies={cookies}>
        <MemoryRouter>
          <MockedProvider
            mocks={signedInMocksWithCartItems}
            resolvers={resolvers}
          >
            <Component />
          </MockedProvider>
        </MemoryRouter>
      </CookiesProvider>
    );
    // console.log(wrapper.debug())

    await act(async () => wait());
    wrapper.update();
    const navBar = wrapper.find('ul[data-test="nav"]');

    expect(navBar.children().length).toBe(7);
    expect(navBar.text()).toContain("Logout");
    expect(toJSON(navBar)).toMatchSnapshot();
  });

  it("renders component with seller logged in and match snapshot", async () => {
    const cookies = new Cookies();
    cookies.set("token", "token_lskdjflskdjflskdjflskdf");
    cookies.set("type", "SELLER");
    cookies.set("name", "Seller");
    cookies.set("id", "lskdjflskdjflskdjflskdf");

    const Component = withCookies(NavBar);

    const wrapper = mount(
      <CookiesProvider cookies={cookies}>
        <MemoryRouter>
          <MockedProvider
            mocks={signedInMocksWithCartItems}
            resolvers={resolvers}
          >
            <Component />
          </MockedProvider>
        </MemoryRouter>
      </CookiesProvider>
    );
    // console.log(wrapper.debug())

    await act(async () => wait());
    wrapper.update();
    const navBar = wrapper.find('ul[data-test="nav"]');
    // console.log(navBar.debug());
    expect(navBar.children().length).toBe(6);
    expect(toJSON(navBar)).toMatchSnapshot();
  });

  it("renders the amount of items in buyer's cart", async () => {
    const Component = withCookies(NavBar);
    const cookies = new Cookies();
    cookies.set("token", "token_lskdjflskdjflskdjflskdf");
    cookies.set("type", "BUYER");
    cookies.set("name", "Test");
    cookies.set("id", "lskdjflskdjflskdjflskdf");
    const wrapper = mount(
      <CookiesProvider cookies={cookies}>
        <MemoryRouter>
          <MockedProvider
            mocks={signedInMocksWithCartItems}
            resolvers={resolvers}
          >
            <Component />
          </MockedProvider>
        </MemoryRouter>
      </CookiesProvider>
    );
    // console.log(wrapper.debug())

    await act(async () => wait());
    wrapper.update();

    const nav = wrapper.find('ul[data-test="nav"]');
    // console.log(nav);
    const count = nav.find("span.count");
    // console.log(count.text());
    expect(Number(count.text())).toEqual(
      fakeCurrentOrder.items.reduce((sum, item) => sum + item.count, 0)
    );

    // expect(toJSON(count)).toMatchSnapshot();
    // expect(toJSON(nav)).toMatchSnapshot();
  });
  it("signs user out when the logout button is clicked", async () => {
    const cookies = new Cookies();
    cookies.set("token", "token_lskdjflskdjflskdjflskdf");
    cookies.set("type", "BUYER");
    cookies.set("name", "Test");
    cookies.set("id", "lskdjflskdjflskdjflskdf");

    const Component = withRouter(withCookies(NavBar));
    let apolloClient;
    const wrapper = mount(
      <CookiesProvider cookies={cookies}>
        <MemoryRouter>
          <MockedProvider
            mocks={signedInMocksWithCartItems}
            resolvers={resolvers}
          >
            <ApolloConsumer>
              {(client) => {
                apolloClient = client;
                return <Component />;
              }}
            </ApolloConsumer>
          </MockedProvider>
        </MemoryRouter>
      </CookiesProvider>
    );
    await act(async () => wait());
    wrapper.update();
    const logoutButton = wrapper.find('a[data-test="logout"]');
    // console.log(logoutButton.debug());
    logoutButton.simulate("click");
    await act(async () => wait());
    const loginButton = wrapper.find('a[data-test="login"]');
    console.log(loginButton.debug());
    expect(loginButton.text()).toContain("Login");
  });
});
