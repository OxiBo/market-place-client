// TODO - check props and /login (bug - offer to logout if logged in user visit the page or logout automatically?  )

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Mutation } from "react-apollo";
import styled from "styled-components";
import { withCookies, Cookies } from "react-cookie";
import Cart from "./Cart";
import { TOGGLE_CART_MUTATION } from "../utils/localOperations";

const Navbar = styled.nav`
  background-color: ${(props) => props.theme.purpleLight};
  min-height: 1rem;
  font-size: calc(10px + 2vmin);
  color: white;
  margin: 0 0 3rem 0;
  width: 100%;
  ul {
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

class Header extends Component {
  componentDidMount() {
    // console.log(this.props);
  }

  render() {
    // TODO - check out getAll property
    const { cookies } = this.props;
    const authToken = cookies.get("token");
    const userName = cookies.get("name");
    const userId = cookies.get("id");
    const type = cookies.get("type");
    // console.log(this.props.cookies)
    // console.log(this.props);
    // console.log(authToken)
    return (
      <Navbar>
        <ul>
          <Brand>BRAND</Brand>
          <li>
            <Link to="/">Home</Link>
          </li>
          {authToken ? (
            <>
              {type === "SELLER" && (
                <li>
                  <Link to={`/sell`}>sell</Link>
                </li>
              )}
              <li>
                <Link to={`/user-profile/${userId}`}>
                  Logged in as {userName}{" "}
                </Link>
              </li>
              <li>
                <Mutation mutation={TOGGLE_CART_MUTATION}>
                  {(toggleCart) => (
                    <a onClick={toggleCart}>
                      My Cart
                    </a>
                  )}
                </Mutation>
            
              </li>
              <li>
                <a
                  href=""
                  className=""
                  onClick={() => {
                    cookies.remove("token", { path: "/" });
                    cookies.remove("name", { path: "/" });
                    cookies.remove("id", { path: "/" });
                    cookies.remove("type", { path: "/" });

                    this.props.history.push(`/`);
                  }}
                >
                  Logout
                </a>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="">
                Login
              </Link>
            </li>
          )}
        </ul>
        <Cart />
      </Navbar>
    );
  }
}

export default withRouter(withCookies(Header));
