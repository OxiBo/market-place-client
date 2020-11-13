import React from "react";
import { useHistory } from "react-router-dom";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import wait from "waait";
import { act } from "react-dom/test-utils";
import { ApolloConsumer } from "react-apollo";
import { MemoryRouter, withRouter } from "react-router-dom"; // https://html.developreference.com/article/13543175/React+Router+Invariant+Violation+test+fails+with+%3CLink%3E+outside+%3CRouter%3E+%5Bduplicate%5D
// why MemoryRouter - https://github.com/enzymejs/enzyme/issues/1112#issuecomment-447643271
import DeleteUser from "../components/DeleteUser";
// import { CURRENT_USER_QUERY } from "../components/User";
// import { MockedProvider } from "react-apollo/test-utils";
import { MockedProvider } from "@apollo/react-testing";
// mocking withCookies - https://github.com/reactivestack/cookies/blob/master/packages/react-cookie/src/__tests__/withCookies-test.js
import { CookiesProvider, withCookies, Cookies } from "react-cookie";
import { setMyCookies } from "../testUtils/cookiesMocks";
import {
  FETCH_USER_PROFILE,
  DELETE_SELLER,
  DELETE_USER,
} from "../utils/serverOperations";
import { fakeBuyer, fakeDeletedBuyer } from "../testUtils/fakeTestData";
import removeAuthCookies from "../utils/removeAuthCookies";

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

const deletedUser = [
  {
    request: { query: DELETE_USER },
    result: {
      data: {
        deleteUser: fakeDeletedBuyer(),
      },
    },
  },
  //   {
  //     request: { mutation: DELETE_SELLER },
  //     result: {
  //       data: {
  //         deleteUser: "abc123",
  //       },
  //     },
  //   },
];

// const historyMock = jest.mock("react-router-dom", () => ({
//   useHistory: () => ({
//     push: jest.fn(),
//   }),
// }));

const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
// const historyMock  = jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useHistory: () => ({
//       push: jest.fn()
//     })
//   }));

let myCookies, wrapper, deleteUser, apolloClient;

beforeEach(async () => {
  myCookies = setMyCookies(
    "token_lskdjflskdjflskdjflskdf",
    "BUYER",
    "Test",
    "lskdjflskdjflskdjflskdf"
  );
  const cookies = new Cookies();
  wrapper = mount(
    <CookiesProvider cookies={myCookies}>
      <MemoryRouter>
        <MockedProvider mocks={[...signedInBuyerProfile, ...deletedUser]}>
          <ApolloConsumer>
            {(client) => {
              apolloClient = client;
              return (
                <DeleteUser
                  type={"BUYER"}
                  history={historyMock}
                  cookies={cookies}
                />
              );
            }}
          </ApolloConsumer>
        </MockedProvider>
      </MemoryRouter>
    </CookiesProvider>
  );
  await act(async () => wait());
  wrapper.update();
  deleteUser = wrapper.find("DeleteUser");
  //   pureComponent = buyerProfile.instance();
});

describe("<DeleteUser />", () => {
  it("renders the delete button and matches the snapshot", () => {
    // const cookies = new Cookies();
    // const history = useHistory();
    // mocking withCookies - https://github.com/reactivestack/cookies/blob/master/packages/react-cookie/src/__tests__/withCookies-test.js
    // const Component = withCookies(NavBar);

    // console.log(deleteUser.debug());
    expect(toJSON(deleteUser)).toMatchSnapshot();
  });

//   it("deletes user and removes cookies on button click", async () => {
//     const deleteButton = deleteUser.find("button");
//     console.log(deleteButton.debug());

//     deleteButton.simulate("click");
//     await act(async () => wait());
//     wrapper.update();
//     const res = await apolloClient.query({query: FETCH_USER_PROFILE})
//     console.log(res)
//     console.log(wrapper.debug());

//     // expect(historyMock.push.mock).toHaveBeenCalled();
//     console.log(historyMock.push.mock);
//     expect(historyMock.push.mock.calls[0][0]).toEqual("/");
//     //    expect(deleteUser).toHaveBeenCalled()
//     // expect(loginButton.text()).toContain("Login");
//   });
});
