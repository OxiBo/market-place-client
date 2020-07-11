import React, { Component } from "react";
import { Query } from "react-apollo";
import styled from "styled-components";
import Error from "./ErrorMessage";
import { FETCH_PRODUCT_REVIEWS } from "../utils/operations";
import InnerContainer from "./styled/InnerContainer";

const renderStars = (n, iconName) =>
  [...Array(n)].map((icon, i) => <i key={i} className={iconName}></i>);

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
  render() {
    return (
      <Query
        query={FETCH_PRODUCT_REVIEWS}
        variables={{ id: this.props.productId }}
      >
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          const { reviews, name } = data.product;
          return (
            <ReviewsStyles background={"#BEEDEB"}>
              <h2>Reviews For {name}</h2>
              {reviews.map(({ id, rating, text }) => {
                const emptyIcon = 5 - rating;
                return (
                  <div key={id}>
                    <p>
                      {renderStars(rating, "fa fa-star")}
                      {renderStars(emptyIcon, "fa fa-star-o")}
                      <span> {rating}</span>
                    </p>
                    <p className="text">{text}</p>
                  </div>
                );
              })}
            </ReviewsStyles>
          );
        }}
      </Query>
    );
  }
}
export default ProductReviews;
