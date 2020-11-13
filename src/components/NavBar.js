// TODO - check props and /login (bug - offer to logout if logged in user visit the page or logout automatically?  )

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Mutation, Query } from "react-apollo";
import styled from "styled-components";
import { withCookies, Cookies } from "react-cookie";
import CartCount from "./CartCount";
import { TOGGLE_CART_MUTATION } from "../utils/localOperations";
import { CART_ITEMS_QUERY } from "../utils/serverOperations";
import removeAuthCookies from "../utils/removeAuthCookies";

const Navbar = styled.nav`
  background-color: ${(props) => props.theme.purpleLight};
  min-height: 1rem;
  font-size: calc(10px + 2vmin);
  color: white;
  margin: 0 0 3rem 0;
  width: 100%;
  ul.navbar {
    display: flex;
    justify-content: space-around;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      text-transform: uppercase;
      position: relative;
      &:before {
        content: "";
        width: 2px;
        background: ${(props) => props.theme.lightGrey};
        height: 100%;
        /* left: 0; */
        /* position: absolute; */
        transform: skew(-20deg);
        /* top: 0;
        bottom: 0; */
      }
      &:after {
        height: 2px;

        content: "";
        width: 0;

        transform: translateX(-50%);
      }
    }
    a {
      text-decoration: none;
      padding: 0.9rem;
      color: white !important;
      cursor: pointer;
      &:before {
        content: "";
        width: 2px;
        background: ${(props) => props.theme.lightGrey};
        height: 100%;
        left: 0;
        position: absolute;
        transform: skew(-20deg);
        top: 0;
        bottom: 0;
      }
      &:after {
        height: 4px;
        background: ${(props) => props.theme.purpleUnderline};
        content: "";
        width: 0;
        position: absolute;
        transform: translateX(-50%);
        transition: width 0.4s;
        transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
        left: 50%;
        margin-top: 2.5rem;
      }
      &:hover,
      &:focus {
        outline: none;
        &:after {
          width: calc(90% - 30px);
        }
      }
    }
  }
`;

const Brand = styled.h2`
  margin-right: auto;
  padding: 0.9rem;
  transform: rotate(-20deg);
`;

class NavBar extends Component {
  render() {
    // console.log(this.props.allCookies)
    // TODO - check out getAll property
    const { cookies } = this.props;
    const authToken = cookies.get("token");
    const userName = cookies.get("name");
    const userId = cookies.get("id");
    const type = cookies.get("type");
    // console.log(this.props.cookies);
    // console.log(this.props);
    // console.log(authToken)
    return (
      <Navbar>
        <ul className="navbar" data-test="nav">
          <Brand>BRAND</Brand>
          <li>
            <Link to="/">Home</Link>
          </li>
          {authToken ? (
            <>
              <li>
                <Link to={`/sellers`}>Sellers</Link>
              </li>

              {type === "SELLER" && (
                <li>
                  <Link to={`/sell`}>sell</Link>
                </li>
              )}
              {type === "BUYER" && (
                <li>
                  <Link to={`/orders`}>My Orders</Link>
                </li>
              )}
              <li>
                {type === "BUYER" ? (
                  <Link to={`/buyer-profile/${userId}`}>
                    {userName}'s profile
                  </Link>
                ) : (
                  <Link to={`/seller-profile/${userId}`}>
                    {userName}'s profile
                  </Link>
                )}
              </li>
              {type === "BUYER" && (
                <li>
                  <Mutation mutation={TOGGLE_CART_MUTATION}>
                    {(toggleCart) => (
                      <a onClick={toggleCart}>
                        My Cart{" "}
                        <Query query={CART_ITEMS_QUERY}>
                          {({ data, error, loading }) => {
                            if (data) {
                              return <CartCount count={data} />;
                            }

                            return null;
                          }}
                        </Query>
                      </a>
                    )}
                  </Mutation>
                </li>
              )}
              <li>
                <a
                  data-test="logout"
                  href=""
                  className=""
                  onClick={() => {
                    removeAuthCookies(cookies);

                    this.props.history.push(`/`);
                  }}
                >
                  Logout
                </a>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="" data-test="login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </Navbar>
    );
  }
}

export default withCookies(withRouter(NavBar));
export { NavBar };
