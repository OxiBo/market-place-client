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
import { REQUEST_RESET } from "../utils/serverOperations";

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

class RequestReset extends Component {
  render() {
    const notify = () => {
      toast("Success! Check your email for a reset link!", toastOptions);
      this.props.history.push("/");
      return false;
    };
    return (
      <AuthContainer>
        <h2>Welcome To Our Marketplace!</h2>
        <Mutation
          mutation={REQUEST_RESET}
          onCompleted={() => notify()}

          // https://www.apollographql.com/docs/react/api/react-components/
        >
          {(requestReset, { loading, error, called }) => {
            return (
              <>
                <Helmet>
                  <title>Request Password Reset</title>
                </Helmet>
                {error && <Error error={error} />}
                {loading && <div>Loading....</div>}

                {/* {!error && !loading && called ? notify() : null} */}

                <Formik
                  initialValues={{
                    email: "",
                    type: "BUYER",
                  }}
                  validate={(values) => {
                    const { email } = values;
                    const errors = {};

                    if (!email) {
                      errors.email = "You have to provide your email";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
                    ) {
                      errors.email = "Invalid email address";
                    }

                    return errors;
                  }}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      await requestReset({
                        variables: values,
                      }); // https://stackoverflow.com/questions/54574000/how-to-pass-variables-to-an-apollo-mutation-component
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
                          <h3>Request Password Reset</h3>
                          <div className="fieldset">
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
                          </div>
                          <fieldset onChange={handleChange} value={values.type}>
                            <h4>Choose your role (required):</h4>
                            <div>
                              <input
                                type="radio"
                                id="buyer"
                                name="type"
                                value="BUYER"
                                defaultChecked
                                onChange={handleChange}
                              />
                              <label htmlFor="buyer">Buyer</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                id="seller"
                                name="type"
                                value="SELLER"
                                onChange={handleChange}
                              />
                              <label htmlFor="seller">Seller</label>
                            </div>
                          </fieldset>
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
                              Request Reset!
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

export default withCookies(RequestReset);
