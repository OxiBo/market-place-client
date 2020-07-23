import React, { Component } from "react";
// import { Link } from "react-router-dom";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
// import market from "../styles/images/market.jpeg";
// import { instanceOf } from "prop-types";
import { withCookies } from "react-cookie";
// import Test from "./Test"
// import Login from "./Login"
// import logo from "../logo.svg";
import Header from "./Header";
// import "../App.css";

export const theme = {
  black: "#393939",
  maxWidth: "700px",
  fontColor: "black",
  lightGrey: "#E1E1E1",
  purpleLight: "#D3B7CE",
  purple: "purple",
  sellerColor: "rgb(172, 97, 158)",
  purpleUnderline: "rgb(172, 97, 158)",
  innerContainerBackground: "rgb(225, 234, 250)", //"#D0F0E1"
  toastBackground: "rgba(238, 224, 235, 0.9)"
};

const GlobalStyle = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
font-size: 15px;

}
*, *:before, *:after{
  box-sizing: inherit;
}
html,
body {
  background: url(${"./tq6XCf.jpg"}) no-repeat center fixed;
  background-size: cover;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    font-size: 10px;
    h1, h2{
      text-align: center;
    }
}
`;

const Main = styled.div`
  color: ${(props) => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
  font-size: 1.5rem;
`;

class App extends Component {
  componentDidMount() {
    // const { cookies } = this.props;
    // this.setState({ authToken: cookies.get("token") });
    // console.log(this.props);
  }
  render() {
    // const { cookies } = this.props;
    // const authToken = cookies.get("token");
    // const userName = cookies.get("name")

    return (
      <ThemeProvider theme={theme}>
        <Main>
          <GlobalStyle />
          <Header />
          <Inner>{this.props.children}</Inner>
        </Main>
      </ThemeProvider>
    );
  }
}

export default withCookies(App);
