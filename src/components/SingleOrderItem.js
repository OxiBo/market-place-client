import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { noImage } from "../utils/utilVars";
import ItemDetails from "./styled/ItemDetails";
import Button from "./styled/Button";

const ReviewButton = styled(Button).attrs({
  as: Link,
})`
  /* min-width: 30%; */
  width: 200px;
  max-width: 70%;
  background: green;
`;

const SingleOrderItem = ({
  item: { id, count, image, name, reviewed, price, product },
}) => {
  return (
    console.log(reviewed) || (
      <ItemDetails key={id}>
        <img src={image || noImage} alt={name} />
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

          {reviewed ? (
            <Button>Update review</Button>
          ) : (
            <ReviewButton
              to={{
                pathname: `/item/${product.id}/create-review`,
                search: `?product=${product.name}`,
              }}
            >
              Write Review
            </ReviewButton>
          )}
        </div>
      </ItemDetails>
    )
  );
};

export default SingleOrderItem;
