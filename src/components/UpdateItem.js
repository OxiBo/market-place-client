import React from "react";
import { Query, Mutation } from "react-apollo";
import Helmet from "react-helmet";
import { Formik } from "formik";

import InnerContainer from "./styled/InnerContainer";
import Error from "./ErrorMessage";
import {
  FETCH_SINGLE_PRODUCT,
  UPDATE_PRODUCT,
} from "../utils/serverOperations";
import Form from "./styled/Form";
import Button from "./styled/Button";
import Buttons from "./styled/Buttons";
import FormInput from "./styled/FormInput";
import { TextArea } from "./CreateProduct";
const UpdateItem = (props) => {
  const id = props.match.params.id;
  const uploadFile = async (e, setFieldValue) => {
    //   console.log(e)
    // https://www.pluralsight.com/guides/how-to-create-a-simple-form-submit-with-files  , https://developer.mozilla.org/en-US/docs/Web/API/FileList ,   https://javascript.info/formdata
    const files = e.target.files;
    // console.log(e)
    const data = new FormData();

    // const test = new FormData(e.target);
    // console.log(test)
    // console.log(Array.from(test.entries()))
    data.append("file", files[0]);
    data.append("upload_preset", "sickfits");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/di0hg10hd/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    // https://hackernoon.com/formik-handling-files-and-recaptcha-209cbeae10bc
    setFieldValue("image", file.secure_url);
    setFieldValue("largeImage", file.eager[0].secure_url);
  };
  return (
    <Query query={FETCH_SINGLE_PRODUCT} variables={{ id }}>
      {({ data, error, loading }) => {
        if (error) return <Error error={error} />;
        if (loading) return <p>Loading...</p>;
        {
          /* if (!data.product) return <p>No item found for id:{this.props.id}</p>; */
        }
        console.log(data);
        const {
          name,
          image,
          description,
          price,
          department,
          largeImage,
          stock,
        } = data.product;

        return (
          <Mutation mutation={UPDATE_PRODUCT} variables={{ id }}>
            {(updateProductMutation, { error, loading }) => {
              return (
                <>
                  {error && <Error error={error} />}
                  {loading && <div>Loading....</div>}
                  <InnerContainer>
                    <Formik
                      initialValues={{
                        name,
                        image,
                        description,
                        price,
                        department,
                        stock,
                      }}
                      validate={(values) => {
                        const {
                          name,
                          image,
                          description,
                          price,
                          department,
                          stock,
                        } = values;
                        const errors = {};
                        if (!name) {
                          errors.name = "You must provide product name";
                        } else if (name.length < 2 || name.length > 30) {
                          errors.name =
                            "Product name cannot be less than 2 or more than 30 characters";
                        }

                        if (!department) {
                          errors.department =
                            "You must provide department name";
                        } else if (
                          department.length < 2 ||
                          department.length > 15
                        ) {
                          errors.department =
                            "Department name cannot be less than 2 or more than 15 characters";
                        }

                        if (!description) {
                          errors.description =
                            "You must provide product description";
                        } else if (
                          description.length < 2 ||
                          description.length > 2000
                        ) {
                          errors.description =
                            "Product description cannot be less than ____ or more than 2000 characters";
                        }

                        if (!price) {
                          errors.price = "You must provide product price";
                        } else if (price <= 0) {
                          errors.price = "Price has to be bigger than 0";
                        }

                        if (!stock) {
                          errors.stock =
                            "You must provide available product count";
                        } else if (!Number.isInteger(stock)) {
                          errors.stock =
                            "Product count has to be a whole number";
                        } else if (stock < 0) {
                          errors.stock = "Product count cannot be less than 0";
                        }

                        return errors;
                      }}
                      onSubmit={async (values, { setSubmitting }) => {
                        const updates = { ...values };

                        // delete key value pairs which were not updated by the user
                        Object.entries(updates).forEach(([key, val]) => {
                          if (val === "" || !val) {
                            delete updates[key];
                          }
                        });

                        try {
                          const response = await updateProductMutation({
                            variables: { data: updates },
                          }); // https://stackoverflow.com/questions/54574000/how-to-pass-variables-to-an-apollo-mutation-component
                          props.history.push(`/item/${id}`);
                        } catch (error) {
                          console.error(error);
                        }

                        // if call setSubmit(false), the app is giving an error - https://github.com/formik/formik/issues/1449 - charleskoehl commented on Feb 11 •

                        //setSubmitting(false);
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
                      }) => (
                        <Form>
                          <h2>Update Product: {name}</h2>
                          <form action="" onSubmit={handleSubmit}>
                            <div className="fieldset">
                              <div>
                                <label htmlFor="name">Product Name:</label>
                                <div>
                                  <FormInput
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Product name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                  />

                                  <span>
                                    {errors.name && touched.name && errors.name}
                                  </span>
                                </div>
                              </div>

                              <div>
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
                                <label htmlFor="department">
                                  Department Name:
                                </label>
                                <div>
                                  <FormInput
                                    type="text"
                                    name="department"
                                    id="department"
                                    placeholder="Department name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.department}
                                  />
                                  <span>
                                    {errors.department &&
                                      touched.department &&
                                      errors.department}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <label htmlFor="price">Price:</label>
                                <div>
                                  <FormInput
                                    type="number"
                                    name="price"
                                    id="price"
                                    min="0"
                                    step="0.01"
                                    placeholder="Price"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.price}
                                  />
                                  <span>
                                    {errors.price &&
                                      touched.price &&
                                      errors.price}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <label htmlFor="stock">Count:</label>

                                <div>
                                  <FormInput
                                    type="number"
                                    step="1"
                                    min="0"
                                    pattern="\d+"
                                    name="stock"
                                    id="stock"
                                    placeholder="Count"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.stock}
                                  />
                                  <span>
                                    {errors.stock &&
                                      touched.stock &&
                                      errors.stock}
                                  </span>
                                </div>
                              </div>

                              <div>
                                <label htmlFor="description">
                                  Product Description:
                                </label>
                                <div>
                                  <TextArea
                                    id="description"
                                    name="description"
                                    placeholder="Enter Product Description"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                  />
                                  <span>
                                    {errors.description &&
                                      touched.description &&
                                      errors.description}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <Buttons>
                              <Button
                                onClick={() => {
                                  props.history.goBack();
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
                      )}
                    </Formik>
                  </InnerContainer>
                </>
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  );
};

export default UpdateItem;
