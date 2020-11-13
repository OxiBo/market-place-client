//TODO - TOAST message about succesful order

import StripeCheckout from "react-stripe-checkout";
import { Query, Mutation } from "react-apollo";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";

import React, { Component } from "react";
import Error from "./ErrorMessage";
import {
  CHECKOUT_AND_PAY_MUTATION,
  CART_ITEMS_QUERY,
  FETCH_USER_ORDERITEMS
} from "../utils/serverOperations";

class CheckoutAndPay extends Component {
//   componentDidMount() {
//     console.log(this.props);
//   }
  onToken = async (token, checkoutAndPayMutation) => {
    // console.log(token);
    const res = await checkoutAndPayMutation({
      variables: { token: token.id },
    });
    // console.log(res);
    this.props.history.push(`/order/${res.data.checkoutAndPay.id}`);
  };
  render() {
    //   console.log(this.props)
    const { image, totalItems, amount } = this.props;
    
    // TODO - refactor for better way to pass user's email
    return (
      <Query
        query={gql`
          query {
            meUser {
              email
            }
          }
        `}
      >
        {({ data, error, loading }) => {
          {/* console.log(data); */}
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          const email = data.meUser.email;
          return (
            <Mutation
              mutation={CHECKOUT_AND_PAY_MUTATION}
              refetchQueries={[{ query: FETCH_USER_ORDERITEMS }, {query: CART_ITEMS_QUERY}]} // FETCH_USER_ORDERITEMS ???
              onCompleted={(res) => console.log(res)}
            >
              {(checkoutAndPayMutation, { error }) => (
                <StripeCheckout
                  name="Market Place" // the pop-in header title
                  description={`Order of ${totalItems} items`} // the pop-in header subtitle
                  amount={amount * 100} // cents
                  currency="USD"
                  image={image || ""}
                  stripeKey="pk_test_upCU3MtNHwG5x9o6WO1zkpGK00cJOUCZZE"
                  email={email}
                  token={(response) =>
                    this.onToken(response, checkoutAndPayMutation)
                  }
                >
                  {this.props.children}
                </StripeCheckout>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}
export default withRouter(CheckoutAndPay);
