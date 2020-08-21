import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import { withCookies } from "react-cookie";
import AddToOrder from "./AddToOrder";
import styled from "styled-components";
import Button from "./styled/Button";
import Buttons from "./styled/Buttons";
import ItemButton from "./styled/ItemButton";
import DeleteButton from "./DeleteButton";
import { noImage } from "../utils/utilVars";
import formatMoney from '../utils/formatMoney'

const ItemButtons = styled(Buttons)`
  flex-wrap: nowrap !important;
`;
// export const ItemButton = styled(Button)`
//   height: 2rem;
//   font-size: 1rem;
//   a {
//     color: inherit;
//     text-decoration: none;
//   }
// `;

const ItemStyles = styled.div`
  background: white;
  /* min-height: 170px; */
  border: 1px solid lightgray;
  margin: 0.5rem 1rem;
  padding: 0 1rem;
  width: 220px;
  max-width: 300px;
  flex: 1 auto;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  div {
    display: flex;
    justify-content: center;
    padding: 0.5rem;
    /* height: 3rem; */
  }
  div.rating {
    justify-content: space-evenly;
    margin-bottom: 1rem;
  }
  p {
    /* line-height: 2; */
    font-weight: 300;
    /* flex-grow: 1; */
    /* padding: 0 3rem; */
    font-size: 1.5rem;
  }
  a {
    text-decoration: none;
  }
  span {
    font-size: 2rem;
    padding: 0.5rem;
    color: ${(props) => props.theme.sellerColor};
    font-weight: 600;
  }
`;

export const PriceTag = styled.span`
  background: purple;
  transform: rotate(-10deg);
  color: white !important;
  font-weight: 600;
  padding: 5px;
  line-height: 1;
  font-size: 3rem;
  display: inline-block;
  position: absolute;
  top: -3px;
  left: -3px;
`;

class Item extends Component {
  render() {
    const {
      id,
      name,
      image,
      description,
      rating,
      stock,
      price,
      seller,
    } = this.props.product;
    const { cookies } = this.props;
    const sellerId = cookies.get("id");
    const type = cookies.get("type");
    return (
      <ItemStyles key={id}>
        <h2>{name}</h2>
        <div className="rating">
          {rating ? (
            <>
              <p>Rating:</p>
              <h4>{rating}</h4>
            </>
          ) : (
            <p>Nobody rated the product yet</p>
          )}
        </div>
        {/* TODO - delete description && before production, some products in dev database do not have description */}
        {/* <p>{description && description}</p> */}
        <img src={image || noImage} alt={name} />
        <div>
          <p>{stock > 0 ? "in stock" : "not in stock"}</p>
        </div>
        <PriceTag>${formatMoney(price)}</PriceTag>
        <div>
          {" "}
          <p>
            Sold by{" "}
            <a href={`/seller/${seller.id}`}>
              <span>{seller.name}</span>
            </a>
          </p>
        </div>
        <ItemButtons>
          <Link to={`/item/${id}`}>
            <ItemButton>View </ItemButton>
          </Link>

          {type === "BUYER" && <AddToOrder id={id} />}
          {sellerId === seller.id && (
            <DeleteButton id={id}>Delete</DeleteButton>
          )}
        </ItemButtons>
      </ItemStyles>
    );
  }
}
export default withCookies(Item);
