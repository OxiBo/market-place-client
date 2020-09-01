import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import Helmet from "react-helmet";
import { Formik } from "formik";
import styled from "styled-components";
import { withCookies } from "react-cookie";
import Error from "./ErrorMessage";
import InnerContainer from "./styled/InnerContainer";
import Button from "./styled/Button";
import Buttons from "./styled/Buttons";
import Form from "./styled/Form";

import {
  FETCH_USER_PROFILE,
  FETCH_SELLER_PROFILE,
  UPDATE_USER,
  UPDATE_SELLER,
} from "../utils/serverOperations";

const Content = styled(InnerContainer)`
  background-color: #fdfcfc;
  display: flex;
  div {
    margin: 0.5rem;
    padding: 1rem;
    p {
      padding: 0.5rem;
    }
  }
`;

class UserProfile extends Component {
  state = {
    update: false,
    role: this.props.cookies.get("type"),
  };

  render() {
    const { role } = this.state;
    const fetchProfile =
      role === "BUYER" ? FETCH_USER_PROFILE : FETCH_SELLER_PROFILE;

    return (
      <div>
        <Query query={fetchProfile}>
          {({ data, loading, error }) => {
            if (loading) return <p>Loading....</p>;

            if (error) return <Error error={error} />;
            console.log(data);
            const { name: currentName, email: currentEmail, age: currentAge } =
              data.meUser || data.meSeller;
            return (
              <>
                <InnerContainer>
                  <Helmet>
                    <title>My Profile</title>
                  </Helmet>
                  <Content>
                    <div>
                      <h3>{currentName}</h3>
                    </div>
                    <div>
                      <p>{currentEmail}</p>
                      {currentAge && <p>{currentAge}</p>}
                      {!this.state.update && (
                        <Button onClick={() => this.setState({ update: true })}>
                          Update
                        </Button>
                      )}
                    </div>
                  </Content>
                  {this.state.update && (
                    <Mutation
                      mutation={role === "BUYER" ? UPDATE_USER : UPDATE_SELLER}
                      refetchQueries={[{ query: fetchProfile }]}
                    >
                      {(updateProfileMutation, { loading, error }) => {
                        return (
                          <>
                            {error && <Error error={error} />}
                            {loading && <div>Loading....</div>}

                            <Formik
                              initialValues={{
                                name: currentName,
                                email: currentEmail,
                                password: "",
                                confirmPassword: "",
                                age: currentAge || null,
                              }}
                              validate={(values) => {
                                const {
                                  name,
                                  email,
                                  password,
                                  confirmPassword,
                                  age,
                                } = values;
                                const errors = {};

                                if (
                                  name &&
                                  (name.length < 2 || name.length > 15)
                                ) {
                                  errors.name =
                                    "Name cannot be less than 3 or more than 15 characters";
                                }

                                if (
                                  email &&
                                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                    email
                                  )
                                ) {
                                  errors.email = "Invalid email address";
                                }

                                if (
                                  password &&
                                  (password.length < 8 || password.length > 20)
                                ) {
                                  errors.password =
                                    "Password has to be at least 8 characters long";
                                }

                                if (
                                  confirmPassword &&
                                  (confirmPassword.length < 8 ||
                                    confirmPassword.length > 20)
                                ) {
                                  errors.confirmPassword =
                                    "Password has to be at least 8 characters long";
                                }

                                if (password !== confirmPassword) {
                                  errors.confirmPassword =
                                    "Your passwords do not match";
                                }

                                if (
                                  !Number.isInteger(age) ||
                                  age < 14 ||
                                  age > 120
                                ) {
                                  errors.age =
                                    "Age has to be an integer not less then 14 or bigger then 120";
                                }
                                return errors;
                              }}
                              onSubmit={async (values, { setSubmitting }) => {
                                const updates = { ...values };
                                delete updates.confirmPassword;

                                // delete key value pairs which were not updated by the user
                                Object.entries(updates).forEach(
                                  ([key, val]) => {
                                    if (val === "") {
                                      delete updates[key];
                                    }
                                  }
                                );

                                try {
                                  const response = await updateProfileMutation({
                                    variables: { data: updates },
                                  }); // https://stackoverflow.com/questions/54574000/how-to-pass-variables-to-an-apollo-mutation-component
                                  {
                                    /* console.log(response); */
                                  }

                                  this.setState({ update: false });
                                } catch (error) {
                                  console.error(error);
                                }
                                // if call setSubmit(false), the app is giving an error - https://github.com/formik/formik/issues/1449 - charleskoehl commented on Feb 11 •

                                {
                                  /* setSubmitting(false); */
                                }
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
                                    <form onSubmit={handleSubmit}>
                                      <h2>Update Your Profile!</h2>
                                      <div className="fieldset">
                                        <div>
                                          <label htmlFor="name">Name</label>
                                          <div>
                                            <input
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.name}
                                              type="text"
                                              placeholder="Your name"
                                              name="name"
                                              id="name"
                                            />
                                            <p>
                                              {errors.name &&
                                                touched.name &&
                                                errors.name}
                                            </p>
                                          </div>
                                        </div>
                                        <div>
                                          <label htmlFor="email">Email</label>
                                          <div>
                                            <input
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.email}
                                              type="text"
                                              name="email"
                                              id="email"
                                              placeholder="Enter your email"
                                            />
                                            <p>
                                              {errors.email &&
                                                touched.email &&
                                                errors.email}
                                            </p>
                                          </div>
                                        </div>
                                        <div>
                                          <label htmlFor="password">
                                            Password:
                                          </label>
                                          <div>
                                            <input
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.password}
                                              type="password"
                                              name="password"
                                              id="password"
                                              placeholder="Enter your password"
                                            />
                                            <p>
                                              {errors.password &&
                                                touched.password &&
                                                errors.password}
                                            </p>
                                          </div>
                                        </div>

                                        <div>
                                          <label htmlFor="confirmPassword">
                                            Confirm Password:
                                          </label>
                                          <div>
                                            <input
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              value={values.confirmPassword}
                                              type="password"
                                              name="confirmPassword"
                                              id="confirmPassword"
                                              placeholder="Confirm Your New Password"
                                            />
                                            <p>
                                              {errors.confirmPassword &&
                                                touched.confirmPassword &&
                                                errors.confirmPassword}
                                            </p>
                                          </div>
                                        </div>

                                        {role === "BUYER" && (
                                          <div>
                                            <label htmlFor="age">Age:</label>
                                            <div>
                                              <input
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.age}
                                                type="number"
                                                name="age"
                                                id="age"
                                                placeholder="Enter your age"
                                              />
                                              <p>
                                                {errors.age &&
                                                  touched.age &&
                                                  errors.age}
                                              </p>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      <Buttons>
                                        <Button
                                          onClick={() => {
                                            this.setState({ update: false });
                                          }}
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          type="submit"
                                          disabled={isSubmitting}
                                        >
                                          Submit Changes
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
                  )}
                </InnerContainer>
              </>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default withCookies(UserProfile);
