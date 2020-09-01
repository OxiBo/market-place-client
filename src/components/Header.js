// TODO - check props and /login (bug - offer to logout if logged in user visit the page or logout automatically?  )

import React, { Component } from "react";

import { withCookies, Cookies } from "react-cookie";
import NavBar from "./NavBar";
import Cart from "./Cart";

class Header extends Component {
  render() {
    // console.log(this.props.allCookies)
    // TODO - check out getAll property
    const { cookies } = this.props;

    const type = cookies.get("type");

    return (
      <>
        <NavBar />

        {type === "BUYER" && <Cart />}
      </>
    );
  }
}

export default withCookies(Header);
