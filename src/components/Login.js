import React, { Component } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

import styled from "styled-components";
// import { instanceOf } from "prop-types";
import { withCookies } from "react-cookie";
import { Mutation } from "react-apollo";
// import gql from "graphql-tag";
import Error from "./ErrorMessage";
// import RequestReset from "./RequestReset";
import Button from "./styled/Button";
import Buttons from "./styled/Buttons";
import FormInput from './styled/FormInput'
import Form from "./styled/Form";
import {
  LOGIN_USER,
  LOGIN_SELLER,
  SIGNUP_USER,
  SIGNUP_SELLER,
} from "../utils/serverOperations";
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

const LinkButton = styled(Button)`
  a {
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
  }
`;

class Login extends Component {
  state = {
    login: true, // switch between Login and SignUp
    // email: "",
    // password: "",
    // name: "",
    role: "BUYER",
    error: null,
  };
  _confirm = async (data) => {
    const { token, user, seller } =
      this.state.role === "BUYER"
        ? this.state.login
          ? data.loginUser
          : data.createUser
        : this.state.login
        ? data.loginSeller
        : data.createSeller;

    const { name, id, type } = user || seller;
    const { cookies } = this.props;

    saveAuthToCookies(cookies, token, id, name, type);
    this.props.history.push("/");
  };

  // https://dev.to/ogwurujohnson/cloudinary-image-upload-the-setup-k3h  , https://blog.logrocket.com/handling-images-with-cloudinary-in-react/
  uploadFile = async (e, setFieldValue) => {
    //   console.log(e)
    // https://www.pluralsight.com/guides/how-to-create-a-simple-form-submit-with-files  , https://developer.mozilla.org/en-US/docs/Web/API/FileList ,   https://javascript.info/formdata
    const files = e.target.files;
    // console.log(e)
    const data = new FormData();

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
    // setFieldValue("largeImage", file.eager[0].secure_url);
  };

  render() {
    const { login, role } = this.state;
    return (
      <AuthContainer>
        <h2>Welcome To Our Marketplace!</h2>
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
                <Helmet>
                  <title>Login</title>
                </Helmet>
                {error && <Error error={error} />}
                {loading && <div>Loading....</div>}
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    image: "", // TODO - default image ???
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
                    const { email, password, name, role } = values;
                    await this.setState({ role });
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
                    setFieldValue,
                    /* and other goodies */
                  }) => {
                    return (
                      <Form>
                        <form action="" method="POST" onSubmit={handleSubmit}>
                          <div className="fieldset">
                            {!login && (
                              <>
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
                                      {errors.name &&
                                        touched.name &&
                                        errors.name}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <label htmlFor="file">Image:</label>
                                  <div>
                                    {" "}
                                    <FormInput
                                      type="file"
                                      id="file"
                                      name="file"
                                      placeholder="Upload an image"
                                      onChange={(e) =>
                                        this.uploadFile(e, setFieldValue)
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
                              </>
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
                                onChange={handleChange}
                              />
                              <label htmlFor="buyer">Buyer</label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                id="seller"
                                name="role"
                                value="SELLER"
                                onChange={handleChange}
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
                            <LinkButton>
                              <Link to="/request-reset">forgot password?</Link>
                            </LinkButton>
                            <Button
                              type="button"
                              onClick={() => {
                                this.props.history.goBack(); // TODO - check when in redirects if there were error messages while logging in
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

export default withCookies(Login);

// import React, { Component } from "react";
// import styled from "styled-components";
// // import { instanceOf } from "prop-types";
// import { withCookies, Cookies } from "react-cookie";
// import { Mutation } from "react-apollo";
// // import gql from "graphql-tag";
// import Error from "./ErrorMessage";
// import Button from "./styled/Button";
// import Buttons from "./styled/Buttons";
// import Form from "./styled/Form";
// import {
//   LOGIN_USER,
//   LOGIN_SELLER,
//   SIGNUP_USER,
//   SIGNUP_SELLER,
// } from "../utils/operations";
// // const AUTH_TOKEN = "";
// import validEmailRegex from "../utils/validateEmail";
// const AuthContainer = styled.div`
//   width: 90%;
//   margin: 0 auto;
//   /* margin: 1rem; */
//   h2 {
//     text-align: center;
//     margin: 0 0 3rem 0;
//   }
//   /* display: flex; */
// `;

// const ValidationError = styled.p`
//   color: red;
//   font-size: 1.2rem;
//   font-weight: 200;
//   text-align: center;
//   /* width: 100px; */
// `;

// class Login extends Component {
//   state = {
//     login: true, // switch between Login and SignUp
//     email: "",
//     password: "",
//     name: "",
//     role: "BUYER",
//     error: null,
//     // formValid: true,
//     // isValidName: null,
//     // isValidEmail: null,
//     // isValidPassword: null,
//     // formErrors: {
//     //   name: "name",
//     //   email: "email",
//     //   password: "password",
//     // },
//     // cookies: instanceOf(Cookies).isRequired,
//   };

//   componentDidMount() {
//     // console.log(this.props);
//   }
//   handleChange = (event) => {
//     event.preventDefault();
//     const { name, value } = event.target;
//     // let errors = this.state.formErrors;

//     // switch (name) {
//     //   case "name":
//     //     if (value.length < 5) {
//     //       errors.name = "Name must be at least 5 characters long!";
//     //       this.setState({ isValidName: false });
//     //     } else {
//     //       errors.name = "";
//     //       this.setState({ isValidName: true });
//     //     }

//     //     break;
//     //   case "email":
//     //     if (!validEmailRegex.test(value)) {
//     //       errors.email = "You must provide valid email!";
//     //       this.setState({ isValidEmail: false });
//     //     } else {
//     //       errors.email = "";
//     //       this.setState({ isValidEmail: true });
//     //     }

//     //     break;
//     //   case "password":
//     //     if (value.length < 8) {
//     //       errors.password = "Password must be 8 characters long!";
//     //       this.setState({ isValidPassword: false });
//     //     } else {
//     //       errors.password = "";
//     //       this.setState({ isValidPassword: true });
//     //     }

//     //     break;
//     //   default:
//     //     break;
//     // }

//     // this.setState({ formErrors: errors, [name]: value });
//     this.setState({ [name]: value });
//   };

//   // validateForm = () => {
//   //   const { isValidName, isValidEmail, isValidPassword } = this.state;
//   //   // let errors = {};
//   //   // let isValidForm = true;

//   //   // if (!this.state.login && name.length < 5) {
//   //   //   errors.name = "Name must be at least 5 characters long!";
//   //   // }
//   //   // if (!validEmailRegex.test(email)) {
//   //   //   errors.email = "You must provide valid email!";
//   //   //   isValidForm = false;
//   //   // }

//   //   // if (password.length < 8) {
//   //   //   errors.password = "Password must be 8 characters long!";
//   //   //   isValidForm = false;
//   //   // }

//   //   // if (
//   //   //   (this.state.login === false && this.state.name.length === 0) ||
//   //   //   this.state.password.length === 0 ||
//   //   //   this.state.email.length === 0
//   //   // ) {
//   //   //   this.setState({ formValid: false });
//   //   // }
//   //   // this.setState({ formErrors: errors });
//   //   return (
//   //     (!this.state.login && isValidName) || isValidEmail || isValidPassword
//   //   );
//   // };
//   // why async???
//   _confirm = async (data) => {
//     console.log(data);
//     const { token, user, seller } =
//       this.state.role === "BUYER"
//         ? this.state.login
//           ? data.loginUser
//           : data.createUser
//         : this.state.login
//         ? data.loginSeller
//         : data.createSeller;

//     const { name, id, type } = user || seller;
//     this._saveAuthData(
//       token,
//       name,
//       id,
//       type
//       // (user && user.name) || (seller && seller.name),
//       // (user && user.id) || (seller && seller.id),
//       // (user && user.type) || (seller && seller.type),
//     );
//     this.props.history.push("/");
//   };

//   _saveAuthData = (token, name, id, type) => {
//     const { cookies } = this.props;
//     // console.log(type);
//     cookies.set("token", token, { path: "/" });
//     cookies.set("id", id, { path: "/" });
//     cookies.set("name", name, { path: "/" });
//     cookies.set("type", type, { path: "/" });
//   };
//   render() {
//     // console.log(this.props);
//     const {
//       login,
//       email,
//       password,
//       name,
//       role,
//       // error,
//       // isValidName,
//       // isValidEmail,
//       // isValidPassword,
//     } = this.state;

//     const { cookies } = this.props;
//     // const authToken = cookies.get("token"); //?????
//     // console.log(cookies);
//     // console.log(authToken);
//     return (
//       <AuthContainer>
//         <h2>Join Our Market Place</h2>

//         <Mutation
//           mutation={
//             login
//               ? role === "BUYER"
//                 ? LOGIN_USER
//                 : LOGIN_SELLER
//               : role === "BUYER"
//               ? SIGNUP_USER
//               : SIGNUP_SELLER
//           }
//           variables={
//             login
//               ? { data: { email, password } }
//               : { data: { email, password, name, type: role } }
//           }

//           // https://www.apollographql.com/docs/react/api/react-components/
//         >
//           {(loginMutation, { loading, error }) => {
//             return (
//               <>
//                 <Error error={error} />
//                 <Form>
//                   <h3 className="">{login ? "Login" : "Sign Up"}</h3>
//                   <form
//                     action=""
//                     onSubmit={async (e) => {
//                       e.preventDefault();

//                       {
//                         /* if (this.validateForm()) { */
//                       }
//                       try {
//                         const respond = await loginMutation();

//                         this._confirm(respond.data);
//                       } catch (error) {
//                         console.error(error);
//                       }
//                       {
//                         /* } */
//                       }
//                     }}
//                   >
//                     <div className="fieldset">
//                       {!login && (
//                         <div>
//                           <label htmlFor="name">Name:</label>
//                           <input
//                             value={name}
//                             onChange={this.handleChange}
//                             type="text"
//                             name="name"
//                             id="name"
//                             placeholder="Your name"
//                           />
//                           {/* {this.state.formErrors.name && !isValidName && (
//                               <ValidationError>
//                                 {this.state.formErrors.name}
//                               </ValidationError>
//                             )} */}
//                         </div>
//                       )}
//                       <div>
//                         <label htmlFor="email">Email:</label>{" "}
//                         <input
//                           value={email}
//                           onChange={this.handleChange}
//                           type="text"
//                           name="email"
//                           id="email"
//                           placeholder="Enter your email"
//                         />
//                         {/* {this.state.formErrors.email && !isValidName && (
//                             <ValidationError>
//                               {this.state.formErrors.email}
//                             </ValidationError>
//                           )} */}
//                       </div>
//                       <div>
//                         <label htmlFor="password">Password:</label>{" "}
//                         <input
//                           value={password}
//                           onChange={this.handleChange}
//                           type="password"
//                           name="password"
//                           id="password"
//                           placeholder="Enter your password"
//                         />
//                         {/* {this.state.formErrors.password &&
//                             !isValidPassword && (
//                               <ValidationError>
//                                 {this.state.formErrors.password}
//                               </ValidationError>
//                             )} */}
//                       </div>
//                     </div>

//                     <fieldset
//                       onChange={(e) => this.setState({ role: e.target.value })}
//                     >
//                       <h4>Choose your role (required):</h4>
//                       <div>
//                         <input
//                           type="radio"
//                           id="buyer"
//                           name="role"
//                           value="BUYER"
//                           defaultChecked
//                         />
//                         <label htmlFor="buyer">Buyer</label>
//                       </div>
//                       <div>
//                         <input
//                           type="radio"
//                           id="seller"
//                           name="role"
//                           value="SELLER"
//                         />
//                         <label htmlFor="seller">Seller</label>
//                       </div>
//                     </fieldset>
//                     <Buttons>
//                       <Button type="submit">
//                         {login ? "login" : "create account"}
//                       </Button>

//                       <Button
//                         className=""
//                         onClick={() => this.setState({ login: !login })}
//                       >
//                         {login
//                           ? "need an account?"
//                           : "already have an account?"}
//                       </Button>
//                       <Button
//                         onClick={() => {
//                           this.props.history.goBack();
//                         }}
//                       >
//                         Cancel
//                       </Button>
//                     </Buttons>
//                   </form>
//                 </Form>
//               </>
//             );
//           }}
//         </Mutation>
//       </AuthContainer>
//     );
//   }
// }

// export default withCookies(Login);
