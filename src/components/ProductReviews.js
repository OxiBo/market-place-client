import React, { Component } from "react";
import { Query } from "react-apollo";
import styled from "styled-components";
import Error from "./ErrorMessage";
import { FETCH_PRODUCT_REVIEWS } from "../utils/operations";
import InnerContainer from "./styled/InnerContainer";
import SingleReview from "./SingleReview";
import ReviewsPagination from "./ReviewsPagination";
import { reviewsPerPage } from "../configVars";

const ReviewsStyles = styled(InnerContainer)`
  background-color: ${(props) => props.background};
  padding: 1rem;
  h2 {
    margin: 0;
  }
  div {
    border-bottom: 1px solid lightgrey;
    border-radius: 5px;
    box-shadow: -1px -5px 52px -5px rgba(222, 209, 222, 1);
    background-color: white;
    display: flex;
    /* margin: 1rem; */
    /* padding: 1rem; */
    p {
      padding: 1rem;
      min-width: 8rem;
      width: 10rem;
      span {
        padding: 0.5rem;
      }
    }
    .text {
      flex: 1;
      border-left: 2px solid lightgray;
    }
  }
`;

class ProductReviews extends Component {
  state = {
    page: 1,
  };
  //   getPage = (page) => {
  //     this.setState({ page });
  //   };

  getPage = (n) => {
    this.setState((prevState) => ({ page: prevState.page + n }));
  };

  render() {
    const { page } = this.state;
    return (
      <Query
        query={FETCH_PRODUCT_REVIEWS}
        variables={{
          productId: this.props.productId,
          skip: page * reviewsPerPage - reviewsPerPage,
          first: reviewsPerPage,
        }}
      >
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          {
            /* console.log(data); */
          }
          const { reviews } = data;
          return (
            <ReviewsStyles background={"#BEEDEB"}>
              <h2>Reviews For {this.props.name}</h2>
              <ReviewsPagination
                productId={this.props.productId}
                getPage={this.getPage}
                page={this.state.page}
              />
              {reviews.map((review) => {
                return <SingleReview key={review.id} review={review} />;
              })}
            </ReviewsStyles>
          );
        }}
      </Query>
    );
  }
}
export default ProductReviews;
