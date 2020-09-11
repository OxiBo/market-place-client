import React, { useState } from "react";
import { ApolloConsumer } from "react-apollo";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { noImage } from "../utils/utilVars";
import ItemDetails from "./styled/ItemDetails";
import Button from "./styled/Button";
import { FETCH_MY_REVIEW } from "../utils/serverOperations";
// const ReviewButton = styled(Button).attrs({
//   as: Link,
// })`
//   /* min-width: 30%; */
//   /* width: 200px; */
//   /* max-width: 70%; */
//   /* background: green; */
// `;

const SingleOrderItem = ({
  item: { id, count, image, name, reviewed, price, product },
}) => {
  const [reviewOpen, setReviewShow] = useState(false);
  const [review, setReview] = useState(null);

  const showReview = async (client) => {
    setReviewShow(!reviewOpen);

    const res = await client.query({
      query: FETCH_MY_REVIEW,
      variables: { id: reviewed.id },
    });
    console.log(res);
    setReview(res.data.myReview);
  };
  return (
    <ItemDetails key={id} data-test="single-order-item">
      <img src={image || noImage} alt={name} />
      <div>
        <div>
          <Link to={`/item/${product.id}`}>
            {" "}
            <h3>{name} </h3>
          </Link>
          <hr />
          <p>
            Qty: <span>{count}</span>
          </p>
          <p>
            Each: <span>${price / 100}</span>
          </p>
          <p>
            SubTotal: <span>$ {(count * price) / 100}</span>
          </p>
          <p>
            Sold By:{" "}
            <span>
              <Link to={`/seller/${product.seller.id}`}>
                {product.seller.name}
              </Link>
            </span>
          </p>
        </div>

        {reviewed ? (
          <ApolloConsumer>
            {(client) => {
              return (
                <Button onClick={() => showReview(client)}>
                  {!reviewOpen ? "See Review" : "Hide Review"}
                </Button>
              );
            }}
          </ApolloConsumer>
        ) : (
          <Link
            to={{
              pathname: `/item/${product.id}/${product.name}/review/${false}`,
            }}
          >
            <Button>Write review</Button>
          </Link>
        )}
      </div>
    </ItemDetails>
  );
};

export default SingleOrderItem;

/*


   <Link
            to={{
              pathname: `/item/${product.id}/${product.name}/review/${true}`,
              search: `?reviewId=${reviewed.id}`, // how to get review ID
            }}
          >
            <Button>Update review</Button>
          </Link>

*/
