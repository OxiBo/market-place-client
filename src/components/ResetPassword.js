import React, { Component } from "react";
import { Formik } from "formik";
// import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import { toast } from "react-toastify";
import { toastOptions, errorToastStyle } from "./styled/toastifyStyles";
import styled from "styled-components";
// import { instanceOf } from "prop-types";
import { withCookies } from "react-cookie";
import { Mutation } from "react-apollo";
// import gql from "graphql-tag";
import Error from "./ErrorMessage";
// import RequestReset from "./RequestReset";
import Button from "./styled/Button";
import Buttons from "./styled/Buttons";
import Form from "./styled/Form";
import { RESET_PASSWORD } from "../utils/serverOperations";
import saveAuthToCookies from "../utils/saveAuthToCookies";

const AuthContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  /* margin: 1rem; */
  h2 {
    font-size: 3rem;
    text-align: center;
    margin: 0 0 3rem 0;
  }
  /* display: flex; */
`;

class ResetPassword extends Component {
  state = {
    // role: "BUYER", //??
    // error: null,
  };

  componentDidMount() {
    // console.log(this.props);
  }

  render() {
    // const { login, role } = this.state;
    return (
      <AuthContainer>
        <h2>Welcome To Our Marketplace!</h2>
        <Mutation
          mutation={RESET_PASSWORD}

          // https://www.apollographql.com/docs/react/api/react-components/
        >
          {(resetPassword, { loading, error, called }) => {
            const notify = () => {
              toast("Success!You have changed your password!", toastOptions);
              this.props.history.push("/");
              return false;
            };
            return (
              <>
                <Helmet>
                  <title>Password Reset</title>
                </Helmet>
                {error && <Error error={error} />}
                {loading && <div>Loading....</div>}
                {/* TODO - implement tostify message or a message informing that reset link has been sent to the email provided */}
                {!error && !loading && called && notify()}

                <Formik
                  initialValues={{
                    password: "",
                    confirmPassword: "",
                  }}
                  validate={(values) => {
                    const { password, confirmPassword } = values;
                    const errors = {};

                    if (password.length < 8 || password.length > 20) {
                      errors.password =
                        "Password has to be at least 8 characters long";
                    }
                    if (
                      confirmPassword.length < 8 ||
                      confirmPassword.length > 20
                    ) {
                      errors.confirmPassword =
                        "Password has to be at least 8 characters long";
                    }

                    if (password !== confirmPassword) {
                      errors.confirmPassword = "Your passwords do not match";
                    }

                    return errors;
                  }}
                  onSubmit={async (values, { setSubmitting }) => {
                    const userType = this.props.location.search
                      .split("?")
                      .find((row) => row.startsWith("type"))
                      .split("=")[1];

                    const resetToken = this.props.location.search
                      .split("?")
                      .find((row) => row.startsWith("resetToken"))
                      .split("=")[1];
                    try {
                      const res = await resetPassword({
                        variables: {
                          type: userType,
                          password: values.password,
                          resetToken,
                        },
                      }); // https://stackoverflow.com/questions/54574000/how-to-pass-variables-to-an-apollo-mutation-component

                      const { id, type, name } =
                        res.data.resetPassword.seller ||
                        res.data.resetPassword.user;
                      const { token } = res.data.resetPassword;

                      const { cookies } = this.props;
                      saveAuthToCookies(cookies, token, id, name, type);
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
                    return (
                      <Form>
                        {/* TODO - disable the form while loading(after firing off the mutation) */}
                        <form action="" method="POST" onSubmit={handleSubmit}>
                          <h3>Reset Your Password </h3>
                          <div className="fieldset">
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
                                  {(errors.password &&
                                    touched.password &&
                                    errors.password) ||
                                    errors.passwordNoMatch}
                                </p>
                              </div>
                            </div>
                            <div>
                              <label htmlFor="confirmPassword">
                                Confirm Your Password:
                              </label>

                              <div>
                                <input
                                  type="password"
                                  name="confirmPassword"
                                  id="confirmPassword"
                                  placeholder="Confirm Your Password"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.confirmPassword}
                                />
                                <p>
                                    {/* passwords no match error handling */}
                                  {(errors.confirmPassword &&
                                    touched.confirmPassword &&
                                    errors.confirmPassword) ||
                                    errors.passwordNoMatch}
                                </p>
                              </div>
                            </div>
                          </div>

                          <Buttons>
                            <Button
                              type="button"
                              onClick={() => {
                                this.props.history.goBack(); // TODO - check when it redirects if there were error messages while logging in
                              }}
                            >
                              Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                              Reset Password!
                            </Button>
                          </Buttons>
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

export default withCookies(ResetPassword);
