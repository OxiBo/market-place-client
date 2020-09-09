import React from "react";
import { shallow, mount } from "enzyme";
import { Link } from "react-router-dom";
import toJSON from "enzyme-to-json";
import wait from "waait";
import { act } from "react-dom/test-utils";
import { ApolloConsumer } from "react-apollo";
import { MemoryRouter, withRouter } from "react-router-dom"; // https://html.developreference.com/article/13543175/React+Router+Invariant+Violation+test+fails+with+%3CLink%3E+outside+%3CRouter%3E+%5Bduplicate%5D
// why MemoryRouter - https://github.com/enzymejs/enzyme/issues/1112#issuecomment-447643271
import OrderedItemsList from "../components/OrderedItemsList";
// import { CURRENT_USER_QUERY } from "../components/User";
// import { MockedProvider } from "react-apollo/test-utils";
import { MockedProvider } from "@apollo/react-testing";
// mocking withCookies - https://github.com/reactivestack/cookies/blob/master/packages/react-cookie/src/__tests__/withCookies-test.js
import { CookiesProvider, withCookies, Cookies } from "react-cookie";
import { setMyCookies } from "../testUtils/cookiesMocks";
import {
  FETCH_USER_ORDERITEMS,
  ALL_USER_ORDERITEMS_PAGINATION,
} from "../utils/serverOperations";
import InnerPagination from "../components/RenderProp/InnerPagination";
import { fakeOrderItems } from "../testUtils/fakeTestData";

const perPage = 2;

const fetchOrderItemsMocks = [
  {
    request: {
      query: FETCH_USER_ORDERITEMS,
      variables: {
        skip: 0,
        first: perPage,
      },
    },
    result: {
      data: {
        myOrderItems: fakeOrderItems(),
      },
    },
  },
];

const orderItemsPaginationMocks = (length) => {
  return [
    {
      request: {
        query: ALL_USER_ORDERITEMS_PAGINATION,
        variables: { userId: "4234" },
      },
      result: {
        data: {
          orderItemsConnection: {
            __typename: "aggregate",
            aggregate: {
              __typename: "count",
              count: length,
            },
          },
        },
      },
    },
  ];
};

it("displays a loading message", async () => {
  const wrapper = mount(
    <MemoryRouter>
      <MockedProvider
        mocks={[...orderItemsPaginationMocks(7), ...fetchOrderItemsMocks]}
      >
        <OrderedItemsList userId={"4234"} />
      </MockedProvider>
    </MemoryRouter>
  );

  expect(wrapper.text()).toContain("Loading...");
});

describe("<OrderItemsList/>", () => {
  let wrapper, myCookies, orderedItemsList;

  beforeEach(async () => {
    myCookies = setMyCookies(
      "token_lskdjflskdjflskdjflskdf",
      "BUYER",
      "Test",
      "lskdjflskdjflskdjflskdf"
    );

    wrapper = mount(
      <MemoryRouter>
        <MockedProvider
          mocks={[...orderItemsPaginationMocks(7), ...fetchOrderItemsMocks]}
        >
          <OrderedItemsList userId={"4234"} />
        </MockedProvider>
      </MemoryRouter>
    );

    await act(async () => wait());
    wrapper.update();
    orderedItemsList = wrapper.find("OrderedItemsList");
  });

  it("renders and matches snapshot", async () => {
    expect(
      toJSON(orderedItemsList.find("div[data-test='ordered-items-list']"))
    ).toMatchSnapshot();
  });
  it("renders a list of orderItems", async () => {
    const singleItem = wrapper.find("SingleOrderItem");
    expect(singleItem.length).toBe(perPage);
  });
});
