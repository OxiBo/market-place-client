import React, { Component } from "react";
import { Query } from "react-apollo";
import styled from "styled-components";
import Error from "./ErrorMessage";
import { FETCH_PRODUCT_REVIEWS, ALL_REVIEWS_PAGINATION } from "../utils/serverOperations";

import InnerContainer from "./styled/InnerContainer";
import SingleReview from "./SingleReview";
import ReviewsPagination from "./ReviewsPagination";
import { reviewsPerPage } from "../configVars";
import InnerPagination from "./RenderProp/InnerPagination";
const ReviewsStyles = styled(InnerContainer)`
  background-color: ${(props) => props.background};
  padding: 1rem;
  height: 30rem;
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
const ProductReviewsCopy = (props) => (
  <ReviewsStyles background={"#BEEDEB"}>
    <h2>Reviews For {props.name}</h2>

    <InnerPagination
      query={ALL_REVIEWS_PAGINATION}
      variableName={"productId"}
      variableValue={props.productId}
      perPage={reviewsPerPage}
      connectionType={"reviewsConnection"}
    >
      {({ page }) => (
        <Query
          query={FETCH_PRODUCT_REVIEWS}
          variables={{
            productId: props.productId,
            skip: page * reviewsPerPage - reviewsPerPage,
            first: reviewsPerPage,
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <Error error={error} />;

            const { reviews } = data;
            return (
              <>
                {reviews.map((review) => {
                  return <SingleReview key={review.id} review={review} />;
                })}
              </>
            );
          }}
        </Query>
      )}
    </InnerPagination>
  </ReviewsStyles>
);

export default ProductReviewsCopy;
