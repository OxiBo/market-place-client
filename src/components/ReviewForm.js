// TODO wrap it in HOC to check permissions. Only buyers can see this page and create reviews

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import Error from "./ErrorMessage";
import InnerContainer from "./styled/InnerContainer";
import Button from "./styled/Button";
import Buttons from "./styled/Buttons";
import FormInput from "./styled/FormInput";
import Form from "./styled/Form";
import {
  CREATE_REVIEW_MUTATION,
  UPDATE_REVIEW_MUTATION,
  FETCH_USER_ORDERITEMS,
} from "../utils/serverOperations";

// const ProductForm = styled(Form)``;

//https://stackoverflow.com/questions/55776961/styled-components-extend-styles-and-change-element-type
const TextArea = styled(FormInput).attrs({
  as: "textarea",
})`
  height: 100px;
  font-family: inherit;
  padding: 1rem;
  margin: 0.7rem 0.7rem 0.2rem 0.7rem;
`;

class ReviewForm extends Component {
  render() {
    console.log(this.props);

    const update = this.props.match.params.update === "true" ? true : false;
    const productId = this.props.match.params.id;
    const productName = this.props.match.params.name;
    const reviewId = this.props.location.search.split("=")[1];
    return (
      <Mutation
        mutation={update ? UPDATE_REVIEW_MUTATION : CREATE_REVIEW_MUTATION}
        refetchQueries={[{ query: FETCH_USER_ORDERITEMS }]}
      >
        {(reviewMutation, { error, loading }) => {
          return (
            <InnerContainer>
              <Helmet>
                <title>
                  {update ? "Update" : "Create"} Review For {productName}
                </title>
              </Helmet>
              {error && <Error error={error} />}
              {loading && <div>Loading....</div>}
              <Formik
                initialValues={{
                  rating: "",
                  text: "",
                }}
                validate={(values) => {
                  const { rating, text } = values;
                  const errors = {};

                  if (!text) {
                    errors.text = "You must provide your review text";
                  } else if (
                    text.length < 5 || // TODO change this after testing
                    text.length > 500
                  ) {
                    errors.text =
                      "Review cannot be less than ____ or more than 500 characters";
                  }

                  if (!rating) {
                    errors.rating = "You must provide product rating";
                  } else if (!Number.isInteger(rating)) {
                    errors.rating = "Rating has to be a whole number";
                  } else if (rating <= 0 || rating > 5) {
                    errors.rating = "Rating has to be in 0 - 5 range";
                  }

                  return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  const variables = {
                    data: {
                      ...values,
                      published: true,
                      product: productId,
                    },
                  };
                  if (update) {
                    variables.id = reviewId;
                    delete variables.data.product
                  }
                  try {
                    const res = await reviewMutation({
                      variables,
                    });
                    console.log(res);
                    this.props.history.goBack();

                    /* setSubmitting(false); */
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
                      <h3>
                        {update ? "Update" : "Create"} Review For{" "}
                        <Link to={`/item/${productId}`}>{productName}</Link>
                      </h3>
                      <form action="" onSubmit={handleSubmit}>
                        <div className="fieldset">
                          <div>
                            <label htmlFor="rating">Rating:</label>

                            <div>
                              <FormInput
                                type="number"
                                step="1"
                                min="0"
                                pattern="\d+"
                                name="rating"
                                id="rating"
                                placeholder="Rating"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.rating}
                              />
                              <span>
                                {errors.rating &&
                                  touched.rating &&
                                  errors.rating}
                              </span>
                            </div>
                          </div>

                          <div>
                            <label htmlFor="text">Product Review:</label>
                            <div>
                              <TextArea
                                id="text"
                                name="text"
                                placeholder="Enter Product Review"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.text}
                              />
                              <span>
                                {errors.text && touched.text && errors.text}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Buttons>
                          <Button
                            onClick={() => {
                              this.props.history.goBack(); // TODO - check when in redirects if there were error messages while logging in
                            }}
                          >
                            Cancel
                          </Button>{" "}
                          <Button type="submit" disabled={isSubmitting}>
                            Submit
                          </Button>
                        </Buttons>
                      </form>
                    </Form>
                  );
                }}
              </Formik>
            </InnerContainer>
          );
        }}
      </Mutation>
    );
  }
}
export default ReviewForm;
