import React, { Component } from "react";
import { Formik } from "formik";
import styled from "styled-components";
// import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { Mutation } from "react-apollo";
// import gql from "graphql-tag";
import Error from "./ErrorMessage";
import Button from "./styled/Button";
import Buttons from "./styled/Buttons";
import Form from "./styled/Form";
import {
  LOGIN_USER,
  LOGIN_SELLER,
  SIGNUP_USER,
  SIGNUP_SELLER,
} from "../utils/operations";

const AuthContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  /* margin: 1rem; */
  h2 {
    text-align: center;
    margin: 0 0 3rem 0;
  }
  /* display: flex; */
`;

const ValidationError = styled.p`
  color: red;
  font-size: 1.2rem;
  font-weight: 200;
  text-align: center;
  /* width: 100px; */
`;

class Basic extends Component {
  state = {
    login: true, // switch between Login and SignUp
    // email: "",
    // password: "",
    // name: "",
    role: "BUYER",
    error: null,
  };
  _confirm = async (data) => {
    // console.log(data);
    const { token, user, seller } =
      this.state.role === "BUYER"
        ? this.state.login
          ? data.loginUser
          : data.createUser
        : this.state.login
        ? data.loginSeller
        : data.createSeller;

    const { name, id, type } = user || seller;
    this._saveAuthData(
      token,
      name,
      id,
      type
      // (user && user.name) || (seller && seller.name),
      // (user && user.id) || (seller && seller.id),
      // (user && user.type) || (seller && seller.type),
    );
    this.props.history.push("/");
  };

  _saveAuthData = (token, name, id, type) => {
    const { cookies } = this.props;
    // console.log(type);
    cookies.set("token", token, { path: "/" });
    cookies.set("id", id, { path: "/" });
    cookies.set("name", name, { path: "/" });
    cookies.set("type", type, { path: "/" });
  };
  render() {
    const { login, role } = this.state;
    return (
      <AuthContainer>
        <h1>Anywhere in your app!</h1>
        <Mutation
          mutation={
            login
              ? role === "BUYER"
                ? LOGIN_USER
                : LOGIN_SELLER
              : role === "BUYER"
              ? SIGNUP_USER
              : SIGNUP_SELLER
          }

          // https://www.apollographql.com/docs/react/api/react-components/
        >
          {(loginMutation, { loading, error }) => {
            return (
              <>
                {error && <Error error={error} />}
                {loading && <div>Loading....</div>}
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    role: "BUYER",
                  }}
                  validate={(values) => {
                    const { name, email, password } = values;
                    const errors = {};

                    if (!login && !name) {
                      errors.name = "You must provide your name";
                    } else if (
                      !login &&
                      (name.length < 2 || name.length > 15)
                    ) {
                      errors.name =
                        "Name cannot be less than 3 or more than 15 characters";
                    }

                    if (!email) {
                      errors.email = "You have to provide your email";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
                    ) {
                      errors.email = "Invalid email address";
                    }

                    if (password.length < 8 || password.length > 20) {
                      errors.password =
                        "Password has to be at least 8 characters long";
                    }
                    return errors;
                  }}
                  onSubmit={async (values, { setSubmitting }) => {
                    const { email, password, name } = values;

                    const variables = login
                      ? { data: { email, password } }
                      : { data: { email, password, name, type: role } };

                    try {
                      const response = await loginMutation({ variables }); // https://stackoverflow.com/questions/54574000/how-to-pass-variables-to-an-apollo-mutation-component
                      this._confirm(response.data);
                    } catch (error) {
                      console.error(error);
                    }
                    // if call setSubmit(false), the app is giving an error - https://github.com/formik/formik/issues/1449 - charleskoehl commented on Feb 11 •

                    /* setSubmitting(false); */
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => {
                    {
                      /* const { name, email, password } = values; */
                    }
                    return (
                      <Form>
                        <form action="" onSubmit={handleSubmit}>
                          <div className="fieldset">
                            {!login && (
                              <div>
                                <label htmlFor="name">Name:</label>
                                <div>
                                  <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Your name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                  />

                                  <p>
                                    {" "}
                                    {errors.name && touched.name && errors.name}
                                  </p>
                                </div>
                              </div>
                            )}

                            <div>
                              <label htmlFor="email">Email:</label>
                              <div>
                                <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  placeholder="Your email"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.email}
                                />
                                <p>
                                  {errors.email &&
                                    touched.email &&
                                    errors.email}
                                </p>
                              </div>
                            </div>
                            <div>
                              <label htmlFor="password">Password:</label>

                              <div>
                                <input
                                  type="password"
                                  name="password"
                                  id="password"
                                  placeholder="Your password"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.password}
                                />
                                <p>
                                  {errors.password &&
                                    touched.password &&
                                    errors.password}
                                </p>
                              </div>
                            </div>
                          </div>
                          <fieldset onChange={handleChange} value={values.role}>
                            <h4>Choose your role (required):</h4>
                            <div>
                              <input
                                type="radio"
                                id="buyer"
                                name="role"
                                value="BUYER"
                                defaultChecked
                              />
                              <label htmlFor="buyer">Buyer</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                id="seller"
                                name="role"
                                value="SELLER"
                              />
                              <label htmlFor="seller">Seller</label>
                            </div>
                          </fieldset>
                          <Buttons>
                            <Button type="submit" disabled={isSubmitting}>
                              {login ? "login" : "create account"}
                            </Button>

                            <Button
                              type="button"
                              className=""
                              onClick={() => this.setState({ login: !login })}
                            >
                              {login
                                ? "need an account?"
                                : "already have an account?"}
                            </Button>
                            <Button
                              onClick={() => {
                                this.props.history.goBack();
                              }}
                            >
                              Cancel
                            </Button>
                          </Buttons>

                          {/* <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button> */}
                        </form>
                      </Form>
                    );
                  }}
                </Formik>
              </>
            );
          }}
        </Mutation>
      </AuthContainer>
    );
  }
}

export default withCookies(Basic);
