import React from "react";
import { Link } from "react-router-dom";
import { noImage } from "../utils/utilVars";
import ItemDetails from './styled/ItemDetails'
const SingleOrderItem = ({ item: { id, count, image, name, price, product }}) => {
  console.log(product);
  return (
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
          SubTotal: <span>{(count * price) / 100}</span>
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
    </ItemDetails>
  );
};

export default SingleOrderItem;
