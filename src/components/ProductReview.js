import React, { Component } from "react";
import { Query } from "react-apollo";
import { VisualDivs } from "./SingleItem";
import Error from "./ErrorMessage";
import { FETCH_PRODUCT_REVIEWS } from "../utils/operations";

class ProductReview extends Component {
  render() {
    return (
      <Query
        query={FETCH_PRODUCT_REVIEWS}
        variables={{ id: this.props.productId }}
      >
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          {
            /* console.log(data) */
          }
          const { rating } = data.product;
          return (
            <VisualDivs>
              {rating ? (
                <>
                  <p>Rating: </p>
                  <h3>{rating}</h3>
                  <a onClick={() => this.props.showReviews()}>
                    {this.props.reviews ? "Hide Reviews" : "See Reviews"}
                  </a>
                </>
              ) : (
                <p>Nobody rated the product yet</p>
              )}
            </VisualDivs>
          );
        }}
      </Query>
    );
  }
}
export default ProductReview;
