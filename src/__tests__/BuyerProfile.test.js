import React from "react";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import { act } from "react-dom/test-utils";
import { ApolloConsumer } from "react-apollo";
import { MemoryRouter, withRouter } from "react-router-dom"; // https://html.developreference.com/article/13543175/React+Router+Invariant+Violation+test+fails+with+%3CLink%3E+outside+%3CRouter%3E+%5Bduplicate%5D
// why MemoryRouter - https://github.com/enzymejs/enzyme/issues/1112#issuecomment-447643271
import BuyerProfile from "../components/BuyerProfile";
// import { CURRENT_USER_QUERY } from "../components/User";
// import { MockedProvider } from "react-apollo/test-utils";
import { MockedProvider } from "@apollo/react-testing";
// mocking withCookies - https://github.com/reactivestack/cookies/blob/master/packages/react-cookie/src/__tests__/withCookies-test.js
import { CookiesProvider, withCookies, Cookies } from "react-cookie";
import { setMyCookies } from "../testUtils/cookiesMocks";
import {
  FETCH_USER_PROFILE,
  ALL_USER_ORDERITEMS_PAGINATION,
} from "../utils/serverOperations";
import { CART_OPEN_QUERY } from "../utils/localOperations";
import { fakeBuyer } from "../testUtils/fakeTestData";

const signedInBuyerProfile = [
  {
    request: { query: FETCH_USER_PROFILE },
    result: {
      data: {
        meUser: fakeBuyer(),
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

let myCookies, wrapper, buyerProfile, pureComponent;
const Component = withCookies(BuyerProfile);
beforeEach(async() => {
  myCookies = setMyCookies(
    "token_lskdjflskdjflskdjflskdf",
    "BUYER",
    "Test",
    "lskdjflskdjflskdjflskdf"
  );

  wrapper = mount(
    <CookiesProvider cookies={myCookies}>
      <MemoryRouter>
        <MockedProvider
          mocks={[...signedInBuyerProfile, ...orderItemsPaginationMocks(7)]}
        >
          <Component />
        </MockedProvider>
      </MemoryRouter>
    </CookiesProvider>
  );
  await act(async () => wait());
  wrapper.update();
  buyerProfile = wrapper.find("BuyerProfile");
  pureComponent = buyerProfile.instance();
});

describe("<BuyerProfile/>", () => {
  it("renders with buyer logged in and matches snapshot", async () => {
    // console.log(buyerProfile.find("div[data-test='buyer-profile']").debug())
    expect(
      toJSON(buyerProfile.find("div[data-test='buyer-profile']"))
    ).toMatchSnapshot();
  });

  it('changes "show ordered items" button\'s text when clicked and matches snapshot', async () => {
    const orderItemsButton = wrapper.find(
      'button[data-test="ordered-items-button"]'
    );
    expect(orderItemsButton.text()).toContain("Show ordered items");
    pureComponent.setState({ openOrderItems: true });
    expect(orderItemsButton.text()).toContain("Hide ordered items");
    expect(toJSON(orderItemsButton)).toMatchSnapshot();
  });

  it('hides "update profile" button, when the button has been clicked and matches snapshot', async () => {
    const updateProfileButton = buyerProfile.find(
      'button[data-test="update-profile-button"]'
    );
    expect(updateProfileButton).toMatchSnapshot()
    pureComponent.setState({ update: true });
    expect(updateProfileButton).toEqual({});
  });


  
});
