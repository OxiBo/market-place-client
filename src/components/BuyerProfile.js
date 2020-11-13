import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import Helmet from "react-helmet";
import { Formik } from "formik";
import styled from "styled-components";
import { withCookies } from "react-cookie";
import Error from "./ErrorMessage";
import OrderedItemsList from "./OrderedItemsList";
import DeleteUser from "./DeleteUser";
import InnerContainer from "./styled/InnerContainer";
import Button from "./styled/Button";
import Buttons from "./styled/Buttons";
import Form from "./styled/Form";

import FormInput from "./styled/FormInput";
import uploadFile from "../utils/uploadFile";
import { FETCH_USER_PROFILE, UPDATE_USER } from "../utils/serverOperations";

import { noImage } from "../utils/utilVars";

const Content = styled(InnerContainer)`
  background-color: #fdfcfc;
  display: flex;
  div {
    margin: 0.5rem;
    padding: 1rem;
    h2 {
      font-size: 3rem;
    }
    p {
      padding: 0.5rem;
      span {
        text-transform: uppercase;
      }
    }
  }
  div.image {
    width: 25%;
    img {
      width: 100%;
    }
  }
`;

class BuyerProfile extends Component {
  state = {
    update: false,
    openOrderItems: false,
    role: this.props.cookies.get("type"),
  };

  render() {
    const { role } = this.state;

    return (
      <div>
        <Query query={FETCH_USER_PROFILE}>
          {({ data, loading, error }) => {
            if (loading) return <p>Loading....</p>;

            if (error) return <Error error={error} />;

            const {
              name: currentName,
              email: currentEmail,
              age: currentAge,
              image: currentImage,
            } = data.meUser;
            {
              /* console.log(data.meUser); */
            }
            return (
              <>
                <InnerContainer>
                  <Helmet>
                    <title>My Profile</title>
                  </Helmet>
                  <Content>
                    <div className="image">
                      <img src={currentImage || noImage} alt="currentName" />
                    </div>

                    <div data-test="buyer-profile">
                      {" "}
                      <h2>{currentName}</h2>
                      <p>
                        <span>Email:</span> {currentEmail}
                      </p>
                      {currentAge && (
                        <p>
                          <span>age:</span> {currentAge}
                        </p>
                      )}
                      {!this.state.update && (
                        <Button
                          data-test="update-profile-button"
                          onClick={() => this.setState({ update: true })}
                        >
                          Update Profile
                        </Button>
                      )}
                      <DeleteUser type={"BUYER"} cookies={this.props.cookies}/>
                   
                      <Button
                        data-test="ordered-items-button"
                        onClick={() =>
                          this.setState((prevState) => ({
                            openOrderItems: !prevState.openOrderItems,
                          }))
                        }
                      >
                        {this.state.openOrderItems ? "Hide" : "Show"} ordered
                        items
                      </Button>
                    </div>
                  </Content>
                  {this.state.update && (
                    <Mutation
                      mutation={UPDATE_USER}
                      refetchQueries={[{ query: FETCH_USER_PROFILE }]}
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
                                image: "",
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
                                  console.log(response);
                                  this.setState({ update: false });
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
                                setFieldValue,
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
                                            <FormInput
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

                                        <div className="">
                                          <label htmlFor="file">Image:</label>
                                          <div>
                                            <FormInput
                                              type="file"
                                              id="file"
                                              name="file"
                                              placeholder="Upload an image"
                                              onChange={(e) =>
                                                uploadFile(e, setFieldValue)
                                              }
                                            />
                                            {values.image && (
                                              <img
                                                width="200"
                                                src={values.image}
                                                alt="Upload Preview"
                                              />
                                            )}
                                          </div>
                                        </div>

                                        <div>
                                          <label htmlFor="email">Email</label>
                                          <div>
                                            <FormInput
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
                                            <FormInput
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
                                            <FormInput
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

                                        <div>
                                          <label htmlFor="age">Age:</label>
                                          <div>
                                            <FormInput
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
                  {this.state.openOrderItems && (
                    <OrderedItemsList userId={data.meUser.id} />
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

export default withCookies(BuyerProfile);
export { BuyerProfile }; // ????
